import { useState } from 'react';
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const Layout1 = ({ page }) => {
    const [openPopupId, setOpenPopupId] = useState(null);

    const { getSlideByPage, updateSlideByPage } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <article>
            <div className='flex w-full'>
                <div className='flex flex-col h-full'>
                    <div className='mb-12 flex flex-col items-center'>
                        <div className='rounded-2xl h-[151px] w-[151px] flex items-center justify-center'>
                            {slide.data?.fabricColorImages.find((item) => item.position === 0).src ? (
                                <img
                                    onClick={() => setOpenPopupId(`fabricColorImages-0`)}
                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.fabricColorImages.find((item) => item.position === 0).src}`}
                                    alt={slide.data?.fabricColorImages.find((item) => item.position === 0).src}
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-sm text-center items-center justify-center w-full h-full cursor-pointer bg-[#FCFCFC] rounded-2xl text-[#DFDFDF] text-wrap px-3 border-2 border-dashed'>
                                    <button type='button' onClick={() => setOpenPopupId(`fabricColorImages-0`)}>Upload an image</button>
                                </label>
                            )}
                        </div>
                        <input
                            type='text'
                            placeholder='Fabric colour'
                            value={slide.data?.fabricColorTitle}
                            onChange={(e) => updateSlideByPage(page, `data.fabricColorTitle`, e.target.value)}
                            className='ml-5 font-bold'
                        />
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='rounded-2xl h-[151px] w-[151px] flex items-center justify-center'>
                            {slide.data?.threadColorImages.find((item) => item.position === 0).src ? (
                                <img
                                    onClick={() => setOpenPopupId(`threadColorImages-0`)}
                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.threadColorImages.find((item) => item.position === 0).src}`}
                                    alt={slide.data?.threadColorImages.find((item) => item.position === 0).src}
                                    className='object-contain h-full w-full rounded-2xl cursor-pointer'
                                />
                            ) : (
                                <label className='flex flex-col text-center items-center justify-center w-full h-full cursor-pointer bg-[#FCFCFC] border-2 border-dashed text-[#DFDFDF] rounded-2xl text-wrap px-3'>
                                    <button type='button' onClick={() => setOpenPopupId(`threadColorImages-0`)}>Upload an image</button>
                                </label>
                            )}
                        </div>
                        <input
                            type='text'
                            placeholder='Thread colour'
                            value={slide.data?.threadColorTitle}
                            onChange={(e) => updateSlideByPage(page, `data.threadColorTitle`, e.target.value)}
                            className='ml-5 font-bold'
                        />
                    </div>
                </div>
                <div className='w-[321px] h-[321px] mt-5 flex items-center justify-center rounded-2xl'>
                    {slide.data?.images[0].src ? (
                        <img
                            onClick={() => setOpenPopupId(`images-0`)}
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.images[0].src}`}
                            alt={slide.data?.images[0].src}
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer bg-[#FCFCFC] border-2 border-dashed text-[#DFDFDF] rounded-2xl'>
                            <button type='button' onClick={() => setOpenPopupId(`images-0`)}>Upload an image</button>
                        </label>
                    )}
                </div>
                <div className='w-[321px] cursor-pointer h-[321px] mt-5 flex items-center justify-center rounded-2xl'>
                    {slide.data?.images[1].src ? (
                        <img
                            onClick={() => setOpenPopupId(`images-1`)}
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.images[1].src}`}
                            alt={slide.data?.images[1].src}
                            className='object-fill w-fit h-full rounded-2xl cursor-pointer'
                        />
                    ) : (
                        <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer bg-[#FCFCFC] border-2 border-dashed text-[#DFDFDF] rounded-2xl'>
                            <button type='button' onClick={() => setOpenPopupId(`images-1`)}>Upload an image</button>
                        </label>
                    )}
                </div>
            </div>
            {/* Image Selector Popup */}
            {["fabricColorImages-0", "threadColorImages-0", "images-0", "images-1"].map((elem) => {
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