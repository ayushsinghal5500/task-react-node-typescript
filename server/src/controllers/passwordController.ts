import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import Student from '../models/Student'; // your student model
import jwt from 'jsonwebtoken';

// 🔹 Request Password Reset
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    // 1️⃣ Check if user exists
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'User not found' });

    // 2️⃣ Generate token (valid for 1 hour)
    const token = jwt.sign({ id: student._id, email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    // 3️⃣ Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // 4️⃣ Send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    });

    return res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error: any) {
    console.error('Password Reset Error:', error);
    return res.status(500).json({ message: 'Failed to send password reset link', error: error.message });
  }
};
