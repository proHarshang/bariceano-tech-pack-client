import { useState } from 'react';
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const Layout1 = ({ page }) => {
    const [openPopupId, setOpenPopupId] = useState(null);

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
                                    onClick={() => setOpenPopupId(`fabricColorImages-0`)}
                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.fabricColorImages.find((item) => item.position === 0).src}`}
                                    alt={slide.data?.fabricColorImages.find((item) => item.position === 0).src}
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-sm text-center items-center justify-center w-full h-full cursor-pointer'>
                                    <button type='button' onClick={() => setOpenPopupId(`fabricColorImages-0`)}>Add</button>
                                </label>
                            )}
                        </div>
                    </div>
                    <div className='w-full h-[140px]'>
                        <h1 className='mb-2'>Thread Colour</h1>
                        <div className='rounded-2xl border-2 border-dashed bg-[#F3F3F3] h-full w-full flex items-center justify-center'>
                            {slide.data?.threadColorImages.find((item) => item.position === 0) ? (
                                <img
                                    onClick={() => setOpenPopupId(`threadColorImages-0`)}
                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.threadColorImages.find((item) => item.position === 0).src}`}
                                    alt={slide.data?.threadColorImages.find((item) => item.position === 0).src}
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-center items-center justify-center w-full h-full cursor-pointer'>
                                    <button type='button' onClick={() => setOpenPopupId(`threadColorImages-0`)}>Add</button>
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-[30%] border-2 border-dashed bg-[#F3F3F3] h-[330px] mt-5 flex items-center justify-center rounded-2xl'>
                    {slide.data?.images[0] ? (
                        <img
                            onClick={() => setOpenPopupId(`images-0`)}
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.images[0].src}`}
                            alt={slide.data?.images[0].src}
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <button type='button' onClick={() => setOpenPopupId(`images-0`)}>Add</button>
                        </label>
                    )}
                </div>
                <div className='w-[30%] border-2 border-dashed bg-[#F3F3F3] h-[330px] mt-5 flex items-center justify-center rounded-2xl'>
                    {slide.data?.images[1] ? (
                        <img
                            onClick={() => setOpenPopupId(`images-0`)}
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.images[1].src}`}
                            alt={slide.data?.images[1].src}
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <button type='button' onClick={() => setOpenPopupId(`images-1`)}>Add</button>
                        </label>
                    )}
                </div>
            </div>
            {/* Image Selector Popup */}
            {["fabricColorImages-0", "threadColorImages-0", "images-0"].map((elem) => {
                return <ImageSelectorPopup
                    key={elem}
                    isOpen={openPopupId === elem}
                    closeModal={() => setOpenPopupId(null)}
                    onImageSelect={(imgName) => {
                        updateSlideByPage(page, `data.${elem.split("-")[0]}`, { "position": parseInt(elem.split("-")[1]), "src": imgName })
                    }}
                />
            })}
        </article>
    )
}

export default Layout1