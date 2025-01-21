import { useState } from 'react';
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const Layout2 = ({ page }) => {
  const [openPopupId, setOpenPopupId] = useState(null);

  const { getSlideByPage, updateSlideByPage } = useTechPack();

  const slide = getSlideByPage(page);

  return (
    <>
      <div className='flex flex-col gap-10'>
        <div className='w-full flex justify-evenly gap-14 px-10'>
          {[0, 1, 2].map((key, index) => (
            <div
              key={key}
              className='h-[270px] w-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
            >
              {slide.data?.images.find((item) => item.position === key) ? (
                <img
                  onClick={() => setOpenPopupId(`images-${key}`)}
                  src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.images.find((item) => item.position === key).src}`}
                  alt={slide.data?.images.find((item) => item.position === key).src}
                  className='object-fill h-full rounded-2xl'
                />
              ) : (
                <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                  <button type='button' onClick={() => setOpenPopupId(`images-${key}`)}>Add</button>
                </label>
              )}
            </div>
          ))}
        </div>
        <div className='flex justify-evenly gap-10'>
          <div className='w-[35%] h-[150px]'>
            <h1>Thread colour</h1>
            <div className='w-full h-full flex justify-evenly gap-5'>
              {[0, 1].map((key, index) => (
                <div
                  key={key}
                  className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
                >
                  {slide.data?.threadColorImages?.find((item) => item.position === key) ? (
                    <img
                      onClick={() => setOpenPopupId(`threadColorImages-${key}`)}
                      src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.threadColorImages?.find((item) => item.position === key).src}`}
                      alt={slide.data?.threadColorImages?.find((item) => item.position === key).src}
                      className='object-fill h-full rounded-2xl'
                    />
                  ) : (
                    <label className='text-center flex text-sm flex-col items-center justify-center w-full h-full cursor-pointer'>
                      <button type='button' onClick={() => setOpenPopupId(`threadColorImages-${key}`)}>Add</button>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className='w-[35%] h-[150px]'>
            <h1>Fabric colour</h1>
            <div className='w-full h-full flex justify-between gap-5'>
              {[0, 1].map((key, index) => (
                <div
                  key={key}
                  className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
                >
                  {slide.data?.fabricColorImages?.find((item) => item.position === key) ? (
                    <img
                      onClick={() => setOpenPopupId(`fabricColorImages-${key}`)}
                      src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data?.fabricColorImages?.find((item) => item.position === key).src}`}
                      alt={slide.data?.fabricColorImages?.find((item) => item.position === key).src}
                      className='object-cover h-full w-full rounded-2xl'
                    />
                  ) : (
                    <label className='text-sm text-center flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                      <button type='button' onClick={() => setOpenPopupId(`fabricColorImages-${key}`)}>Add</button>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Image Selector Popup */}
      {["fabricColorImages-0", "fabricColorImages-1", "threadColorImages-0", "threadColorImages-1", "images-0", "images-1", "images-2"].map((elem) => {
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

export default Layout2