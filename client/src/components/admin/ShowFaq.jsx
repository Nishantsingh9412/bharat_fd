

import { FaEdit, FaTrash } from "react-icons/fa";
import React, {
    useState,
    useEffect
} from "react";
import parse from 'html-react-parser';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import languages from "../../components/languages";
import { DeleteFaqAPI, GetFaqAPI } from "../../api";

const ShowFaq = () => {
    const navigate = useNavigate();
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("en");

    useEffect(() => {
        fetchFAQs();
    }, [language]);

    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const response = await GetFaqAPI(language);
            setFaqs(response.data.result);
            console.log("response", response.data);

            // toast.success("FAQs fetched successfully");
        } catch (error) {
            toast.error("Error fetching FAQs");
        }
        setLoading(false);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleDelete = async (faqId) => {
        if (!window.confirm("Are you sure you want to delete this FAQ?"))
            return;

        setLoading(true);
        await DeleteFaqAPI(faqId).then((response) => {
            if (response.data.success) {
                toast.success("FAQ deleted successfully");
                fetchFAQs();
            }
        }).catch((error) => {
            console.error("Error deleting FAQ", error);
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleEdit = (faqId) => {
        console.log("Editing FAQ:", faqId);
        navigate(`/update-faq/${faqId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                </h1>
                <div className="relative max-w-xs mx-auto">
                    <select
                        onChange={handleLanguageChange}
                        value={language}
                        className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {languages.map((lang, index) => (
                            <option key={index} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {faqs.map((faq, index) => (
                    <div
                        key={faq._id}
                        className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg relative border
                        ${index & 1 ? "border-gray-200" : "border-blue-700"}`}
                    >
                        <button
                            onClick={() => handleToggle(index)}
                            className="w-full text-left flex justify-between items-center"
                        >
                            <span className="font-semibold text-gray-900">
                                {faq.question}
                            </span>
                        </button>

                        <div className="mt-3">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {parse(faq.answer)}
                            </p>
                        </div>
                        <div className="absolute bottom-3 right-3 flex space-x-2">
                            <button onClick={() => handleEdit(faq._id)}
                                className="cursor-pointer text-blue-600 hover:text-blue-800"
                            >
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(faq._id)}
                                className="cursor-pointer text-red-600 hover:text-red-800"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowFaq;
