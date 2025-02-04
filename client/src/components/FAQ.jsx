import React, {
    useState,
    useEffect
} from "react";
import {
    FaAngleDown,
    FaAngleUp
} from "react-icons/fa";
import parse from 'html-react-parser';
import { toast } from "react-hot-toast";

import languages from "./languages";
import { GetFaqAPI } from "../api";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState("en");

    const fetchFAQs = async () => {
        setLoading(true);
        await GetFaqAPI(language).then((response) => {
            if (response.data.success) {
                setFaqs(response.data.result);
            }
        }).catch((error) => {
            console.error("Error fetching FAQs", error);
            toast.error("Error fetching FAQs");
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        fetchFAQs();
    }, [language]);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (faqs.length === 0) {
        return (
            <>
                <nav className="bg-gray-100 border-b-red-700 dark:bg-gray-100">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="https://bharatfd.azurewebsites.net/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img
                                src="https://res.cloudinary.com/dezifvepx/image/upload/v1738508413/bharatfd_logo_tvqxyl.jpg"
                                className="h-8"
                                alt="Flowbite Logo"
                            />
                            <div className=" flex self-center text-2xl font-semibold whitespace-nowrap text-white">
                                <p className='text-[#2C387A]'>
                                    Bharat
                                </p>
                                <p className="text-[#E4803A]">
                                    FD
                                </p>
                            </div>
                        </a>
                        <a href="/login">Admin Panel</a>
                    </div>
                </nav>
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs Found</h3>
                            <p className="text-gray-500">Check back later for updates!</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <nav className="bg-gray-100 border-b-red-700 dark:bg-gray-100">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://bharatfd.azurewebsites.net/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                            src="https://res.cloudinary.com/dezifvepx/image/upload/v1738508413/bharatfd_logo_tvqxyl.jpg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        <div className=" flex self-center text-2xl font-semibold whitespace-nowrap text-white">
                            <p className='text-[#2C387A]'>
                                Bharat
                            </p>
                            <p className="text-[#E4803A]">
                                FD
                            </p>
                        </div>
                    </a>
                    <a href="/login">Admin Panel</a>
                </div>
            </nav>
            <div className="max-w-4xl mx-auto px-4 py-12">


                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </h1>
                    <div className="relative max-w-xs mx-auto">
                        <select
                            onChange={handleLanguageChange}
                            value={language}
                            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {languages.map((lang, index) => (
                                <option key={index} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FaAngleDown className="w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${activeIndex === index ? 'ring-2 ring-blue-500' : ''
                                }`}
                        >
                            <button
                                onClick={() => handleToggle(index)}
                                className="w-full text-left px-6 py-4 flex justify-between items-center gap-4"
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                {activeIndex === index ? (
                                    <FaAngleUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                    <FaAngleDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                )}
                            </button>

                            {activeIndex === index && (
                                <div className="px-6 pb-4 pt-2">
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {parse(faq.answer)}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FAQ;

