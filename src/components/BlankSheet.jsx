import { useTechPack } from '../context/TechPackContext';

const BlankSheet = ({ page }) => {
  const { getSlideByPage, updateSlideByPage } = useTechPack();

  const slide = getSlideByPage(page);

  return (
    <div className="w-full h-[461px] p-10">
      {slide.data.images[0].src ? (
        <div className="flex flex-col items-center w-full h-full">
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`}
            alt={slide.data.images[0].src}
            className="mb-4 w-full h-full object-contain cursor-pointer"
          />
          <input
            type='text'
            value={slide.data.images[0].src}
            onChange={(e) => updateSlideByPage(page, "data.images", { position: 0, src: e.target.value })}
          />
        </div>
      ) : (
        <div
          className="border-2 border-dashed bg-[#F3F3F3] border-gray-300 w-full h-full flex justify-center items-center cursor-pointer"
        >
          <input
            type='text'
            value={slide.data.images[0].src}
            onChange={(e) => updateSlideByPage(page, "data.images", { position: 0, src: e.target.value })}
          />
          <p>Drop an Image here or click to select</p>
        </div>
      )}
    </div>
  );
};

export default BlankSheet;
