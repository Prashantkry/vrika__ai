const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 flex flex-col justify-center items-center text-white">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">
          Thank you for your purchase. Your subscription has been activated successfully.
        </p>
        <p className="mb-4">
          You can now enjoy all the benefits of your subscription. If you have any questions, feel free to reach out.
        </p>
        <a href="/" className="mt-6 inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
