// server/src/controllers/studentController.ts
import { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student';
import { encryptData, decryptData } from '../utils/crypto';
import jwt from 'jsonwebtoken';

// Helpers
const encryptObject = (data: Record<string, any>) => {
  const encrypted: Record<string, any> = {};
  for (const key in data) {
    if (data.hasOwnProperty(key) && typeof data[key] === 'string') {
      encrypted[key] = encryptData(data[key]);
    } else {
      encrypted[key] = data[key];
    }
  }
  return encrypted;
};

const decryptObject = (data: Record<string, any>) => {
  const decrypted: Record<string, any> = {};
  for (const key in data) {
    if (data.hasOwnProperty(key) && typeof data[key] === 'string') {
      decrypted[key] = decryptData(data[key]);
    } else {
      decrypted[key] = data[key];
    }
  }
  return decrypted;
};

// -------------------- Existing CRUD --------------------
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const encryptedFields = encryptObject(req.body);
    const student = new Student(encryptedFields as IStudent);
    await student.save();
    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const key in err.errors) {
        errors[key] = err.errors[key].message;
      }
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    const decryptedStudents = students.map((student) =>
      decryptObject(student.toObject())
    );
    res.json(decryptedStudents);
  } catch (err: any) {
    console.error("❌ Error fetching students:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json(decryptObject(student.toObject()));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const encryptedFields = encryptObject(req.body);
    const updated = await Student.findByIdAndUpdate(req.params.id, encryptedFields, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student updated', student: decryptObject(updated.toObject()) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- NEW: Login Student --------------------
export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const encryptedPassword = encryptData(password);

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student)
      return res.status(401).json({ message: 'Invalid email or password' });

    // Compare password
    if (student.password !== encryptedPassword)
      return res.status(401).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET || 'supersecretkey',
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err: any) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: 'Internal Server Error', details: err.message });
  }
};

// -------------------- NEW: Change Password --------------------
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Both old and new passwords are required' });
    }

    // Assuming JWT auth middleware sets req.user
    const studentId = (req as any).user?.id;
    if (!studentId) return res.status(401).json({ message: 'Unauthorized' });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Verify old password
    const encryptedOld = encryptData(oldPassword);
    if (student.password !== encryptedOld) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Update to new password
    student.password = encryptData(newPassword);
    await student.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err: any) {
    console.error('Change Password Error:', err);
    res.status(500).json({ message: 'Internal Server Error', details: err.message });
  }
};
// -------------------- NEW: Reset Password --------------------
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword, email } = req.body;

    if (!token || !newPassword || !email) {
      return res.status(400).json({ message: 'Token, email, and new password are required' });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Reset token has expired' });
      }
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Check if token email matches request email
    if (decoded.email !== email) {
      return res.status(401).json({ message: 'Token email does not match' });
    }

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    // Update password
    student.password = encryptData(newPassword);
    await student.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err: any) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Internal Server Error', details: err.message });
  }
};
