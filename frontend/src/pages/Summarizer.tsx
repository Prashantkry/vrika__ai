import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Summarizer = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [summary, setSummary] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [previousSummaries, setPreviousSummaries] = useState<{ textSummary: string; date: string }[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const backendAPI = import.meta.env.VITE_BackendAPI!;
    const storedEmail = localStorage.getItem('user');

    // ! Handle Text Summarization API call
    const handleSummarizeText = async () => {
        setLoading(true);
        setError(null);
        setSummary(null);
        try {
            const response = await fetch(`${backendAPI}/api/v1/summarizeText`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ textData: inputValue, email: storedEmail }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to summarize text");
            }

            const dataText = await response.json();
            // console.log("DataText:", dataText);
            setSummary(dataText.textSummary);

            toast.success("Text summarized successfully!");
            getPreviousSummaries();
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to summarize the text. Please try again.");
            toast.error("Failed to summarize the text. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ! Get last 3 summaries
    const getPreviousSummaries = async () => {
        try {
            const response = await fetch(`${backendAPI}/api/v1/summarizeText`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(storedEmail && { email: storedEmail }),
                }
            });

            if (!response.ok) {
                throw new Error("Failed to get previous summaries");
            }

            const data = await response.json();
            // console.log("Previous Summaries:", data);
            setPreviousSummaries(data.previousSummaries);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to get previous summaries. Please try again.");
        }
    };

    useEffect(() => {
        getPreviousSummaries();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 flex flex-col justify-start items-center py-8 md:py-0">
            <div className="text-white text-center p-6 md:px-10 md:py-2 w-full max-w-screen-lg mx-auto space-y-8 md:space-y-10">
                <p className="text-3xl pb-3 md:text-6xl lg:mt-5 font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    Summarize Your Text
                </p>
                <p className="text-sm md:text-2xl text-gray-400 italic">
                    Paste a large paragraph and get a concise summary.
                </p>

                <div className="w-full">
                    <textarea
                        placeholder="Paste your paragraph here..."
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-full py-3 md:py-4 px-4 md:px-6 text-base md:text-lg text-gray-200 bg-transparent border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition-transform duration-300 transform hover:scale-105 placeholder-gray-500"
                        rows={6}
                    />
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleSummarizeText}
                        disabled={loading}
                        className={`w-full md:w-auto px-6 py-3 md:px-8 md:py-4 font-semibold text-base md:text-lg rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${loading ? "animate-pulse" : ""}`}
                    >
                        {loading ? (
                            <>
                                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                                <span>Summarizing...</span>
                            </>
                        ) : (
                            <p>Summarize Text</p>
                        )}
                    </button>
                </div>

                {error && <p className="mt-4 text-red-500">{error}</p>}

                {summary && (
                    <div className="mt-8 p-4 md:p-6 drop-shadow-xl shadow-xl border border-gray-600 text-left text-gray-200 rounded-lg w-full max-w-screen-lg mx-auto">
                        <h2 className="text-lg md:text-2xl font-bold mb-3">Summary 📝</h2>
                        <p className="text-sm md:text-lg">{summary}</p>
                    </div>
                )}

                {/* previous summary */}
                <div className="my-8 p-4 md:p-6 drop-shadow-xl shadow-xl border-0 border-gray-600 text-left text-gray-200 rounded-lg w-full max-w-screen-lg mx-auto">
                    <p className="text-lg text-left md:text-2xl font-bold mb-3">Previous Summaries 📚</p>
                    {previousSummaries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {previousSummaries.map((summary, index) => (
                                <div key={index} className="p-4 rounded-md border border-gray-600 shadow-lg">
                                    <strong className="block text-sm">{summary.textSummary}</strong>
                                    <span className="block mt-2 text-gray-400 text-sm md:text-base">{summary.date}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg md:text-2xl font-bold mb-3">No Previous Summaries</h2>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Summarizer;
