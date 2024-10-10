import React, { useEffect, useState } from 'react';
import { FaEdit, FaDownload, FaTimes } from 'react-icons/fa';
import { FaClipboard, FaPencil, FaShield } from 'react-icons/fa6';
import '../style/CustomOverFlow.css'
import { toast } from 'react-toastify';
import { formatDate } from '../helper/formatDate';

const backendAPI = import.meta.env.VITE_BackendAPI!;

const ProfilePage = () => {
    interface UserData {
        name: string;
        email: string;
        phoneNo?: string;
        credits?: number;
        plan?: string;
        planExpire?: string;
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
    const [name, setName] = useState(userData?.name ?? '');
    const [email, setEmail] = useState(userData?.email || '');
    const [phone, setPhone] = useState(userData?.phoneNo || '');
    const [showUpgradePlan, setShowUpgradePlan] = useState(true);
    const [showPayment, setShowPayment] = useState(false);
    const [activeTab, setActiveTab] = useState('monthly');

    const storedEmail = localStorage.getItem('user');

    // ! Fetch User Data
    const getUserData = async () => {
        const res = await fetch(`${backendAPI}/api/v1/getOrUpdateUserData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                email: storedEmail!,
            },
        });
        const data = await res.json();
        setUserData(data.userData);
        setLoadingUser(false);
    };

    // ! Fetch User Images
    const fetchUserImages = async () => {
        const res = await fetch(`${backendAPI}/api/v1/ImageStoreDatabase`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                email: storedEmail!,
            },
        });
        const data = await res.json();
        setImages(data.generatedImages || []);
        setLoadingImages(false);
    };

    // ! Get profile picture of the user
    const getProfilePic = async () => {
        const res = await fetch(`${backendAPI}/api/v1/getProfilePic`, {
            method: 'GET',
            headers: {
                email: storedEmail!,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if (data.pic) {
            setProfilePic(data.pic);
        }
    }

    useEffect(() => {
        getUserData();
        fetchUserImages();
        getProfilePic();
    }, [storedEmail]);

    // ! Profile Picture Upload
    const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
        }
        const toBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        };

        if (!e.target.files) return;
        const base64Image = await toBase64(e.target.files[0]);

        // 3. **Create the payload with the base64 image**
        const profilePicData = { profilePic: base64Image };
        console.log('Profile Pic Data:', profilePicData);

        // * api for updating profile pic
        fetch(`${backendAPI}/api/v1/uploadProfilePicRoutes`, {
            method: 'PUT',
            headers: {
                email: storedEmail!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profilePicData: profilePicData.profilePic,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Profile picture updated successfully.') {
                    toast.success('Profile picture uploaded successfully.');
                    getProfilePic();
                } else {
                    toast.error('Failed to upload profile picture.');
                }
            })
            .catch((error) => {
                console.error('Error uploading profile picture:', error);
                toast.error('Failed to upload profile picture.');
            });
    };

    // ! Update User Info
    const handleUpdateUserInfo = async () => {
        const updatedUserData = {
            name,
            email,
            phone,

        };

        try {
            await fetch(`${backendAPI}/api/v1/getOrUpdateUserData`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    email: storedEmail!,
                },
                body: JSON.stringify({ email, updatedUserData }),
            });
            toast.success('User data updated successfully.');
            setEditing(false);
            await fetchUserImages();
        } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Failed to update user data.');
        };
    }

    // ! Format Date and Time
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    // ! Copy Image URL to Clipboard
    const copyToClipboard = (base64: string) => {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);

        navigator.clipboard.writeText(url).then(() => {
            alert('Image URL copied to clipboard!');
        });
    };

    // ! Delete Generated Image 
    const handleDeleteImage = async () => {
        if (!selectedImage) return;
        const res = await fetch(`${backendAPI}/api/v1/ImageStoreDatabase`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: storedEmail, imageId: selectedImage._id }),
        });
        const data = await res.json();
        if (data.message === 'Image deleted successfully.') {
            toast.success('Image deleted successfully.');
            setImages(images.filter((image) => image._id !== selectedImage._id));
            setSelectedImage(null);
            fetchUserImages();
        } else {
            toast.error('Failed to delete image.');
        }
    }

    // ! Edit User Data from click
    const handleEditUserData = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Edit User Data clicked");
        setShowUpgradePlan(false);
        e.preventDefault()
        setEditing(true);
        setName(userData?.name ?? '');
        setEmail(userData?.email || '');
        setPhone(userData?.phoneNo || '');

    }

    // ! Upgrade Plan
    const handleUpgradePlan = () => {
        setShowPayment((prev) => !prev);
    }

    // ! Open Payment Modal
    const openPayment = (plan: string) => {
        if (plan === 'monthly') {
            window.open('https://buy.stripe.com/test_fZeeW5f2ge6E5EsdQR', '_blank');
        } else {
            window.open('https://buy.stripe.com/test_eVa01bg6k4w44Ao144', '_blank');
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-screen bg-gradient-to-b from-black to-purple-900 text-white p-3 md:p-5">
            {/* Left Side: User Profile Info */}
            <div className="overflow-scroll no-scrollbar w-full md:w-1/4 mb-3 md:mr-5">
                <div className="w-full h-fit p-5 rounded-lg border-2 border-gray-800 bg-gradient-to-b from-purple-950 to-black shadow-lg">
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
                                        <p><span>Expire Date - </span>{userData?.planExpire ? formatDate(userData.planExpire) : ''}</p>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between relative">
                                    {!editing && !loadingUser ? (
                                        <button
                                            onClick={(e) => handleEditUserData(e)}
                                            className="bg-purple-600 text-white py-1 px-2 text-sm rounded shadow-lg hover:bg-purple-700 transition"
                                        >
                                            Edit Profile
                                        </button>
                                    ) : (
                                        // edit form for updating details
                                        editing && (
                                            <div className='w-full'>
                                                <form className="space-y-2">
                                                    <div className="space-y-1">
                                                        <label>Name:</label>
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="w-full p-1 border rounded bg-transparent"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label>Email:</label>
                                                        <input
                                                            type="email"
                                                            value={email ?? ''}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="w-full p-1 border rounded bg-transparent"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label>Phone:</label>
                                                        <input
                                                            type="text"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            className="w-full p-1 border rounded bg-transparent"
                                                        />
                                                    </div>                                                    
                                                </form>
                                                <div className="space-x-2 mt-4 flex w-full">
                                                    <button
                                                        onClick={handleUpdateUserInfo}
                                                        className="bg-green-600 text-white text-sm py-1 px-2 rounded shadow-lg hover:bg-green-700 transition"
                                                    >
                                                        Save Changes
                                                    </button>
                                                    <button
                                                        onClick={() => { setEditing(false); setShowUpgradePlan(true); }}
                                                        className="bg-gray-600 text-white py-1 px-2 rounded shadow-lg hover:bg-gray-700 transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    {/* upgrade plan button */}
                                    {showUpgradePlan &&
                                        <button
                                            className="bg-slate-950 border-2 border-slate-900 flex items-center justify-center text-white py-1 px-2 text-sm rounded shadow-lg transition"
                                            onClick={handleUpgradePlan}
                                        >
                                            Upgrade Plans
                                            <FaShield size={15} className="ml-1 text-yellow-600" />
                                        </button>
                                    }
                                    {showPayment && (
                                        <div className="absolute bg-black text-white p-4 rounded w-full h-fit mt-[28vh]">
                                            {/* Tab Buttons */}
                                            <div className="flex justify-between border-b border-gray-600 pb-2 mb-4 text-sm font-semibold">
                                                <button
                                                    className={`py-2 px-4 rounded ${activeTab === 'monthly' ? 'bg-purple-800' : ''
                                                        }`}
                                                    onClick={() => setActiveTab('monthly')}
                                                >
                                                    Monthly
                                                </button>
                                                <button
                                                    className={`py-2 px-4 rounded ${activeTab === 'yearly' ? 'bg-purple-800' : ''
                                                        }`}
                                                    onClick={() => setActiveTab('yearly')}
                                                >
                                                    Yearly
                                                </button>
                                            </div>

                                            {/* Plan Details */}
                                            {activeTab === 'monthly' && (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col items-start justify-between w-full">
                                                        <p className='text-purple-400 font-bold'>&#8377; 299.00</p>
                                                        <p className='text-sm font-bold text-gray-500'>499 Image Generations</p>
                                                        <button onClick={() => openPayment('monthly')} className="bg-purple-800 hover:bg-purple-900 text-white py-1 px-3 rounded w-full mt-2">
                                                            Buy
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'yearly' && (
                                                <div className="flex flex-col items-start justify-between">
                                                    <div className='flex '>
                                                        <p className='text-purple-400 font-bold'>&#8377; 3289.00</p>
                                                        <p className='text-[10px] line-through mt-2 ml-2 text-gray-500 font-semibold'>&#8377; 3588.00</p>
                                                        <p className='text-[10px] mt-2 ml-2 text-gray-500 font-semibold'>(1 month free)</p>
                                                    </div>
                                                    <p className='text-sm font-bold text-gray-500'>6000 Image Generations</p>
                                                    <button onClick={() => openPayment('yearly')} className="bg-purple-800 hover:bg-purple-900 text-white py-1 px-3 rounded w-full mt-2">
                                                        Buy
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >

            {/* Right Side: User's Generated Images */}
            <div className="w-full p-5 overflow-auto shadow-2xl border-2 border-gray-800 rounded-lg  no-scrollbar" >
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
            </div >

            {/* Modal for Image Details */}
            {
                selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-75 flex flex-col md:flex-row items-center justify-center py-8 px-5 md:py-16 md:px-[10vw]"
                    // onClick={() => setSelectedImage(null)}
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
                            {/* copy url buttons */}
                            <div className="flex items-center justify-between bg-black w-full my-2 p-2 rounded">
                                <button
                                    className="bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700 transition"
                                    onClick={() => copyToClipboard(selectedImage.imageData)}
                                >
                                    <FaClipboard size={15} />
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
                                    onClick={handleDeleteImage}
                                >
                                    <FaTimes size={15} />
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ProfilePage;
