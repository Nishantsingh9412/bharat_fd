import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
}, { timestamps: true });


export default mongoose.model('Auth', authSchema);