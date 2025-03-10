import React, { useState, useEffect } from 'react';
import { getUploadedImage, useUploadImage } from "../API/TechPacks";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const UploadImage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllImage = async () => {
        try {
            const data = await getUploadedImage(); // Use your API call here
            if (data.status) {
                setImages(data.data); // Set the fetched images
            } else {
                console.error('Failed to fetch images');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchAllImage();
    }, []);

    const filteredImages = images.filter(image =>
        image.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const [activePopup, setActivePopup] = useState(null);

    const handleOpen = (image) => {
        const link = document.createElement("a");
        link.href = `${process.env.REACT_APP_API_URL}/uploads/techpack/${image}`;
        link.target = "_blank"; // Opens the link in a new tab
        link.download = image;
        link.click();
    };
    const handleDownload = async (image) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/uploads/techpack/${image}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", image); // Force download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the image:", error);
        }
    };

    const handleDelete = async (image) => {
        try {
            const response = await fetch(`${apiURL}/design/techpacks/images/delete`, {
                method: 'DELETE', // Use DELETE method
                headers: {
                    'Content-Type': 'application/json', // Send JSON data
                    'api-Key': apiKey,
                },
                body: JSON.stringify({
                    filename: image, // Send the image filename to be deleted
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                alert(data.message); // Show success message
                // Optionally, remove the image from the UI if deletion is successful
                // For example, update the image list in the state if needed
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('An error occurred while deleting the image.');
        }
    };

    const selectimage = (image) => {
        setIsModalOpen(false);
    }
    const { uploadImage, loading, error } = useUploadImage();

    // Handle file selection and trigger upload immediately
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]; // Get the selected file
            console.log(file.name);  // Log the image name
            uploadImage(file); // Trigger the upload automatically
        }
    };


    return (
        <div className="relative">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 text-white p-3 rounded-lg"
            >
                Upload Files
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black z-50 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] h-[80%]">
                        <div className='flex justify-between pb-5'>
                            <div className="w-1/2 border bg-white border-black px-1 md:px-[7px] h-8 md:h-8 flex justify-start">
                                <input
                                    type="text"
                                    placeholder="Search images by keyword..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className='flex'>
                                <button onClick={fetchAllImage} className='uppercase text-sm border border-black px-3'>
                                    refresh
                                </button>
                                <h1>{error}</h1>
                            </div>
                            <button onClick={() => setIsModalOpen(false)}>
                                <IoClose className="size-6" />
                            </button>

                        </div>

                        <div className="grid grid-cols-6 gap-x-7 overflow-y-auto h-[85%]">
                            {/* Upload Image Button */}
                            <div className="relative">
                                <div className="custom-file-label h-28 block border border-gray-300 rounded text-center cursor-pointer transition">
                                    <label htmlFor="file-upload" className='text-nowrap flex flex-col items-center gap-3'>
                                        {loading ? 'Uploading...' : 'Upload Image'}
                                        <IoCloudUploadOutline className='size-10' />
                                    </label>
                                </div>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}  // Automatically triggers upload
                                />
                            </div>

                            {/* Render Images */}
                            {filteredImages.map((image, index) => (
                                <div
                                    className="mb-6 group relative"
                                    key={index}
                                    onMouseLeave={() => setActivePopup(null)}
                                >
                                    {/* Image Container */}
                                    <div className="relative flex justify-center border border-gray-300 rounded overflow-hidden transition-transform duration-300 hover:scale-95">
                                        <button onClick={() => selectimage(image)}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image}`}
                                                alt={`Uploaded ${index}`}
                                                className="w-full h-28 object-contain transition-transform duration-300 group-hover:scale-90"
                                            />
                                        </button>
                                        {/* Three-dot Button */}
                                        <button
                                            className="absolute top-2 right-2 bg-black p-1 shadow-lg hover:bg-[#612dae] group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                                            onClick={() =>
                                                setActivePopup((prev) => (prev === index ? null : index))
                                            }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="white" fill="white" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    fillRule="evenodd"
                                                    d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Popup */}
                                    {activePopup === index && (
                                        <div className="absolute top-10 left-20 w-52 bg-black text-white border border-gray-300 shadow-md rounded-lg z-10">
                                            <h1 className="font-bold text-base px-4 py-2 break-words border-b">{image}</h1>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm"
                                                onClick={() => handleOpen(image)}
                                            >
                                                Open
                                            </button>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm"
                                                onClick={() => handleDownload(image)}
                                            >
                                                Download
                                            </button>
                                            <button type='button'
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500"
                                                onClick={() => handleDelete(image)}
                                            >
                                                Move to Trash
                                            </button>
                                        </div>
                                    )}

                                    {/* Image Name */}
                                    <h1 className="text-xs text-wrap mt-1 break-words">{image}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
