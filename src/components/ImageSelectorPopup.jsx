import { useState, useEffect, useCallback } from 'react';
import { getUploadedImage, useUploadImage } from '../API/TechPacks';
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Cropper from "react-easy-crop";
import { LazyLoadImage } from 'react-lazy-load-image-component'; // Import LazyLoadImage
import imageCompression from 'browser-image-compression';

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous"; // To prevent CORS issues
        image.src = url;
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
    });

const getCroppedImg = async (selectedFile, imageSrc, crop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Could not get canvas context");
    }

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error("Canvas is empty");
                return;
            }
            // Extract the original file name
            const originalFileName = selectedFile?.name || "image.png";
            const fileExtension = originalFileName.split(".").pop();
            const newFileName = `${originalFileName}`;

            // Create a new File with the original name and correct extension
            const file = new File([blob], newFileName, { type: `image/${fileExtension}` });

            resolve(file); // Returns cropped image as a File
        }, selectedFile?.type || "image/png");
    });
};

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const ImageSelectorPopup = ({ isOpen, closeModal, onImageSelect }) => {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const [OGSingleImg, setOGSingleImg] = useState(null);

    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(1);

    const { uploadImage, loading, error } = useUploadImage();

    const uploadCompressedImage = async (files) => {
        try {
            setIsUploading(true)
            // Compress the image
            const options = {
                maxSizeMB: 3,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };

            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    const compressedBlob = await imageCompression(file, options);
                    return new File([compressedBlob], file.name, { type: file.type });
                })
            );

            await uploadImage(compressedFiles);
            await fetchAllImage();

        } catch (error) {
            alert("Something Went Wrong! Ask Harshang")
            console.error('Error uploading image:', error);
            throw error;
        } finally {
            setIsUploading(false)
        }
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const fetchAllImage = async () => {
        try {
            setIsLoading(true)
            const data = await getUploadedImage(); // Use your API call here
            if (data.status) {
                setImages(data.data); // Set the fetched images
                console.log("🖼 Images fetched")
            } else {
                console.error('Failed to fetch images');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchAllImage();
        }
    }, [isOpen]);

    const filteredImages = images.filter(image =>
        image.toLowerCase().includes(searchTerm.toLowerCase()) &&
        image.toLowerCase() !== 'placeholder.png' &&
        image.toLowerCase() !== 'default.png'
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
                method: 'POST', // Use DELETE method
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
                await fetchAllImage();
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

    // Handle file selection and trigger upload immediately
    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 1) {
            await uploadCompressedImage([...e.target.files]);
        } else if (e.target.files[0] && e.target.files.length === 1) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setOGSingleImg(e.target.files[0]);
            setSelectedFile(e.target.files[0]);
            setImage(imageUrl);
        } else {
            setSelectedFile(null);
            setImage(null);
        }
    }


    const handleCrop = async () => {
        console.log("croppedAreaPixels :", croppedAreaPixels)
        if (!image || !croppedAreaPixels) return;
        const croppedImgFile = await getCroppedImg(selectedFile, image, croppedAreaPixels);

        // Upload the cropped image to the backend
        await uploadCompressedImage([croppedImgFile]);
        setImage(null);
    };

    const handleUploadOrigional = async () => {
        await uploadCompressedImage([OGSingleImg]);
        setImage(null);
    }

    const handleCancelCrop = async () => {
        setImage(null);
        setSelectedFile(null);
    };

    const handleImageSelect = (image) => {
        onImageSelect(image);
        closeModal();
    };

    // if (isLoading) return <div className='fixed top-0 left-0 bg-white z-50 h-screen w-screen flex items-center justify-center'>Loading...</div>

    return (
        <div className="relative">
            {(
                <div className={`fixed inset-0 bg-black z-[100] bg-opacity-50 ${isOpen ? 'flex justify-center items-center' : 'hidden'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[90%]">
                        <div className='flex justify-between pb-5'>
                            <div className="w-1/2 border bg-white border-black px-1 md:px-[7px] h-8 md:h-8 flex justify-start">
                                <input
                                    className='w-full'
                                    type="text"
                                    placeholder="Search images by keyword..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className='flex'>
                                <button type='button' onClick={fetchAllImage} className='uppercase text-sm border border-black px-3'>
                                    refresh
                                </button>
                                <h1>{error}</h1>
                            </div>
                            <button type='button' onClick={() => closeModal(false)}>
                                <IoClose className="size-6" />
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-x-7 gap-y-5 overflow-y-auto h-[85%] scroller">

                            {!isLoading ? (<>
                                {/* Upload Image Button */}
                                <div className="relative">
                                    <div className="custom-file-label h-28 block border border-gray-500 rounded text-center cursor-pointer transition">
                                        <label htmlFor="file-upload" className='text-nowrap text-sm flex flex-col items-center gap-3'>
                                            {loading ? 'Uploading...' : 'Upload'}
                                            <IoCloudUploadOutline className='size-10' />
                                        </label>
                                    </div>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleFileChange}  // Automatically triggers upload
                                    />
                                </div>

                                {image && (
                                    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 h-[90vh] w-[90vw] flex items-center justify-center ${isUploading ? 'pointer-events-none contrast-50 cursor-progress' : 'pointer-events-auto'}`}>
                                        <div className='flex flex-col justify-center items-center gap-y-5'>
                                            {/* Aspect Ratio Selection */}
                                            <div className="flex gap-2">
                                                <label>Aspect Ratio:</label>
                                                <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="border px-2 py-1 rounded">
                                                    <option value={1}>1:1</option>
                                                    <option value={4 / 3}>4:3</option>
                                                </select>
                                            </div>
                                            {croppedAreaPixels && <span className='text-sm opacity-60'>{croppedAreaPixels.width} X {croppedAreaPixels.height}</span>}
                                            <div className="relative w-80 h-80 bg-gray-200 border border-black">
                                                <Cropper
                                                    image={image}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    aspect={aspectRatio === "free" ? undefined : parseFloat(aspectRatio)}
                                                    onCropChange={setCrop}
                                                    onZoomChange={setZoom}
                                                    onCropComplete={onCropComplete}
                                                />
                                            </div>
                                            {/* Zoom Control */}
                                            <div className="flex gap-2 items-center">
                                                <label>{zoom ? `${zoom}x` : "Zoom :"}</label>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="3"
                                                    step="0.1"
                                                    value={zoom}
                                                    onChange={(e) => setZoom(e.target.value)}
                                                    className="w-32"
                                                />
                                            </div>
                                            <div className="flex gap-x-4 justify-around">
                                                <button type='button' onClick={handleCrop} className="mt-4 py-3 px-6 bg-black text-white rounded-md w-fit active:scale-95 hover:scale-105 transition-all">
                                                    Crop & Upload
                                                </button>
                                                <button type='button' onClick={handleUploadOrigional} className="mt-4 py-3 px-6 bg-black text-white rounded-md w-fit active:scale-95 hover:scale-105 transition-all">
                                                    Upload Original
                                                </button>
                                                <button type='button' onClick={handleCancelCrop} className="mt-4 py-3 px-6 bg-white text-black outline-1 [outline-style:solid] outline-black rounded-md w-fit active:scale-95 hover:scale-105 transition-all">
                                                    Cancle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Render Images */}
                                {filteredImages.map((image, index) => (
                                    <div
                                        className="mb-6 group relative w-fit"
                                        key={index}
                                        onMouseLeave={() => setActivePopup(null)}
                                    >
                                        {/* Image Container */}
                                        <div className="relative flex justify-center border border-gray-300 rounded overflow-hidden transition-transform duration-300">
                                            <button type='button' onClick={() => handleImageSelect(image)}>
                                                <LazyLoadImage
                                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image}`}
                                                    alt={`Uploaded ${index}`}
                                                    className="w-full h-28 object-contain transition-transform duration-300 group-hover:scale-90"
                                                />
                                            </button>
                                            {/* Three-dot Button */}
                                            <button type='button'
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
                                                <button type='button'
                                                    className="block w-full text-left px-4 py-2 text-sm"
                                                    onClick={() => handleOpen(image)}
                                                >
                                                    Open
                                                </button>
                                                <button type='button'
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
                            </>) :
                                <div className='flex items-center w-full h-full justify-center'>Loading</div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageSelectorPopup;
