import { useTechPack } from '../context/TechPackContext';
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';

const Layout1 = () => {
    const { formData } = useTechPack();
    const { specSheet } = formData;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAddImage = (field, position, files) => {
        handleImageUpload("specSheet", field, position, files);
    };

    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };


    const cropImage = async () => {
        const cropped = await getCroppedImg(image, croppedAreaPixels);
        setCroppedImage(cropped);
    };

    const getCroppedImg = (imageSrc, crop) => {
        const image = new Image();
        image.src = imageSrc;
        return new Promise((resolve) => {
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

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

                canvas.toBlob((blob) => {
                    resolve(URL.createObjectURL(blob));
                });
            };
        });
    };

    return (
        <article>
            <div className='flex justify-evenly w-full gap-10'>
                <div className='flex flex-col h-full'>
                    <div className='w-full h-[140px] mb-12'>
                        <h1 className='mb-2'>Fabric Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-full w-full flex items-center justify-center'>
                            {specSheet?.fabricColorImages.find((item) => item.position === 0) ? (
                                <img
                                    src={specSheet?.fabricColorImages.find((item) => item.position === 0).src}
                                    alt='Fabric'
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-sm text-center items-center justify-center w-full h-full cursor-pointer'>
                                    <span>Drop an Image here</span>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleAddImage("fabricColorImages", 0, e.target.files)}
                                        className='hidden'
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className='w-full h-[140px]'>
                        <h1 className='mb-2'>Thread Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-full w-full flex items-center justify-center'>
                            {specSheet?.threadColorImages.find((item) => item.position === 0) ? (
                                <img
                                    src={specSheet?.threadColorImages.find((item) => item.position === 0).src}
                                    alt='Thread'
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-center items-center justify-center w-full h-full cursor-pointer'>
                                    <span>Drop an Image here</span>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleAddImage("threadColorImages", 0, e.target.files)}
                                        className='hidden'
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-[30%] border-2 border-dashed bg-[#F3F3F3] h-[330px] mt-5 flex items-center justify-center rounded-2xl'>
                    {specSheet?.images.find((item) => item.position === 0) ? (
                        <img
                            src={specSheet?.images.find((item) => item.position === 0).src}
                            alt='Main 1'
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <span>Drop an Image here</span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleAddImage("images", 0, e.target.files)}
                                className='hidden'
                            />
                        </label>
                    )}
                </div>
                <div className="w-[30%] border-2 border-dashed bg-[#F3F3F3] h-[330px] mt-5 flex items-center justify-center rounded-2xl">
                    {image && !croppedImage ? (
                        <div className="relative w-full h-full">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1} // Aspect ratio for WhatsApp DP-style cropping
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <Slider
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e, zoom) => setZoom(zoom)}
                                />
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={cropImage}
                                >
                                    Crop
                                </button>
                            </div>
                        </div>
                    ) : croppedImage ? (
                        <img
                            src={croppedImage}
                            alt="Cropped"
                            className="object-fill w-full h-full rounded-2xl"
                        />
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <span>Drop an Image here</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            </div>

        </article>
    )
}

export default Layout1