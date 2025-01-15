import { useTechPack } from '../context/TechPackContext';

const Layout1 = () => {
    const { formData, handleImageUpload } = useTechPack();
    const { specSheet } = formData;

    const handleAddImage = (field, position, files) => {
        handleImageUpload("specSheet", field, position, files);
    };

    return (
        <article>
            <div className='flex justify-evenly w-full gap-10'>
                <div className='flex flex-col justify-evenly gap-5 h-full'>
                    <div className='w-full'>
                        <h1 className='mb-2'>Fabric Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-[120px] w-full flex items-center justify-center'>
                            {specSheet?.fabricColorImages.find((item) => item.position === 0) ? (
                                <img
                                    src={specSheet?.fabricColorImages.find((item) => item.position === 0).src}
                                    alt='Fabric'
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                                    <span className="text-xs">Drop an Image here</span>
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
                    <div className='w-full'>
                        <h1 className='mb-2'>Thread Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-[120px] w-full flex items-center justify-center'>
                            {specSheet?.threadColorImages.find((item) => item.position === 0) ? (
                                <img
                                    src={specSheet?.threadColorImages.find((item) => item.position === 0).src}
                                    alt='Thread'
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                                    <span className="text-xs">Drop an Image here</span>
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
                <div className='w-[37%] border-2 border-dashed bg-[#F3F3F3] h-[310px] flex items-center justify-center rounded-2xl'>
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
                <div className='w-[37%] border-2 border-dashed bg-[#F3F3F3] h-[310px] flex items-center justify-center rounded-2xl'>
                    {specSheet?.images.find((item) => item.position === 1) ? (
                        <img
                            src={specSheet?.images.find((item) => item.position === 1).src}
                            alt='Main 2'
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <span>Drop an Image here</span>
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleAddImage("images", 1, e.target.files)}
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