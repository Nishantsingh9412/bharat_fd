import otpGenerator from 'otp-generator';

import OTP from '../models/otp.js';
import Auth from '../models/auth.js';
import mailSender from '../utils/mailsender.js';


export const sendVerificationEmail = async (email, otp) => {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
         <p>Here is your OTP code: ${otp}</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
}


export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if user is already present
        const existingGoogleUser = await Auth.findOne({
            email: email,
            isGoogleAuthenticated: true
        });
        if (existingGoogleUser) {
            return res.status(400).json({
                success: false,
                message: "This email requires google sign in"
            });
        }
        const existingUser = await Auth.findOne({ email });
        // If user found with provided email
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User is already registered',
            });
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log('Generated OTP : ', otp);
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const validateOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("response OTP :", response)
        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'The OTP is valid',
            });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}