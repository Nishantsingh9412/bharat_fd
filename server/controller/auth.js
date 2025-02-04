import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import OTP from "../models/otp.js";
import Auth from "../models/auth.js";

export const SignupController = async (req, res) => {
    const {
        fname,
        lname,
        email,
        otp,
        password,
        confirm_password
    } = req.body;

    if (
        !fname ||
        !lname ||
        !otp ||
        !email ||
        !password ||
        !confirm_password
    ) {

        return res.status(400)
            .json({
                success: false,
                message: "Please fill all the fields"
            });
    }
    if (password !== confirm_password) {
        return res.status(400)
            .json({
                success: false,
                message: "Password does not match"
            });
    }
    try {
        const existingUser = await Auth.findOne({ email: email });

        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (response.length === 0 || otp !== response[0].otp) {
            return res.status(400)
                .json({
                    success: false,
                    message: 'The OTP is not valid',
                });
        }

        if (existingUser) {
            console.log("Validation failed: User already exists");
            return res.status(400).json({ success: false, message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            console.log("Hashed password:", hashedPassword);

            const newUser = await Auth.create({
                fname,
                lname,
                email,
                password: hashedPassword,
            });
            console.log("New user created:", newUser);

            const token = jwt.sign({
                email: newUser.email,
                id: newUser._id
            },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );
            console.log("JWT token:", token);

            return res.status(201).json({
                success: true,
                result: newUser,
                token,
                message: "User Registered Successfully"
            });
        }
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            err: err
        });
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }
    try {
        const existingUser = await Auth.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        } else {
            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );
            return res.status(200).json({
                success: true,
                result: existingUser,
                token,
                message: "User Logged In Successfully"
            })
        }
    } catch (err) {
        return res.status(500)
            .json({
                success: false,
                message: "Something went wrong"
            });
    }
}

