import { useState } from 'react';
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const SiliconLabel = ({ page }) => {
    const [openPopupId, setOpenPopupId] = useState(null);

    const { getSlideByPage, updateSlideByPage } = useTechPack();
    const slide = getSlideByPage(page);

    return (
        <div className="w-full h-full p-10 pt-6">
            <div className='flex flex-col mb-5'>
                <label htmlFor="title">Placement</label>
                <input
                    type="text"
                    name="title"
                    className='text-sm mx-[2px] outline outline-1 p-2'
                    value={slide.data.title}
                    onChange={(e) => updateSlideByPage(page, "data.title", e.target.value)}
                />
            </div>
            <div className='h-[430px]'>
                {slide.data.images[0].src ? (
                    <div className="flex flex-col items-center w-full h-full">
                        <img
                            onClick={() => setOpenPopupId(`images-0`)}
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`}
                            alt={slide.data.images[0].src}
                            className="mb-4 w-full h-full object-contain cursor-pointer"
                        />
                    </div>
                ) : (
                    <div onClick={() => setOpenPopupId(`images-0`)} className="border-2 border-dashed bg-[#F3F3F3] border-gray-300 w-full h-full flex justify-center items-center cursor-pointer">
                        <button type='button'>Click to upload an image</button>
                    </div>
                )}
            </div>
            {/* Image Selector Popup */}
            {["images-0"].map((elem) => {
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
    );
};

export default SiliconLabel;
