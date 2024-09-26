import React from 'react';
import { useNavigate } from 'react-router-dom';
import { city, village, war } from '../style/media';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/TextToImage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white flex flex-col justify-center">
      <section className="w-full max-w-6xl mx-auto py-20 text-center px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-shadow-lg tracking-tight leading-tight">
          Create Stunning AI Art with Vrika AI
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Discover the endless possibilities of AI-generated images, videos, and creative assets. Transform your imagination into visual masterpieces effortlessly.
        </p>

        <div className="flex justify-center mb-14">
          <button
            onClick={handleNavigation}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-gradient-to-l text-white px-12 py-4 md:px-14 md:py-5 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-500">
            Start Creating
          </button>
        </div>

        {/* 3D Rotating Image Showcase */}
      <section className="w-full max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Image Cards with 3D Effects */}
        {[{ src: war, title: "AI Art: War" }, { src: city, title: "AI Art: City" }, { src: village, title: "AI Art: Village" }].map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform hover:rotate-3 hover:scale-110 hover:translate-y-2"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-xl font-bold text-white">{image.title}</h3>
            </div>
          </div>
        ))}
      </section>
      </section>
    </div>
  );
};

export default HomePage;
