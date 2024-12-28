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
    return (
        <article>
            <div className='flex justify-between w-full gap-10'>
                <div className='w-[25%] flex flex-col justify-between gap-5 h-full'>
                    <div className='w-full h-full'>
                        <h1>Fabric colour</h1>
                        <div className='rounded-lg border-2 border-dashed bg-[#F3F3F3] h-[120px] w-[100px] flex items-center justify-center'>
                            {fabricImage ? (
                                <img src={fabricImage} alt='Fabric' className='object-contain h-full rounded-lg' />
                            ) : (
                                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                                    <span className="text-xs">Drop an Image here</span>
                                    <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, setFabricImage)} className='hidden' />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className='w-full h-full'>
                        <h1>Thread colour</h1>
                        <div className='rounded-lg border-2 border-dashed bg-[#F3F3F3] h-[120px] w-[100px] flex items-center justify-center'>
                            {threadImage ? (
                                <img src={threadImage} alt='Thread' className='object-contain h-full w-full rounded-lg' />
                            ) : (
                                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                                    <span className="text-xs">Drop an Image here</span>
                                    <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, setThreadImage)} className='hidden' />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-[37%] border-2 border-dashed bg-[#F3F3F3] h-[310px]'>
                    {mainImage1 ? (
                        <img src={mainImage1} alt='Main 1' className='object-fill' />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <span>Drop an Image here</span>
                            <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, setMainImage1)} className='hidden' />
                        </label>
                    )}
                </div>
                <div className='w-[37%] border-2 border-dashed bg-[#F3F3F3] h-[310px]'>
                    {mainImage2 ? (
                        <img src={mainImage2} alt='Main 2' className='object-fill' />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <span>Drop an Image here</span>
                            <input type='file' accept='image/*' onChange={(e) => handleImageChange(e, setMainImage2)} className='hidden' />
                        </label>
                    )}
                </div>
            </div>
        </article>
    )
}

export default Layout1