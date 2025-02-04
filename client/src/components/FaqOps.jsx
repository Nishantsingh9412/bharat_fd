import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AddFaqAPI } from "../api";

const FaqOps = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "image",
        "video",
    ];

    const handleAnswerChange = (content) => {
        setAnswer(content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question || !answer) {
            toast.error("Please fill all the fields.");
            return;
        }
        setLoading(true);

        await AddFaqAPI({
            question,
            answer
        }).then((response) => {
            if (response.data.success) {
                navigate("/admin");
                toast.success("FAQ added successfully");
            }
        }).catch((error) => {
            console.log("Error adding FAQ", error);
            toast.error("Failed to add FAQ.Please try again");
        }).finally(() => {
            setLoading(false);
        });

    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New FAQ</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Question:</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        placeholder="Enter question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-2">Answer:</label>
                    <div className="relative">
                        <ReactQuill
                            value={answer}
                            formats={formats}
                            modules={modules}
                            onChange={handleAnswerChange}
                            placeholder="Include all necessary information"
                            className="w-full rounded-md"
                            theme="snow"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className={`cursor-pointer bg-blue-900 text-white px-4 py-2 rounded hover:bg-orange-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Add FAQ"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FaqOps;
