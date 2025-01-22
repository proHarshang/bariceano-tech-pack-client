import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useTechPack } from '../context/TechPackContext';
import ImageSelectorPopup from './ImageSelectorPopup';

const ArtworkPlacementSheet = ({ page }) => {
    const { getSlideByPage, addArtworkPlacement } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <>
            <div className="text-xs flex gap-5 justify-end m-5">
                <button
                    className={`px-3 py-1 border rounded-lg border-black ${slide.data.artworkPlacementSheet.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                    disabled={slide.data.artworkPlacementSheet.length >= 5}
                    onClick={(e) => addArtworkPlacement(page, {
                        sNo: slide.data.artworkPlacementSheet.length + 1,
                        placement: "Back",
                        technique: "Embroidery",
                        color: "#000000",
                        artworkimage: [{ position: 0, src: "default.png" }],
                        placementimage: [{ position: 0, src: "default.png" }],
                    })}
                >
                    Add new
                </button>
            </div>
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
                        {slide.data.artworkPlacementSheet.map((item, index) => (
                            <FormRow formIndex={index} page={page} item={item} />
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default ArtworkPlacementSheet

const FormRow = ({ formIndex, page, item }) => {
    const [openPopupId, setOpenPopupId] = useState(null);
    const { getSlideByPage, updateArtworkPlacement, deleteArtworkPlacement } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <>
            <tr>
                <td className="border border-gray-400 p-2 w-[10px]">
                    <input
                        className='w-full'
                        type="text"
                        name='sNo'
                        value={slide.data.artworkPlacementSheet[formIndex]?.sNo}
                        onChange={(e) => updateArtworkPlacement(page, item.sNo, { "sNo": e.target.value })}
                    />
                </td>
                {/* Placement Text */}
                <td className="border border-gray-400 p-2">
                    <textarea
                        className="w-[100px] mx-auto"
                        placeholder="Enter Placement Text"
                        rows={4}
                        value={slide.data.artworkPlacementSheet[formIndex]?.placement}
                        onChange={(e) => updateArtworkPlacement(page, item.sNo, { "placement": e.target.value })}
                    />
                </td>
                {/* Front Image */}
                <td className="border border-gray-400 p-2 text-center">
                    {slide.data.artworkPlacementSheet[formIndex]?.artworkimage[0].src ? (
                        <img
                            onClick={() => setOpenPopupId(`artworkimage`)}
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.artworkPlacementSheet[formIndex]?.artworkimage[0].src}`}
                            alt={slide.data.artworkPlacementSheet[formIndex]?.artworkimage[0].src}
                            className="w-fit mx-auto h-[126px] object-fill cursor-pointer"
                        />
                    ) : (
                        <div
                            className="w-full h-[126px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                        >
                            <button type='button' onClick={() => setOpenPopupId(`artworkimage`)}>Add</button>
                        </div>
                    )}
                </td>


                {/* Technique Text */}
                <td className="border border-gray-400 p-2">
                    <textarea
                        className="w-[100px] mx-auto"
                        placeholder="Enter Technique"
                        rows={4}
                        value={slide.data.artworkPlacementSheet[formIndex]?.technique}
                        onChange={(e) => updateArtworkPlacement(page, item.sNo, { "technique": e.target.value })}
                    />
                </td>
                {/* Color Text */}
                <td className="border border-gray-400 p-2">
                    <textarea
                        className="w-[100px] mx-auto"
                        placeholder="Enter Colour"
                        rows={4}
                        value={slide.data.artworkPlacementSheet[formIndex]?.color}
                        onChange={(e) => updateArtworkPlacement(page, item.sNo, { "color": e.target.value })}
                    />
                </td>
                {/* Placement Image */}
                <td className="border border-gray-400 p-2 text-center">
                    {slide.data.artworkPlacementSheet[formIndex]?.placementimage[0].src ? (
                        <img
                            onClick={() => setOpenPopupId(`placementimage`)}
                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.artworkPlacementSheet[formIndex]?.placementimage[0].src}`}
                            alt={slide.data.artworkPlacementSheet[formIndex]?.placementimage[0].src}
                            className="w-fit mx-auto h-[126px] object-fill cursor-pointer"
                        />
                    ) : (
                        <div
                            className="w-full h-[126px] bg-[#F3F3F3] border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                        >
                            <button type='button' onClick={() => setOpenPopupId(`placementimage`)}>Add</button>
                        </div>
                    )}
                </td>
                {/* Delete Button */}
                <td className="border border-gray-400 p-2 px-0 text-center">
                    <button
                        className={`px-3 text-2xl py-1 rounded ${slide.data.artworkPlacementSheet.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="button"
                        disabled={slide.data.artworkPlacementSheet.length <= 1}
                        onClick={() => deleteArtworkPlacement(page, item.sNo)}
                    >
                        <MdDelete />
                    </button>
                </td>
            </tr>
            {/* Image Selector Popup */}
            {["artworkimage", "placementimage"].map((elem) => {
                return <ImageSelectorPopup
                    key={elem}
                    isOpen={openPopupId === elem}
                    closeModal={() => setOpenPopupId(null)}
                    onImageSelect={(imgName) => {
                        updateArtworkPlacement(page, slide.data.artworkPlacementSheet[formIndex].sNo, { [elem]: [{ "position": 0, "src": imgName }] })
                    }}
                />
            })}
        </>
    )
}

