import { useState } from "react";
const Layout2 = () => {
  const [images, setImages] = useState({
    img1: null,
    img2: null,
    img3: null,
    threadImg1: null,
    threadImg2: null,
    fabricImg1: null,
    fabricImg2: null,
  });

  const handleImageChange = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImages((prevImages) => ({
          ...prevImages,
          [key]: fileReader.result,
        }));
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleClick = (key) => {
    document.getElementById(key).click();
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full flex justify-evenly gap-10'>
        {['img1', 'img2', 'img3'].map((key, index) => (
          <div
            key={index}
            className='w-fit h-[230px] border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
            onClick={() => handleClick(key)}
          >
            {images[key] ? (
              <img src={images[key]} alt={`img-${index + 1}`} className='object-fill h-full rounded-2xl' />
            ) : (
              <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                <span>Drop an Image here</span>
              </label>
            )}
            <input
              id={key}
              type='file'
              accept='image/*'
              onChange={(e) => handleImageChange(e, key)}
              className='hidden'
            />
          </div>
        ))}
      </div>
      <div className='flex justify-evenly gap-10'>
        <div className='h-[180px]'>
          <h1>Thread colour</h1>
          <div className='w-full h-full flex justify-evenly gap-5'>
            {['threadImg1', 'threadImg2'].map((key, index) => (
              <div
                key={index}
                className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
                onClick={() => handleClick(key)}
              >
                {images[key] ? (
                  <img src={images[key]} alt={`thread-img-${index + 1}`} className='object-fill h-full rounded-2xl' />
                ) : (
                  <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                    <span>Drop an Image here</span>
                  </label>
                )}
                <input
                  id={key}
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImageChange(e, key)}
                  className='hidden'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='h-[180px]'>
          <h1>Fabric colour</h1>
          <div className='w-full h-full flex justify-between gap-5'>
            {['fabricImg1', 'fabricImg2'].map((key, index) => (
              <div
                key={index}
                className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
                onClick={() => handleClick(key)}
              >
                {images[key] ? (
                  <img src={images[key]} alt={`fabric-img-${index + 1}`} className='object-cover h-full w-full rounded-2xl' />
                ) : (
                  <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                    <span>Drop an Image here</span>
                  </label>
                )}
                <input
                  id={key}
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImageChange(e, key)}
                  className='hidden'
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