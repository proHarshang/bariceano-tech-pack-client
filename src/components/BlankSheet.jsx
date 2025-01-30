import { useEffect, useState } from 'react';
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const BlankSheet = ({ page, image }) => {
  const [openPopupId, setOpenPopupId] = useState(null);

  const { getSlideByPage, updateSlideByPage } = useTechPack();

  const slide = getSlideByPage(page);

  if (image) {
    return (
      <>
        <div className="w-full h-[461px] p-10">
          {image.src ? (
            <div className="flex flex-col items-center w-full h-full">
              <img
                onClick={() => setOpenPopupId(`images-${image.position}`)}
                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                alt={image.src}
                className="mb-4 w-full h-full object-contain cursor-pointer"
              />
            </div>
          ) : (
            <div onClick={() => setOpenPopupId(`images-${image.position}`)}
              className="border-2 border-dashed bg-[#FCFCFC] rounded-2xl text-[#DFDFDF] text-xl text-wrap px-3 border-gray-300 w-full h-full flex justify-center items-center cursor-pointer"
            >
              <button type='button' >Click to upload an image</button>
            </div>
          )}
        </div>
        {/* Image Selector Popup */}
        {[`images-${image.position}`].map((elem) => {
          return <ImageSelectorPopup
            key={elem}
            isOpen={openPopupId === elem}
            closeModal={() => setOpenPopupId(null)}
            onImageSelect={(imgName) => {
              updateSlideByPage(page, `data.${elem.split("-")[0]}`, { "position": parseInt(elem.split("-")[1]), "src": imgName })
            }}
          />
        })}
      </>
    )
  }

  return (
    <>
      <div className="w-full h-[461px] p-10">
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
          <div onClick={() => setOpenPopupId(`images-0`)}
            className="border-2 border-dashed bg-[#FCFCFC] rounded-2xl text-[#DFDFDF] text-xl text-wrap px-3 border-gray-300 w-full h-full flex justify-center items-center cursor-pointer"
          >
            <button type='button' >Click to upload an image</button>
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
    </>
  );
};

export default BlankSheet;
