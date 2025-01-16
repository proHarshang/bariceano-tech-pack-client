import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTechPack } from '../context/TechPackContext';

const SiliconLabel = () => {
    const { formData, updateFormData, handleImageUpload } = useTechPack();
    const { siliconLabelSheet } = formData;

    const handleInputChange = (field, value) => {
        updateFormData("siliconLabelSheet", { [field]: value });
    };

    const onDrop = useCallback((acceptedFiles) => {
        handleImageUpload("siliconLabelSheet", "images", acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        accept: 'image/*',
        noClick: true,
        noKeyboard: true,
        multiple: false
    });

    return (
        <div className="w-full h-full p-10 pt-6">
            <div className='flex flex-col mb-5'>
                <label htmlFor="">Add Title</label>
                <input type="text" className='text-sm mx-[2px] outline outline-1 p-2' value={siliconLabelSheet.title}
                    onChange={(e) => handleInputChange("title", e.target.value)} />
            </div>
            <div className='h-[430px]'>
                {siliconLabelSheet.images[0] ? (
                    <div className="flex flex-col items-center w-full h-full">
                        <img
                            src={siliconLabelSheet.images[0].src}
                            alt="Preview"
                            className="mb-4 w-full h-full object-contain cursor-pointer"
                            onClick={open}
                        />
                        <input {...getInputProps()} />
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className="border-2 border-dashed bg-[#F3F3F3] border-gray-300 w-full h-full flex justify-center items-center cursor-pointer"
                        onClick={open}
                    >
                        <input {...getInputProps()} />
                        <p>Drop an Image here or click to select</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SiliconLabel;
