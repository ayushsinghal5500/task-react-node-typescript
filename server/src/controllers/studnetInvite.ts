import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

export const sendStudentInvite = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Use part of email as placeholder name
    const fullName = email.split('@')[0];

    // 🔹 Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 🔹 Email options
    const mailOptions = {
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'You are invited!',
      html: `
        <h2>Hello ${fullName},</h2>
        <p>You have been invited to join our platform.</p>
        <p>Click below to register:</p>
        <a href="${process.env.CLIENT_URL}/register?email=${email}" 
           style="padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">
           Join Now
        </a>
        <p>Thank you!</p>
      `,
    };

    // 🔹 Send email
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: 'Invitation sent successfully',
      info: info.messageId,
    });
  } catch (error: any) {
    console.error('Invite Error:', error);
    return res.status(500).json({ message: 'Failed to send invite', error: error.message });
  }
};