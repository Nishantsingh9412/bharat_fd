// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import faqRoutes from "./routes/faqRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";



const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use("/auth", authRoutes);
app.use('/otp', otpRoutes)
app.use("/faqs", faqRoutes);

// ----------------------------deployment--------------------------------------
const __dirname = path.resolve();
// console.log(__dirname)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(("./frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "./frontend", "dist", "index.html"));
    });

} else {
    app.get('/', (req, res) => {
        res.send("Welcome to BharatFd API's ")
    })
}
// ----------------------------deployment-------------------------------------- 


const PORT = process.env.PORT || 8081;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
    .connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`server running on PORT ${PORT}`);
        })
    )
    .catch((err) => console.log(err));
