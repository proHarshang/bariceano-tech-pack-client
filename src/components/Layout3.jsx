import { useState } from 'react';
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const Layout3 = ({ page }) => {
    const [openPopupId, setOpenPopupId] = useState(null);

    const { getSlideByPage, updateSlideByPage } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <div>
            <div className='w-full flex justify-center gap-10'>
                {[0, 1].map((key, index) => (
                    <div
                        key={key}
                        className='w-[321px] h-[321px] rounded-2xl flex items-center justify-center'
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
            <div className='flex gap-14 mt-10'>
                <div>
                    <input
                        type='text'
                        placeholder='Thread colour'
                        value={slide.data?.threadColorTitle}
                        onChange={(e) => updateSlideByPage(page, `data.threadColorTitle`, e.target.value)}
                        className='ml-5 font-bold'
                    />
                    <div className='w-full h-full flex'>
                        {[0, 1, 2].map((key, index) => (
                            <div key={key} className='w-[120px] h-[120px] rounded-2xl flex items-center justify-center'>
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
                <div>
                    <input
                        type='text'
                        placeholder='Fabric colour'
                        value={slide.data?.fabricColorTitle}
                        onChange={(e) => updateSlideByPage(page, `data.fabricColorTitle`, e.target.value)}
                        className='ml-5 font-bold'
                    />
                    <div className='w-full h-full flex'>
                        {[0, 1, 2].map((key, index) => (
                            <div key={index} className='w-[120px] h-[120px] rounded-2xl flex items-center'>
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