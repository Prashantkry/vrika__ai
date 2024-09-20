"use client";
import React, { useState } from 'react';

const HomePage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const backendAPI = 'http://localhost:4000/api/v1/GenerateArt';

    const handleGenerateArt = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(backendAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: inputValue }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate art');
            }

            const data = await response.json();
            setImageUrl(data.imageUrl); // The image is a Base64-encoded string
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to generate art. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen flex flex-col items-center justify-start">
            <div className="text-white text-center p-10 w-full max-w-2xl mx-auto">
                <p className="text-5xl md:text-6xl font-bold tracking-wide mb-4 text-center whitespace-nowrap">
                    Unleash Your Creativity
                </p>
                <p className="mt-2 text-lg md:text-xl w-full italic">Transform your ideas into stunning visuals with Vrika AI</p>
                <input
                    type="text"
                    name="textInp"
                    id="textInp"
                    className="w-full bg-transparent border-2 border-gray-600 py-3 px-4 rounded-lg my-6 text-gray-300 outline-none placeholder-gray-500 focus:ring focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Describe your vision..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button
                    onClick={handleGenerateArt}
                    className="relative inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-lg text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 group">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient opacity-30 group-hover:opacity-100 transition duration-300"></span>
                    <span className="relative z-10">{loading ? 'Generating...' : 'Generate Art'}</span>
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>} {/* Display error message */}
                {imageUrl && (
                    <div className="mt-6">
                        <img src={imageUrl} alt="Generated Art" className="rounded-lg shadow-lg max-w-full h-auto" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
