import React, { useEffect, useState } from 'react';
import { FaEdit, FaDownload, FaShare, FaTimes } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

const backendAPI = import.meta.env.VITE_BackendAPI!;

const ProfilePage = () => {
    interface UserData {
        name: string;
        email: string;
        phoneNo?: string;
        credits?: number;
        plan?: string;
        cardDetails: {
            cardHolderName: string;
            cardNumber: string;
            cvv: string;
            expiryDate: string;
        };
    }

    interface GeneratedImage {
        _id: string;
        email: string;
        generatedAt: string;
        imageData: string;
        prompts?: string;
    }

    const [userData, setUserData] = useState<UserData | null>(null);
    const [images, setImages] = useState<GeneratedImage[]>([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true);
    const [editing, setEditing] = useState(false);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

    const email = localStorage.getItem('user');

    const getUserData = async () => {
        const res = await fetch(`${backendAPI}/api/v1/getUserData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                email: email!,
            },
        });
        const data = await res.json();
        setUserData(data.userData);
        setLoadingUser(false);
    };

    const fetchUserImages = async () => {
        const res = await fetch(`${backendAPI}/api/v1/ImageStoreDatabase`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                email: email!,
            },
        });
        const data = await res.json();
        setImages(data.generatedImages || []);
        setLoadingImages(false);
    };

    useEffect(() => {
        getUserData();
        fetchUserImages();
    }, []);

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleUpdateUserInfo = () => {
        // Logic to update user info
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-gradient-to-b from-black to-purple-900 text-white p-3 md:p-5">
            {/* Left Side: User Profile Info */}
            <div className="w-full md:w-1/4 lg:w-1/6 mb-3 md:mr-5 h-fit p-5 rounded-lg border-2 border-gray-800 bg-gradient-to-b from-purple-950 to-black shadow-lg">
                <div className="flex md:flex-col items-center">
                    {/* Profile Picture */}
                    {loadingUser ? (
                        <div className='flex items-center justify-center w-full flex-col'>
                            <div className="w-20 h-20 bg-gray-700 animate-pulse rounded-full mb-4" />
                            <div className="h-6 bg-gray-700 animate-pulse rounded w-3/4 mb-2" />
                            <div className="h-6 bg-gray-700 animate-pulse rounded w-2/3 mb-4" />
                            <div className="h-6 bg-gray-700 animate-pulse rounded w-1/2 mb-4" />
                            <div className="h-6 bg-gray-700 animate-pulse rounded w-1/2 mb-4" />
                        </div>
                    ) : (
                        <div className='md:flex-col w-full'>
                            {/* image user data */}
                            <div className="w-full md:flex-col flex items-start justify-start mb-4">
                                <div className="relative flex items-start justify-start w-20 h-20">
                                    {profilePic ? (
                                        <>
                                            <img
                                                src={profilePic || 'https://via.placeholder.com/150'}
                                                alt="Profile"
                                                className="w-full h-full object-cover rounded-full shadow-lg transform transition-transform hover:scale-110" />
                                            <label
                                                htmlFor="profilePicUpload"
                                                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                                            >
                                                <FaPencil className="text-white" size={8} />
                                            </label>
                                            <input
                                                id="profilePicUpload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleProfilePicChange} />
                                        </>
                                    ) : (
                                        <div className="relative flex items-start justify-start w-20 h-20">
                                            <p className="text-4xl border-2 border-gray-900 text-gray-400 size-full bg-purple-950 flex items-center justify-center rounded-full">
                                                {userData?.name[0]}
                                            </p>
                                            <label
                                                htmlFor="profilePicUpload"
                                                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                                            >
                                                <FaPencil className="text-white" size={10} />
                                            </label>
                                            <input
                                                id="profilePicUpload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleProfilePicChange} />
                                        </div>
                                    )}

                                </div>

                                <div className='text-xs space-y-1 mb-2 md:mb-0 md:w-full w-[60%] ml-4 md:ml-0'>
                                    <h2 className="text-lg md:text-xl font-bold mb-2">{userData?.name}</h2>
                                    <p>{userData?.email}</p>
                                    <p>{userData?.phoneNo || 'Phone number not provided'}</p>
                                    <p><span>Credits - </span>{userData?.credits || 0}</p>
                                    <p><span>Plan - </span>{userData?.plan || 'Free'}</p>
                                </div>
                            </div>
                            {/* Card data */}
                            <div className="p-2 w-full text-xs space-y-1 bg-gray-800 rounded shadow-inner mb-4">
                                <p><span>Name - </span>{userData?.cardDetails.cardHolderName || 'N/A'}</p>
                                <p><span>Card No - </span>{userData?.cardDetails.cardNumber || 'N/A'}</p>
                                <p><span>CVV - </span>{userData?.cardDetails.cvv || 'N/A'}</p>
                                <p><span>Expiry Date - </span>{userData?.cardDetails.expiryDate || 'N/A'}</p>
                            </div>
                            <div className="w-full">
                                {!editing && !loadingUser ? (
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="bg-purple-600 text-white py-1 px-2 text-sm rounded shadow-lg hover:bg-purple-700 transition"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    editing && (
                                        <div>
                                            <form className="space-y-4">
                                                <input
                                                    type="text"
                                                    value={userData?.name || ''}
                                                    className="bg-gray-700 text-white p-2 w-full rounded-lg"
                                                    placeholder="Name"
                                                />
                                                <input
                                                    type="email"
                                                    value={userData?.email || ''}
                                                    className="bg-gray-700 text-white p-2 w-full rounded-lg"
                                                    placeholder="Email"
                                                />
                                                <input
                                                    type="text"
                                                    value={userData?.phoneNo || ''}
                                                    className="bg-gray-700 text-white p-2 w-full rounded-lg"
                                                    placeholder="Phone No"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleUpdateUserInfo}
                                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition"
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditing(false)}
                                                    className="text-gray-500 ml-2 hover:underline"
                                                >
                                                    Cancel
                                                </button>
                                            </form>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: User's Generated Images */}
            <div className="w-full p-5 overflow-auto shadow-2xl border-2 border-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold mb-5">Your Generated Images</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loadingImages ? (
                        Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="w-full h-60 bg-gray-700 animate-pulse rounded"></div>
                        ))
                    ) : (
                        images.map((image, idx) => (
                            <div
                                key={image._id}
                                className="relative group cursor-pointer transition-transform transform hover:scale-105"
                                onClick={() => setSelectedImage(image)}
                            >
                                <div className="absolute inset-0 bg-black rounded ml-1 mt-1 text-xs font-bold w-fit h-fit px-2 py-1">{idx + 1}</div>
                                <img
                                    src={image.imageData}
                                    alt={`Generated ${idx + 1}`}
                                    className="object-cover rounded-lg w-full h-full shadow-lg"
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal for Image Details */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex flex-col md:flex-row items-center justify-center py-8 px-5 md:py-16 md:px-[10vw]"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* close button */}
                    <button
                        className="absolute top-4 right-4 bg-gray-900 text-white p-1 mt-2 md:mr-20 md:mt-10 rounded-full"
                        onClick={() => setSelectedImage(null)}
                    >
                        <FaTimes size={12} />
                    </button>
                    {/* image */}
                    <img
                        src={selectedImage.imageData}
                        alt="Full Size"
                        className="size-full rounded-lg"
                    />
                    {/* details of image and share buttons */}
                    <div className="relative py-4 px-3 bg-gray-800 rounded-lg h-full mt-2 md:mt-0 md:ml-2 w-full md:w-[30vw]">
                        {/* date and prompts */}
                        <div className="text-sm text-gray-400 mb-2">
                            <p className='bg-black w-full mb-2 p-2 rounded'><strong>Date:</strong> {formatDateTime(selectedImage.generatedAt)}</p>
                            <p className='bg-black w-full my-2 p-2 rounded'><strong>Prompts:</strong> {selectedImage.prompts ? selectedImage.prompts : 'N/A'}</p>
                        </div>
                        {/* share buttons */}
                        <div className="flex items-center justify-between bg-black w-full my-2 p-2 rounded">
                            <button
                                className="bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={() => {
                                    const shareData = {
                                        title: `Generated Image`,
                                        text: 'Check out this image I generated!',
                                        url: selectedImage.imageData,
                                    };
                                    navigator.share(shareData).catch(console.error);
                                }}
                            >
                                <FaShare size={15} />
                            </button>
                            <a
                                href={selectedImage.imageData}
                                download={`Generated_Image.jpeg`}
                                className="bg-green-600 text-white py-1 px-2 rounded-lg hover:bg-green-700 transition"
                            >
                                <FaDownload size={15} />
                            </a>
                            {/* Edit button */}
                            <button
                                className="bg-yellow-600 text-white py-1 px-2 rounded-lg hover:bg-yellow-700 transition"
                            >
                                <FaEdit size={15} />
                            </button>
                            {/* delete button */}
                            <button
                                className="bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-700 transition"
                            >
                                <FaTimes size={15} />
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
