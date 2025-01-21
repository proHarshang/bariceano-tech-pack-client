import { useTechPack } from '../context/TechPackContext';

const Layout1 = ({ page }) => {
    const { getSlideByPage, updateSlideByPage } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <article>
            <div className='flex justify-evenly w-full gap-10'>
                <div className='flex flex-col h-full'>
                    <div className='w-full h-[140px] mb-12'>
                        <h1 className='mb-2'>Fabric Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-full w-full flex items-center justify-center'>
                            {slide.data?.fabricColorImages.find((item) => item.position === 0) ? (
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.fabricColorImages.find((item) => item.position === 0).src}`}
                                    alt={slide.data?.fabricColorImages.find((item) => item.position === 0).src}
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-sm text-center items-center justify-center w-full h-full cursor-pointer'>
                                    <span>Drop an Image here</span>
                                    <input
                                        type='text'
                                        value={slide.data?.fabricColorImages.find((item) => item.position === 0).src}
                                        onChange={(e) => updateSlideByPage(page, "data.fabricColorImages", { position: 0, src: e.target.value })}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                    <div className='w-full h-[140px]'>
                        <h1 className='mb-2'>Thread Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-full w-full flex items-center justify-center'>
                            {slide.data?.threadColorImages.find((item) => item.position === 0) ? (
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.threadColorImages.find((item) => item.position === 0).src}`}
                                    alt={slide.data?.fabricColorImages.find((item) => item.position === 0).src}
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-center items-center justify-center w-full h-full cursor-pointer'>
                                    <span>Drop an Image here</span>
                                    <input
                                        type='text'
                                        value={slide.data?.threadColorImages.find((item) => item.position === 0).src}
                                        onChange={(e) => updateSlideByPage(page, "data.threadColorImages", { position: 0, src: e.target.value })}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-[30%] border-2 border-dashed bg-[#F3F3F3] h-[330px] mt-5 flex items-center justify-center rounded-2xl'>
                    {slide.data?.images[0] ? (
                        <img
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.images[0].src}`}
                            alt={slide.data?.images[0].src}
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <span>Drop an Image here</span>
                            <input
                                type='text'
                                value={slide.data.images[0].src}
                                onChange={(e) => updateSlideByPage(page, "data.images", { position: 0, src: e.target.value })}
                            />
                        </label>
                    )}
                </div>
            </div>

        </article>
    )
}

export default Layout1