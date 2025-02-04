import FAQ from "../models/Faq.js";
import redisClient from '../config/redisClient.js';
import translateText from '../utils/translation.js';
import languages from "../utils/languages.js";
import mongoose from "mongoose";

export const getFaqs = async (req, res) => {

    const lang = req.query.lang || 'en';
    // Check cache
    const cachedFAQs = await redisClient.get(`faqs_${lang}`);
    if (cachedFAQs) {
        return res.json({
            success: true,
            message: 'Data retrieved from the cache',
            result: JSON.parse(cachedFAQs),
        });
    }
    // let faqs = await FAQ.find({});
    // if (lang !== 'en') {
    //     faqs = await Promise.all(faqs.map(async (faq) => {
    //         return {
    //             question: faq.translations[lang] || await translateText(faq.question, lang),
    //             answer: faq.answer
    //         };
    //     }));
    // }
    try {
        let faqs = await FAQ.find({});
        if (faqs) {
            if (lang !== 'en') {
                faqs = faqs.map(faq => ({
                    _id: faq._id,
                    question: faq.translations[lang].question,
                    answer: faq.translations[lang].answer
                }));
            } else {
                faqs = faqs.map(faq => ({
                    _id: faq._id,
                    question: faq.question,
                    answer: faq.answer
                }));
            }
            // Storing in Redis cache
            redisClient.setEx(`faqs_${lang}`, 3600, JSON.stringify(faqs));
            return res.status(200).json({
                success: true,
                message: 'Data retrieved from the database',
                result: faqs,
            })
        } else {
            res.status(500).json({ message: 'No FAQs found' });
        }
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: 'No FAQs found',
                error: error.message
            });
    }
}

export const getFaqSingle = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({
            success: false,
            message: 'No FAQ with that id'
        });

    try {
        const FaqSingle = await FAQ.findById(_id).select('-translations');
        if (FaqSingle) {
            return res.status(200).json({
                success: true,
                message: 'FAQ found',
                result: FaqSingle
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'FAQ not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

export const createFaq = async (req, res) => {
    try {
        const {
            question,
            answer
        } = req.body;

        const translations = {};
        for (const lang of languages) {
            translations[lang] = {
                question: await translateText(question, lang),
                answer: await translateText(answer, lang)
            };
        }
        const faq = await FAQ.create({
            question,
            answer,
            translations
        });

        if (!faq) {
            return res.status(400).json({
                success: false,
                message: 'FAQ creation failed'
            });
        } else {
            // Clearing Redis cache
            for (const lang of languages) {
                redisClient.del(`faqs_${lang}`);                //  ex:faq_en,faq_hi,faq_bn
            }
            res.status(201).json({
                success: true,
                message: 'FAQ created successfully',
                result: faq
            });
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'FAQ creation failed',
            error: err.message
        });
    }
}

export const updateFaqSingle = async (req, res) => {
    const { id: _id } = req.params;
    const { question, answer } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({
            success: false,
            message: 'No FAQ with that id'
        });

    try {
        const faq = await FAQ.findById(_id);
        if (faq) {
            faq.question = question;
            faq.answer = answer;
            faq.translations = {};
            for (const lang of languages) {
                faq.translations[lang] = {
                    question: await translateText(question, lang),
                    answer: await translateText(answer, lang)
                };
            }
            const UpdatedFAQ = await FAQ.findByIdAndUpdate(_id, faq, { new: true });
            if (!UpdatedFAQ) {
                return res.status(404).json({
                    success: false,
                    message: 'Error updating FAQ'
                });
            } else {
                for (const lang of languages) {
                    redisClient.del(`faqs_${lang}`);                //  ex:faq_en,faq_hi,faq_bn
                }
                return res.status(200).json({
                    success: true,
                    message: 'FAQ updated successfully',
                    result: faq
                });
            }
        } else {
            return res.status(404).json({
                success: false,
                message: 'Error updating FAQ'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'FAQ update failed',
            error: error.message
        });
    }
}

export const deleteFaqSingle = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({
            success: false,
            message: 'No FAQ with that id'
        });

    try {
        const DeleteFaQ = await FAQ.findByIdAndDelete(_id);
        if (DeleteFaQ) {
            // Clearing Redis cache
            for (const lang of languages) {
                redisClient.del(`faqs_${lang}`);
            }
            return res.status(200).json({
                success: true,
                message: 'FAQ deleted successfully',
                result: DeleteFaQ
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Error deleting FAQ'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}
