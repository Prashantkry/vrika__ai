import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const backendAPI = import.meta.env.VITE_BackendAPI!;
import { ClipLoader } from 'react-spinners';
import { FaRightLong } from 'react-icons/fa6';

const SignIn = () => {
    // States to store form input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const notifySuccess = (message: string) => toast.success(message);
    const notifyError = (message: string) => toast.error(message);

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Prepare the data to be sent to the backend
        const userData = {
            email,
            password,
        };

        setLoading(true);

        try {
            const response = await fetch(`${backendAPI}/api/v1/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                notifySuccess('User signed in successfully!');
                setEmail('');
                setPassword('');
                localStorage.setItem('user', email);
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                console.error('Error signing in:', data.message);
                notifyError(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            notifyError('Error signing in, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gradient-to-b from-black to-purple-900 text-white flex flex-col items-center justify-center w-full pb-10 md:p-20">
            <div className='w-[90vw] md:w-[50vw]'>
                {/* Section Title */}
                <h3 className="text-center text-4xl font-extrabold text-purple-300 mb-5">
                    Sign In to Your Account
                </h3>
                <p className="text-center text-lg text-gray-400 mb-10 max-w-xl mx-auto">
                    Please enter your credentials to access your account.
                </p>

                {/* Form Container */}
                <div className="bg-gray-900 relative rounded-lg p-5 md:p-10 shadow-xl overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-20 blur-lg animate-pulse"></div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-gray-800 border border-gray-700 text-white rounded-lg w-full p-3 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                placeholder="Your Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="bg-gray-800 border border-gray-700 text-white rounded-lg w-full p-3 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                                placeholder="Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center flex items-start justify-between w-full">
                            <button
                                type="submit"
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-400 focus:outline-none rounded-lg text-sm px-6 py-3 transition-transform duration-300 hover:scale-105"
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={20} color="#fff" /> : 'Sign In'}
                            </button>
                            <div className="flex flex-col items-center justify-between w- ml-5">
                                <p className="text-sm text-gray-400 mb-1">Don't have an account?</p>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="flex items-center justify-center w-full text-purple-400 hover:text-purple-600 transition"
                                >
                                    <span>Sign Up</span> <FaRightLong size={14} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Floating Background Elements */}
                    <div className="absolute -top-5 -left-5 w-36 h-36 bg-purple-500 rounded-full opacity-30 animate-bounce"></div>
                    <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
