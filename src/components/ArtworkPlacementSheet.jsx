import { useState } from 'react';
import { MdDelete } from "react-icons/md";

const ArtworkPlacementSheet = () => {
    const [images, setImages] = useState(
        Array.from({ length: 2 }, () => ({
            front: null,
            placement: null,
            placementText: "",
            techniqueText: "",
            colorText: "",
        }))
    );

    const handleImageChange = (index, type, event) => {
        const file = event.target.files[0];
        const newImages = [...images];
        newImages[index][type] = URL.createObjectURL(file);
        setImages(newImages);
    };

    const handleImageClick = (index, type) => {
        document.getElementById(`image-upload-${index}-${type}`).click();
    };

    const handleDeleteRow = (deleteIndex) => {
        const updatedImages = images.filter((_, index) => index !== deleteIndex);
        setImages(updatedImages);
    };

    const handleTextChange = (index, field, value) => {
        const newImages = [...images];
        newImages[index][field] = value;
        setImages(newImages);
    };

    return (
        <div className="overflow-x-auto p-10">
            <table className="min-w-full border border-gray-400">
                <thead>
                    <tr>
                        <th className="border bg-black text-white border-gray-400 p-2">#</th>
                        <th className="border bg-black text-white border-gray-400 p-2">Placement</th>
                        <th className="border bg-black text-white border-gray-400 p-2">Art work</th>
                        <th className="border bg-black text-white border-gray-400 p-2">Technique</th>
                        <th className="border bg-black text-white border-gray-400 p-2">Colour</th>
                        <th className="border bg-black text-white border-gray-400 p-2">Placement</th>
                        <th className="border bg-black text-white border-gray-400 p-2">Del</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((image, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2 w-[10px]"><input className='w-full' placeholder='0' type="text" /></td>
                            {/* Placement Text */}
                            <td className="border border-gray-400 p-2">
                                <textarea
                                    className="w-[100px] mx-auto"
                                    placeholder="Enter Placement Text"
                                    rows={3}
                                    value={image.placementText}
                                    onChange={(e) =>
                                        handleTextChange(index, "placementText", e.target.value)
                                    }
                                />
                            </td>
                            {/* Front Image */}
                            <td className="border border-gray-400 p-2 text-center">
                                {image.front ? (
                                    <img
                                        src={image.front}
                                        alt={`Front ${index + 1}`}
                                        className="w-fit mx-auto h-[156px] object-fill cursor-pointer"
                                        onClick={() => handleImageClick(index, "front")}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-[156px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                                        onClick={() => handleImageClick(index, "front")}
                                    >
                                        Drop an Image here
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id={`image-upload-${index}-front`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, "front", e)}
                                />
                            </td>


                            {/* Technique Text */}
                            <td className="border border-gray-400 p-2">
                                <textarea
                                    className="w-[100px] mx-auto"
                                    placeholder="Enter Technique"
                                    rows={3}
                                    value={image.techniqueText}
                                    onChange={(e) =>
                                        handleTextChange(index, "techniqueText", e.target.value)
                                    }
                                />
                            </td>
                            {/* Color Text */}
                            <td className="border border-gray-400 p-2">
                                <input
                                    type="text"
                                    className="w-[100px] mx-auto"
                                    placeholder="Enter Colour"
                                    value={image.colorText}
                                    onChange={(e) =>
                                        handleTextChange(index, "colorText", e.target.value)
                                    }
                                />
                            </td>
                            {/* Placement Image */}
                            <td className="border border-gray-400 p-2 text-center">
                                {image.placement ? (
                                    <img
                                        src={image.placement}
                                        alt={`Placement ${index + 1}`}
                                        className="w-fit mx-auto h-[156px] object-fill cursor-pointer"
                                        onClick={() => handleImageClick(index, "placement")}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-[156px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                                        onClick={() => handleImageClick(index, "placement")}
                                    >
                                        Drop an Image here
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id={`image-upload-${index}-placement`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, "placement", e)}
                                />
                            </td>
                            {/* Delete Button */}
                            <td className="border border-gray-400 p-2 px-0 text-center">
                                <button
                                    className="px-3 text-2xl py-1 rounded"
                                    onClick={() => handleDeleteRow(index)}
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ArtworkPlacementSheet