import express from "express";
const router = express.Router();
import {sendOtpController, verifyOtpController} from "../controllers/otpController.js";

// Route to send OTP
router.post('/sendOtp', sendOtpController);

// Route to verify OTP
router.post('/verifyOtp', verifyOtpController);


export default router;