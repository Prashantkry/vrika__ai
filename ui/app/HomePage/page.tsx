"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [mediumImageUrl, setMediumImageUrl] = useState<string | null>(null);
  const [smallImageUrl, setSmallImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const downloadImage = (url: string, size: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `generated-art-${size}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="text-white text-center p-6 md:p-10 w-full max-w-screen-lg mx-auto space-y-8">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Create Stunning AI Art
        </h1>
        <p className="text-base md:text-2xl text-gray-400 italic">
          Turn your ideas into visual masterpieces with just a few words.
        </p>

        {/* Input Section */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Describe your vision..."
            value={inputValue}
            onChange={handleInputChange}
            className="w-full py-3 md:py-4 px-4 md:px-6 text-base md:text-lg text-gray-200 bg-transparent border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-500 focus:border-pink-500 transition-transform duration-300 transform hover:scale-105 placeholder-gray-500"
          />
        </div>

        {/* Generate Button */}
        <div className="mt-4">
          <button
            onClick={handleGenerateArt}
            disabled={loading}
            className={`w-full md:w-auto px-6 py-3 md:px-8 md:py-4 font-semibold text-base md:text-lg rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
              loading ? "animate-pulse" : ""
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

        {/* Error Handling */}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Image Display */}
        {originalImageUrl && (
          <div className="relative mt-8 h-60 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={originalImageUrl}
              alt="Generated Art"
              layout="fill"
              className="object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Image Download Buttons */}
        {originalImageUrl && (
          <div className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button
              onClick={() => downloadImage(originalImageUrl, "original")}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              Download Original
            </button>
            <button
              onClick={() => downloadImage(mediumImageUrl!, "medium")}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              Download Medium
            </button>
            <button
              onClick={() => downloadImage(smallImageUrl!, "small")}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              Download Small
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
