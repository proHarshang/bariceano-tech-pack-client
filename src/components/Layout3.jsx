import { useState } from 'react';
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const Layout3 = ({ page }) => {
    const [openPopupId, setOpenPopupId] = useState(null);

    const { getSlideByPage, updateSlideByPage } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <div className='flex flex-col gap-10'>
            <div className='w-full flex justify-center gap-10'>
                {[0, 1].map((key, index) => (
                    <div
                        key={key}
                        className='w-[230px] h-[300px] rounded-2xl flex items-center justify-center'
                    >
                        {slide.data?.images.find((item) => item.position === key).src ? (
                            <img
                                onClick={() => setOpenPopupId(`images-${key}`)}
                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.images.find((item) => item.position === key).src}`}
                                alt={slide.data?.images.find((item) => item.position === key).src}
                                className='object-cover h-full w-full rounded-2xl cursor-pointer'
                            />
                        ) : (
                            <div className='bg-[#FCFCFC] rounded-2xl text-[#DFDFDF] border-2 border-dashed text-center flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                            <button type='button' onClick={() => setOpenPopupId(`images-${key}`)}>Upload an image</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='flex gap-14'>
                <div className='w-[50%] h-[140px]'>
                    <h1>Thread colour</h1>
                    <div className='w-full h-full flex justify-between gap-5'>
                        {[0, 1, 2].map((key, index) => (
                            <div key={key} className='w-full h-full rounded-2xl flex items-center justify-center'>
                                {slide.data?.threadColorImages?.find((item) => item.position === key).src ? (
                                    <img
                                        onClick={() => setOpenPopupId(`threadColorImages-${key}`)}
                                        src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.threadColorImages?.find((item) => item.position === key).src}`}
                                        alt={slide.data?.threadColorImages?.find((item) => item.position === key).src}
                                        className='object-cover h-full w-full rounded-2xl cursor-pointer' />
                                ) : (
                                    <div className='bg-[#FCFCFC] rounded-2xl text-wrap px-3 text-[#DFDFDF] border-2 border-dashed text-center flex text-sm flex-col items-center justify-center w-full h-full cursor-pointer'>
                                        <button type='button' onClick={() => setOpenPopupId(`threadColorImages-${key}`)}>Upload an image</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-[50%] h-[140px]'>
                    <h1>Fabric colour</h1>
                    <div className='w-full h-full flex justify-between gap-5'>
                        {[0, 1, 2].map((key, index) => (
                            <div key={index} className='w-full h-full rounded-2xl flex items-center justify-center'>
                                {slide.data?.fabricColorImages?.find((item) => item.position === key).src ? (
                                    <img
                                        onClick={() => setOpenPopupId(`fabricColorImages-${key}`)}
                                        src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.fabricColorImages?.find((item) => item.position === key).src}`}
                                        alt={slide.data?.fabricColorImages?.find((item) => item.position === key).src}
                                        className='object-cover h-full w-full rounded-2xl cursor-pointer' />
                                ) : (
                                    <div className='bg-[#FCFCFC] rounded-2xl text-wrap px-3 text-[#DFDFDF] border-2 border-dashed text-center flex text-sm flex-col items-center justify-center w-full h-full cursor-pointer'>
                                        <button type='button' onClick={() => setOpenPopupId(`fabricColorImages-${key}`)}>upload an image</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Image Selector Popup */}
            {["fabricColorImages-0", "fabricColorImages-1", "fabricColorImages-2", "threadColorImages-0", "threadColorImages-1", "threadColorImages-2", "images-0", "images-1"].map((elem) => {
                return <ImageSelectorPopup
                    key={elem}
                    isOpen={openPopupId === elem}
                    closeModal={() => setOpenPopupId(null)}
                    onImageSelect={(imgName) => {
                        updateSlideByPage(page, `data.${elem.split("-")[0]}`, { "position": parseInt(elem.split("-")[1]), "src": imgName })
                    }}
                />
            })}
        </div>
    )
}

export default Layout3