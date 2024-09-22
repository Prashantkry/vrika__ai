import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaFacebook, FaClipboard, FaLinkedin, FaInstagram, FaDownload } from "react-icons/fa"; // Social media icons
import w1 from "../style/media";
const TextToImage = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [mediumImageUrl, setMediumImageUrl] = useState<string | null>(null);
    const [smallImageUrl, setSmallImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedSize, setSelectedSize] = useState<string>("original"); // Track selected size

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const backendAPI = "http://localhost:4000/api/v1/GenerateArt";

    const handleGenerateArt = async () => {
        setLoading(true);
        setError(null);
        setOriginalImageUrl(null);
        try {
            const response = await fetch(backendAPI, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: inputValue }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate art");
            }

            const data = await response.json();
            setOriginalImageUrl(data.originalImageUrl);
            setMediumImageUrl(data.mediumImageUrl);
            setSmallImageUrl(data.smallImageUrl);
        } catch (error) {
            console.error("Error:", error);
            setError("Failed to generate art. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        let url = originalImageUrl;
        let size = "original";
        if (selectedSize === "medium") {
            url = mediumImageUrl;
            size = "medium";
        } else if (selectedSize === "small") {
            url = smallImageUrl;
            size = "small";
        }
        if (url) {
            const link = document.createElement("a");
            link.href = url;
            link.download = `generated-art-${size}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            alert("Image URL copied to clipboard!");
        });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const shareOnFacebook = (url: string) => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    const shareOnLinkedIn = (url: string) => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    };

    const shareOnInstagram = () => {
        alert("Instagram sharing not directly supported via URL sharing.");
    };
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col justify-start items-center py-8 md:py-0">
                {showModal && originalImageUrl ? (
                    <img src={w1} alt="" className="w-40 md:w-52 h-auto rounded mb-6" />
                ) : (
                    <img src={w1} alt="" className="w-40 md:w-52 h-auto rounded md:mt-10" />
                )}

                <div className="text-white text-center border-0 p-6 md:px-10 md:py-2 w-full max-w-screen-lg mx-auto space-y-8 md:space-y-10">
                    <h1 className="text-3xl pb-3 border-0 md:text-6xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                        Create Stunning AI Art
                    </h1>
                    <p className="text-sm md:text-2xl text-gray-400 italic border-0">
                        Turn your ideas into visual masterpieces with just a few words using Vrika AI.
                    </p>

                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Describe your vision..."
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full py-3 md:py-4 px-4 md:px-6 text-base md:text-lg text-gray-200 bg-transparent border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition-transform duration-300 transform hover:scale-105 placeholder-gray-500"
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleGenerateArt}
                            disabled={loading}
                            className={`w-full md:w-auto px-6 py-3 md:px-8 md:py-4 font-semibold text-base md:text-lg rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${loading ? "animate-pulse" : ""
                                }`}
                        >
                            {loading ? (
                                <>
                                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                "Generate Art"
                            )}
                        </button>
                    </div>

                    {error && <p className="mt-4 text-red-500">{error}</p>}

                    {originalImageUrl && (
                        <>
                            <div
                                className="relative mt-8 h-60 md:h-96 w-full rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:translate-y-[-10px] cursor-pointer"
                                onClick={openModal}
                                style={{
                                    perspective: "1000px",
                                }}
                            >
                                <p className="text-gray-300 absolute z-10 px-2 text-xs font-semibold py-1 border-purple-700">Click on image to view</p>
                                <img
                                    src={originalImageUrl}
                                    alt="Generated Art"
                                    className="w-full h-full rounded-lg transform transition-transform duration-500 ease-out object-cover hover:scale-110"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full border-0 h-fit md:pb-4">
                                <div className="flex items-center justify-center space-x-6 w-fit rounded border border-gray-800">
                                    {/* Download Section */}
                                    <select
                                        className="p-2 bg-black from-gray-300 to-gray-400 text-gray-200 rounded-lg transition-transform transform outline-none"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value="original">Original</option>
                                        <option value="medium">Medium</option>
                                        <option value="small">Small</option>
                                    </select>

                                    <button
                                        onClick={downloadImage}
                                        className="px-4 py-2 text-white"
                                    >
                                        <FaDownload />
                                    </button>
                                </div>

                                {/* Social Media Share Buttons */}
                                <div className="flex justify-center items-center space-x-4 mt-3 md:mt-0 border-0 w-fit">
                                    <button
                                        onClick={() => shareOnFacebook(originalImageUrl!)}
                                        className="p-2 bg-blue-600 text-white rounded-full flex items-center space-x-2 hover:bg-blue-700"
                                    >
                                        <FaFacebook size={20} />
                                    </button>
                                    <button
                                        onClick={() => shareOnLinkedIn(originalImageUrl!)}
                                        className="p-2 bg-blue-400 text-white rounded-full flex items-center space-x-2 hover:bg-blue-500"
                                    >
                                        <FaLinkedin size={20} />
                                    </button>
                                    <button
                                        onClick={() => shareOnInstagram()}
                                        className="p-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full flex items-center space-x-2 hover:bg-pink-500"
                                    >
                                        <FaInstagram size={20} />
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(originalImageUrl!)}
                                        className="p-2 bg-gray-700 text-white rounded-full flex items-center space-x-2 hover:bg-gray-800"
                                    >
                                        <FaClipboard size={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {showModal && originalImageUrl && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="relative max-w-4xl w-full mx-4">
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={closeModal}
                                        className="text-white text-2xl font-semibold"
                                    >
                                        &times;
                                    </button>
                                </div>
                                <img
                                    src={originalImageUrl}
                                    alt="Generated Art"
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TextToImage