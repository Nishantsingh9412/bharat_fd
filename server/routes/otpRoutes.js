import express from 'express'
import {
    sendOTP,
    validateOTP
} from '../controller/otpController.js';

const router = express.Router();

router.post('/send-otp', sendOTP);

router.post('/validate-otp', validateOTP)




export default router;