import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import OTP from '../models/Otp.js';

dotenv.config();

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Generate OTP and send it to the email
const generateOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

  // Save OTP to DB
  const otpRecord = new OTP({ email, otp });
  await otpRecord.save();

  // Send OTP to the email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


const verifyOtp = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

  if (!otpRecord) {
      throw new Error('No OTP record found for this email');
  }

  console.log("Provided OTP:", otp);
  console.log("Stored OTP:", otpRecord.otp);

  if (otp !== otpRecord.otp) {
      throw new Error('Invalid OTP'); // Ensure this condition matches correctly
  }

  const currentTime = new Date();
  const expirationTime = new Date(otpRecord.createdAt).getTime() + 10 * 60 * 1000;

  if (currentTime.getTime() > expirationTime) {
      throw new Error('OTP has expired');
  }

  return true;
};

export {generateOtp, verifyOtp};