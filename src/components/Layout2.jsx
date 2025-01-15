import { useTechPack } from '../context/TechPackContext';

const Layout2 = () => {

  const { formData, handleImageUpload } = useTechPack();
  const { specSheet } = formData;

  const handleClick = (key) => {
    document.getElementById(key).click();
  };

  const handleAddImage = (field, position, files) => {
    handleImageUpload("specSheet", field, position, files);
  };

  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full flex justify-evenly gap-10'>
        {[0, 1, 2].map((key, index) => (
          <div
            key={index}
            className='w-fit h-[230px] border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
            onClick={() => handleClick(index)}
          >
            {specSheet?.images.find((item) => item.position === index) ? (
              <img
                src={specSheet?.images.find((item) => item.position === index).src}
                alt={`img-${index}`}
                className='object-fill h-full rounded-2xl'
              />
            ) : (
              <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                <span>Drop an Image here</span>
              </label>
            )}
            <input
              id={key}
              type='file'
              accept='image/*'
              onChange={(e) => handleAddImage("images", index, e.target.files)}
              className='hidden'
            />
          </div>
        ))}
      </div>
      <div className='flex justify-evenly gap-10'>
        <div className='h-[180px]'>
          <h1>Thread colour</h1>
          <div className='w-full h-full flex justify-evenly gap-5'>
            {[0, 1].map((key, index) => (
              <div
                key={index}
                className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
                onClick={() => handleClick(index)}
              >
                {specSheet?.threadColorImages.find((item) => item.position === index) ? (
                  <img
                    src={specSheet?.threadColorImages.find((item) => item.position === index).src}
                    alt={`thread-img-${index}`}
                    className='object-fill h-full rounded-2xl'
                  />
                ) : (
                  <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                    <span>Drop an Image here</span>
                  </label>
                )}
                <input
                  id={key}
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleAddImage("threadColorImages", index, e.target.files)}
                  className='hidden'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='h-[180px]'>
          <h1>Fabric colour</h1>
          <div className='w-full h-full flex justify-between gap-5'>
            {[0, 1].map((key, index) => (
              <div
                key={index}
                className='w-fit h-full border-2 border-dashed rounded-2xl bg-[#F3F3F3] flex items-center justify-center'
                onClick={() => handleClick(index)}
              >
                {specSheet?.fabricColorImages.find((item) => item.position === index) ? (
                  <img
                    src={specSheet?.fabricColorImages.find((item) => item.position === index).src}
                    alt={`fabric-img-${index}`}
                    className='object-cover h-full w-full rounded-2xl'
                  />
                ) : (
                  <label className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                    <span>Drop an Image here</span>
                  </label>
                )}
                <input
                  id={key}
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleAddImage("fabricColorImages", index, e.target.files)}
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