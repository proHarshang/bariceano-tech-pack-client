import { useTechPack } from '../context/TechPackContext';

const SiliconLabel = ({ page }) => {
    const { getSlideByPage, updateSlideByPage } = useTechPack();
    const slide = getSlideByPage(page);

    return (
        <div className="w-full h-full p-10 pt-6">
            <div className='flex flex-col mb-5'>
                <label htmlFor="title">Add Title</label>
                <input
                    type="text"
                    name="title"
                    className='text-sm mx-[2px] outline outline-1 p-2'
                    value={slide.data.title}
                    onChange={(e) => updateSlideByPage(page, "data.title", e.target.value)}
                />
            </div>
            <div className='h-[430px]'>
                {slide.data.images[0] ? (
                    <div className="flex flex-col items-center w-full h-full">
                        <img
                            src={`${process.env.REACT_APP_API_URL}/upload/techpack/${slide.data.images[0].src}`}
                            alt={slide.data.images[0].src}
                            className="mb-4 w-full h-full object-contain cursor-pointer"
                        />
                        <input type='text' />
                    </div>
                ) : (
                    <div className="border-2 border-dashed bg-[#F3F3F3] border-gray-300 w-full h-full flex justify-center items-center cursor-pointer">
                        <input type='text' />
                        <p>Drop an Image here or click to select</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SiliconLabel;
