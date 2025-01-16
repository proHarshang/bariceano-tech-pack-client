import { MdDelete } from "react-icons/md";
import { useTechPack } from '../context/TechPackContext';

const ArtworkPlacementSheet = () => {
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
                    {[0, 1].map((_, index) => (
                        <FormRow formIndex={index} />
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ArtworkPlacementSheet

const FormRow = ({ formIndex }) => {
    const { formData, updateFormData } = useTechPack();
    const { artwork } = formData;

    const handleInputChange = (field, value) => {
        // Update the specific form's data within artworkPlacementSheet
        const updatedForms = [...artwork.artworkPlacementSheet];
        if (!updatedForms[formIndex]) {
            updatedForms[formIndex] = {};
        } else {
            updatedForms[formIndex][field] = value;
        }
        updateFormData("artwork", { artworkPlacementSheet: updatedForms });
    };

    const handleAddImage = (field, files) => {
        // Add images to the specific form's data within artworkPlacementSheet
        const updatedForms = [...artwork.artworkPlacementSheet];

        const newImages = Array.from(files).map((file) => ({
            src: URL.createObjectURL(file),
            file,
        }));
        console.log("field : ", field);
        updatedForms[formIndex][field] = newImages;

        updateFormData("artwork", { artworkPlacementSheet: updatedForms });
    };

    const handleClick = (key) => {
        document.getElementById(key).click();
    };

    return (
        <tr>
            <td className="border border-gray-400 p-2 w-[10px]">
                <input className='w-full' type="text" name='sNo' value={formIndex + 1} onChange={(e) => handleInputChange("sNo", e.target.value)} />
            </td>
            {/* Placement Text */}
            <td className="border border-gray-400 p-2">
                <textarea
                    className="w-[100px] mx-auto"
                    placeholder="Enter Placement Text"
                    rows={3}
                    value={artwork.artworkPlacementSheet[formIndex]?.placement || ""}
                    onChange={(e) => handleInputChange("placement", e.target.value)}
                />
            </td>
            {/* Front Image */}
            <td className="border border-gray-400 p-2 text-center" onClick={() => handleClick(formIndex + "artworkimage")} >
                {artwork.artworkPlacementSheet[formIndex]?.artworkimage ? (
                    <img
                        src={artwork.artworkPlacementSheet[formIndex]?.artworkimage[0].src}
                        alt={`Front ${formIndex}`}
                        className="w-fit mx-auto h-[156px] object-fill cursor-pointer"
                    />
                ) : (
                    <div
                        className="w-full h-[156px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                    >
                        Drop an Image here
                    </div>
                )}
                <input
                    id={formIndex + "artworkimage"}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleAddImage("artworkimage", e.target.files)}
                />
            </td>


            {/* Technique Text */}
            <td className="border border-gray-400 p-2">
                <textarea
                    className="w-[100px] mx-auto"
                    placeholder="Enter Technique"
                    rows={3}
                    value={artwork.artworkPlacementSheet[formIndex]?.technique || ""}
                    onChange={(e) => handleInputChange("technique", e.target.value)}
                />
            </td>
            {/* Color Text */}
            <td className="border border-gray-400 p-2">
                <input
                    type="text"
                    className="w-[100px] mx-auto"
                    placeholder="Enter Colour"
                    value={artwork.artworkPlacementSheet[formIndex]?.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                />
            </td>
            {/* Placement Image */}
            <td className="border border-gray-400 p-2 text-center" onClick={() => handleClick(formIndex + "placementimage")} >
                {artwork.artworkPlacementSheet[formIndex]?.placementimage ? (
                    <img
                        src={artwork.artworkPlacementSheet[formIndex]?.placementimage[0].src}
                        alt={`Placement ${formIndex}`}
                        className="w-fit mx-auto h-[156px] object-fill cursor-pointer"
                    />
                ) : (
                    <div
                        className="w-full h-[156px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                    >
                        Drop an Image here
                    </div>
                )}
                <input
                    id={formIndex + "placementimage"}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleAddImage("placementimage", e.target.files)}
                />
            </td>
            {/* Delete Button */}
            <td className="border border-gray-400 p-2 px-0 text-center">
                <button
                    className="px-3 text-2xl py-1 rounded"
                // onClick={() => handleDeleteRow(formIndex)}
                >
                    <MdDelete />
                </button>
            </td>
        </tr>
    )
}