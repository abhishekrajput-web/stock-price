
// // real one 
// import { generateOtp, verifyOtp } from "../helper/otpService.js";

// // Route to send OTP
// const sendOtpController = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Validate email format
//     if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
//       return res.status(400).json({ message: 'Invalid email format' });
//     }

//     // Generate and send OTP
//     await generateOtp(email);
//     res.status(200).json({ message: 'OTP sent successfully', success:true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error sending OTP', success:false });
//   }
// };

// // Route to verify OTP
// const verifyOtpController = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     // Verify the OTP
//     await verifyOtp(email, otp);
//     res.status(200).json({ message: 'OTP verified successfully', success:true});
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message, success:false });
//   }
// };

// export { sendOtpController, verifyOtpController };





// joi version 

import { generateOtp, verifyOtp } from "../helper/otpService.js";
import {sendOtpSchema, verifyOtpSchema} from "../helper/validations.js";
 
// Route to send OTP
const sendOtpController = async (req, res) => {
  const { email } = req.body;

  // Validate request body
  const { error } = sendOtpSchema.validate({ email });
  if (error) {
    return res.json({ message: error.details[0].message, success: false });
  }

  try {
    // Generate and send OTP
    await generateOtp(email);
    res.status(200).json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP", success: false });
  }
};

// Route to verify OTP
const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  // Validate request body
  const { error } = verifyOtpSchema.validate({ email, otp });
  if (error) {
    return res.json({ message: error.details[0].message, success: false });
  }

  try {
    // Verify the OTP
    await verifyOtp(email, otp);
    res.status(200).json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message, success: false });
  }
};


export {sendOtpController, verifyOtpController};