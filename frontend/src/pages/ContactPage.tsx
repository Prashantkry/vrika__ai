import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaRightLong } from 'react-icons/fa6';
import '../style/BubbleAnimation.css';

const backendAPI = import.meta.env.VITE_BackendAPI!;

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loader state

  const notifySuccess = () => toast.success("Message sent successfully!");
  const notifyError = (msg: string) => toast.error(msg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const res = await fetch(`${backendAPI}/api/v1/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone, message }),
      });

      if (res.ok) {
        notifySuccess();
        setEmail('');  
        setPhone('');
        setMessage('');
      } else {
        const errorData = await res.json();
        notifyError(errorData.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      notifyError('Failed to send message.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-purple-900 to-black min-h-screen text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Bubble Animation */}
      <div className="bubble-container">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
      </div>

      <section className="w-full max-w-lg py-16 animate-fade-in z-10">
        <h2 className="text-5xl font-bold text-center mb-8 animate-slide-in">
          Contact Vrika AI
        </h2>
        <p className="text-center text-xl mb-8">
          Have questions or need help? Reach out to us, and we’ll get back to you soon.
        </p>
        <form
          className="bg-gradient-to-r from-purple-800 to-purple-900 p-8 rounded-lg shadow-lg space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-lg mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 outline-none rounded-lg bg-purple-700 text-white placeholder-gray-300 transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-500"
              placeholder="Your Email Address"
            />
          </div>

          {/* Phone (Optional) */}
          <div className="flex flex-col">
            <label className="text-lg mb-2">Phone (Optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-4 outline-none rounded-lg bg-purple-700 text-white placeholder-gray-300 transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-500"
              placeholder="Your WhatsApp/Phone Number"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-lg mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-4 outline-none rounded-lg bg-purple-700 text-white placeholder-gray-300 transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-500"
              placeholder="Your Message..."
              rows={6}
            />
          </div>

          {/* Loader with FaRightLong Icon */}
          {loading && (
            <div className="text-center">
              <FaRightLong className="animate-spin text-4xl mx-auto mb-4" />
              <p>Sending...</p>
            </div>
          )}

          {/* Send Button */}
          {!loading && (
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-lg transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
            >
              Send
            </button>
          )}
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
