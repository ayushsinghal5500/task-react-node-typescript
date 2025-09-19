// server/src/controllers/studentController.ts
import { Request, Response } from 'express';
import Student, { IStudent } from '../models/Student';
import { encryptData, decryptData } from '../utils/crypto';

// Helper: encrypt an object’s string fields
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

// Helper: decrypt an object’s string fields
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

// Create Student
// Create Student
export const registerStudent = async (req: Request, res: Response) => {
  try {
    const encryptedFields = encryptObject(req.body);
    const student = new Student(encryptedFields as IStudent);
    await student.save();
    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (err: any) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors: Record<string, string> = {};
      for (const key in err.errors) {
        errors[key] = err.errors[key].message;
      }
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // Fallback for other errors
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};


// Get all students
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();

    // हर student को decrypt करके भेजेंगे
    const decryptedStudents = students.map((student) => {
      const obj = student.toObject() as Record<string, any>;
      return decryptObject(obj);
    });

    res.json(decryptedStudents);
  } catch (err: any) {
    console.error("❌ Error fetching students:", err);
    res.status(500).json({ error: err.message });
  }
};
// Update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const encryptedFields = encryptObject(req.body);
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      encryptedFields,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student updated', student: decryptObject(updated.toObject()) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
