import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


import {
    GetFaqByIdAPI,
    UpdateFaqAPI
} from "../../api";



const UpdateFaQ = () => {
    const navigate = useNavigate();
    const { id: _id } = useParams();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
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
        "blockquote",
        "list",
        "bullet",
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

        const UpdatedFaq = {
            question,
            answer
        }

        await UpdateFaqAPI(_id, UpdatedFaq).then((response) => {
            console.log(response);
            if (response.data.success) {
                toast.success("FAQ updated successfully.");
                navigate('/admin')
            }
        }).catch((error) => {
            console.log("Error updating FAQ", error);
            toast.error("Failed to Update FAQ.");
        }).finally(() => {
            setLoading(false);
        });
    };

    const fetchFAQs = async () => {
        setLoading(true);
        await GetFaqByIdAPI(_id).then((response) => {
            setQuestion(response.data.result.question);
            setAnswer(response.data.result.answer);
        }).catch((error) => {
            console.error("Error fetching FAQ", error);
        }).finally(() =>
            setLoading(false)
        );
    };

    useEffect(() => {
        fetchFAQs();
    }, [])

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Update FAQ</h2>
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
                        {loading ? "Submitting..." : "Update FAQ"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateFaQ;
