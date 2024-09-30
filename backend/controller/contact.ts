import { Request, Response } from "express";
import nodemailer from "nodemailer";
const passwordE = process.env.EMAIL_PASS
const emailAdmin = process.env.EMAIL

export const contactBackend = async (req: Request, res: Response) => {
  const { email, message, phone } = req.body; 

  if (!email || !message || !phone) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  // Nodemailer setup for sending the email from your Gmail account
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: emailAdmin, 
      pass: passwordE, 
    },
  });

  const mailOptions = {
    from: emailAdmin,
    to: email,
    subject: "Message from Contact Form",
    text: `Customer's email: ${email}\n\nPhone: ${phone}\n\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
