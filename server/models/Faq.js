import mongoose from 'mongoose';

import languages from '../utils/languages.js'

const translationObject = {};
languages.forEach(lang => {
    translationObject[lang] = {
        question: { type: String },
        answer: { type: String }
    };
});

const FAQSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: translationObject
}, { timestamps: true });

export default mongoose.model('FAQ', FAQSchema);
