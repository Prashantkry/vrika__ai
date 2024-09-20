import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
const passwordE = process.env.EMAIL_PASS
// console.log("passwordE => ",passwordE)
export const contactBackend = async (req: Request, res: Response) => {
  const { email, message } = req.body; // Customer's email and message
  console.log("email => ",email," message => ",message)

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required" });
  }

  // Nodemailer setup for sending the email from your Gmail account
  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmail service
    auth: {
      user: "prashantkry99@gmail.com", // Your email
      pass: passwordE, // Your Gmail app-specific password
    },
  });

  const mailOptions = {
    from: "prashantkry99@gmail.com", // Your email
    to: email,
    subject: "Message from Contact Form",
    text: `Customer's email: ${email}\n\nMessage: ${message}`, // Email content with customer's email and message
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
