import express from "express";

import {
    createFaq,
    deleteFaqSingle,
    getFaqs,
    getFaqSingle,
    updateFaqSingle,
} from "../controller/faqController.js";

const router = express.Router();

router.get("/get-faqs", getFaqs);
router.get("/get-faq-single/:id", getFaqSingle);
router.post("/create-faqs", createFaq);
router.delete("/delete-faqs/:id", deleteFaqSingle);
router.put("/update-faqs/:id", updateFaqSingle);


export default router;