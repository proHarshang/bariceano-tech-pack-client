import { useState } from "react";
const Layout1 = () => {
    const [fabricImage, setFabricImage] = useState(null);
    const [threadImage, setThreadImage] = useState(null);
    const [mainImage1, setMainImage1] = useState(null);
    const [mainImage2, setMainImage2] = useState(null);

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = (setImage) => {
        setImage(null);
    };

    return (
        <article>
            <div className='flex justify-evenly w-full gap-10'>
                <div className='flex flex-col justify-evenly gap-5 h-full'>
                    <div className='w-full'>
                        <h1 className='mb-2'>Fabric Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-[120px] w-full flex items-center justify-center'>
                            {fabricImage ? (
                                <img
                                    src={fabricImage}
                                    alt='Fabric'
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                    onClick={() => handleImageClick(setFabricImage)}
                                />
                            ) : (
                                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                                    <span className="text-xs">Drop an Image here</span>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleImageChange(e, setFabricImage)}
                                        className='hidden'
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className='w-full'>
                        <h1 className='mb-2'>Thread Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-[120px] w-full flex items-center justify-center'>
                            {threadImage ? (
                                <img
                                    src={threadImage}
                                    alt='Thread'
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                    onClick={() => handleImageClick(setThreadImage)}
                                />
                            ) : (
                                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                                    <span className="text-xs">Drop an Image here</span>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleImageChange(e, setThreadImage)}
                                        className='hidden'
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-[37%] border-2 border-dashed bg-[#F3F3F3] h-[310px] flex items-center justify-center rounded-2xl'>
                    {mainImage1 ? (
                        <img
                            src={mainImage1}
                            alt='Main 1'
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                            onClick={() => handleImageClick(setMainImage1)}
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <span>Drop an Image here</span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleImageChange(e, setMainImage1)}
                                className='hidden'
                            />
                        </label>
                    )}
                </div>
                <div className='w-[37%] border-2 border-dashed bg-[#F3F3F3] h-[310px] flex items-center justify-center rounded-2xl'>
                    {mainImage2 ? (
                        <img
                            src={mainImage2}
                            alt='Main 2'
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                            onClick={() => handleImageClick(setMainImage2)}
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <span>Drop an Image here</span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleImageChange(e, setMainImage2)}
                                className='hidden'
                            />
                        </label>
                    )}
                </div>
            </div>

        </article>
    )
}

export default Layout1