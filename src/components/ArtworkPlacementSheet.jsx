import { useState } from 'react';

const ArtworkPlacementSheet = () => {
    const [images, setImages] = useState(Array(2).fill({ front: null, placement: null }));

    const handleImageChange = (index, type, event) => {
        const file = event.target.files[0];
        const newImages = [...images];
        newImages[index][type] = URL.createObjectURL(file);
        setImages(newImages);
    };

    const handleImageClick = (index, type) => {
        document.getElementById(`image-upload-${index}-${type}`).click();
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
                    </tr>
                </thead>
                <tbody>
                    {images.map((image, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2">{index + 1}</td>
                            <td className="border border-gray-400 p-2 text-center">
                                <textarea type="text" className='w-[100px] mx-auto' placeholder='Enter Placement' rows={3} />
                            </td>
                            <td className="border border-gray-400 p-2">
                                {image.front ? (
                                    <img
                                        src={image.front}
                                        alt={`Front ${index + 1}`}
                                        className="w-fit mx-auto h-[156px] object-fill cursor-pointer"
                                        onClick={() => handleImageClick(index, 'front')}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-[156px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                                        onClick={() => handleImageClick(index, 'front')}
                                    >
                                        Drop an Image here
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id={`image-upload-${index}-front`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, 'front', e)}
                                />
                            </td>
                            <td className="border border-gray-400 p-2 text-center">
                                <textarea type="text" className='w-[100px] mx-auto' placeholder='Enter Technique' rows={3} />

                            </td>
                            <td className="border border-gray-400 p-2 text-center">
                                <input type="text" className='w-[100px] mx-auto' />
                            </td>
                            <td className="border border-gray-400 p-2">
                                {image.placement ? (
                                    <img
                                        src={image.placement}
                                        alt={`Placement ${index + 1}`}
                                        className="w-fit mx-auto h-[156px] object-fill cursor-pointer"
                                        onClick={() => handleImageClick(index, 'placement')}
                                    />
                                ) : (
                                    <div
                                        className="w-full  h-[156px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                                        onClick={() => handleImageClick(index, 'placement')}
                                    >
                                        Drop an Image here
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id={`image-upload-${index}-placement`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, 'placement', e)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ArtworkPlacementSheet
// made my this table same as this image and also change height and width acording image ,
// currently this image inpute not working so fix that and when user enter image show prewview above that cell and also add functionality like when user have to change image then click again to image then ask for upload image
// make 2 row same as image 