import '../style/BubbleAnimation.css'; // Add the custom CSS file for bubble animations



const ContactPage = () => {
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
        <form className="bg-gradient-to-r from-purple-800 to-purple-900 p-8 rounded-lg shadow-lg space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-lg mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full p-4 rounded-lg bg-purple-700 text-white placeholder-gray-300 transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-500"
              placeholder="Your Email Address"
            />
          </div>

          {/* Phone (Optional) */}
          <div className="flex flex-col">
            <label className="text-lg mb-2">Phone (Optional)</label>
            <input
              type="tel"
              className="w-full p-4 rounded-lg bg-purple-700 text-white placeholder-gray-300 transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-500"
              placeholder="Your WhatsApp/Phone Number"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label className="text-lg mb-2">Message</label>
            <textarea
              required
              className="w-full p-4 rounded-lg bg-purple-700 text-white placeholder-gray-300 transition-transform duration-300 transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-purple-500"
              placeholder="Your Message..."
              rows={6}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-lg transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;