
import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-black to-purple-900 min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Payment Canceled</h1>
        <p className="text-lg mb-6">
          We're sorry to see you go! Your payment has not been processed.
        </p>
        <Link to="/" className="inline-block">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
