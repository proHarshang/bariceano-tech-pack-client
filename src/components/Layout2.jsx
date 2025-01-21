import { useTechPack } from '../context/TechPackContext';

const Layout2 = ({ page }) => {
  const { getSlideByPage, updateSlideByPage } = useTechPack();

  const slide = getSlideByPage(page);

  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full flex justify-evenly gap-14 px-10'>
        {["front", "SIDE", "back"].map((key, index) => (
          <div
            key={index}
            className='h-[270px] w-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
          >
            {slide.data?.images.find((item) => item.position === key) ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/upload/techpack/${slide.data?.images.find((item) => item.position === key).src}`}
                alt={`img-${key}`}
                className='object-fill h-full rounded-2xl'
              />
            ) : (
              <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                <span>Drop an Image here</span>
              </label>
            )}
            <input
              id={key}
              type='text'
              value={slide.data?.images.find((item) => item.position === key).src}
              onChange={(e) => updateSlideByPage(page, "data.images", [{ position: key, src: e.target.value }])}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-evenly gap-10'>
        <div className='w-[35%] h-[150px]'>
          <h1>Thread colour</h1>
          <div className='w-full h-full flex justify-evenly gap-5'>
            {[0, 1].map((key, index) => (
              <div
                key={index}
                className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
              >
                {slide.data?.threadColorImages?.find((item) => item.position === key) ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/upload/techpack/${slide.data?.threadColorImages?.find((item) => item.position === key).src}`}
                    alt={`thread-img-${key}`}
                    className='object-fill h-full rounded-2xl'
                  />
                ) : (
                  <label className='text-center flex text-sm flex-col items-center justify-center w-full h-full cursor-pointer'>
                    <span>Drop an Image here</span>
                  </label>
                )}
                <input
                  id={key}
                  type='text'
                  value={slide.data?.threadColorImages?.find((item) => item.position === key).src}
                  onChange={(e) => updateSlideByPage(page, "data.threadColorImages", [{ position: key, src: e.target.value }])}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-[35%] h-[150px]'>
          <h1>Fabric colour</h1>
          <div className='w-full h-full flex justify-between gap-5'>
            {[0, 1].map((key, index) => (
              <div
                key={index}
                className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
              >
                {slide.data?.fabricColorImages?.find((item) => item.position === key) ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/upload/techpack/${slide.data?.fabricColorImages?.find((item) => item.position === key).src}`}
                    alt={`fabric-img-${key}`}
                    className='object-cover h-full w-full rounded-2xl'
                  />
                ) : (
                  <label className='text-sm text-center flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                    <span>Drop an Image here</span>
                  </label>
                )}
                <input
                  id={key}
                  type='text'
                  value={slide.data?.fabricColorImages?.find((item) => item.position === key).src}
                  onChange={(e) => updateSlideByPage(page, "data.fabricColorImages", { position: key, src: e.target.value })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout2