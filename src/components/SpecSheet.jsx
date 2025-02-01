import { MdDelete } from "react-icons/md";
import { useTechPack } from '../context/TechPackContext';
import { fetchAll } from "../API/TechPacks";
import { useState, useEffect } from "react";

const SpecSheet = ({ page, currentCategory, currentSubCategory, selectedLabels }) => {
    const [fabric, setFabric] = useState([]);
    const [collections, setCollections] = useState([]);

    const [states] = useState([
        "Sample",
        "Development",
        "Production",
    ]);

    const { techPackData, addInfoField, updateMode, getSlideByPage, updateInfoField, deleteInfoField, updateField } = useTechPack();

    const slide = getSlideByPage(page);

    useEffect(() => {
        const fetchAllSetting = async () => {
            try {
                const data = await fetchAll(); // Use the categoryFetch hook                                    
                if (data.status) {
                    setFabric(data.techPack.fabric); // Set the fetched fabric                    
                    setCollections(data.techPack.collections); // Set the fetched categories
                } else {
                    console.error('Failed to fetch fabric');
                }
            } catch (error) {
                console.error('Error fetching fabric:', error);
            }
        };
        fetchAllSetting();
    }, []);

    useEffect(() => {
        if (updateMode === "off" && selectedLabels && currentSubCategory && currentCategory) {
            updateInfoField(page, "Product Type", slide.data?.info?.find((item) => item.name === "Product Type").value, { "value": currentCategory })
            updateInfoField(page, "Gender", slide.data?.info?.find((item) => item.name === "Gender").value, { "value": currentSubCategory })
            updateInfoField(page, "Trim", slide.data?.info?.find((item) => item.name === "Trim").value, { "value": selectedLabels.join(', ') })
        }
    }, [updateMode, selectedLabels, currentCategory, currentSubCategory])

    return (
        <section className='mx-auto mb-20 pl-7 pr-2'>
            <div className="text-xs flex gap-5 justify-end mt-10">
                <button
                    className="px-3 py-1 border rounded-lg border-black"
                    type="button"
                    onClick={() => addInfoField(page, {
                        position: "7",
                        name: "New Field",
                        value: "New Value",
                    })}
                >
                    Add new
                </button>
            </div>
            <div className="flex flex-wrap gap-10">
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label capitalize">Style No</label>
                    <input
                        type="text"
                        value={slide.data?.info?.find((item) => item.name === "Style No").value}
                        onChange={(e) => {
                            updateField("styleNo", e.target.value);
                            updateInfoField(page, "Style No", slide.data?.info?.find((item) => item.name === "Style No").value, { "value": e.target.value })
                        }}
                        className="form__field"
                        required
                    />
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label capitalize">Size</label>
                    <input
                        type="text"
                        value={slide.data?.info?.find((item) => item.name === "Size").value}
                        onChange={(e) => updateInfoField(page, "Size", slide.data?.info?.find((item) => item.name === "Size").value, { "value": e.target.value })}
                        className="form__field"
                        placeholder="BR-00-00"
                        required
                    />
                </div>
                <div className="flex w-[45%] gap-5">
                    <div className="form__group field w-1/2 relative group">
                        <label className="form__label capitalize">Gender</label>
                        <input
                            disabled={true}
                            value={slide.data?.info?.find((item) => item.name === "Gender").value}
                            // onChange={(e) => {
                            //     updateField("gender", e.target.value);
                            //     updateInfoField(page, "Gender", slide.data?.info?.find((item) => item.name === "Gender").value, { "value": e.target.value })
                            // }}
                            className="form__field break-words text-wrap cursor-not-allowed"
                            required>
                        </input>
                    </div>
                    <div className="form__group field w-1/2 relative group">
                        <label className="form__label capitalize">Collection</label>
                        <select
                            value={slide.data?.info?.find((item) => item.name === "Collection").value}
                            onChange={(e) => {
                                updateField("designCollection", e.target.value);
                                updateInfoField(page, "Collection", slide.data?.info?.find((item) => item.name === "Collection").value, { "value": e.target.value })
                            }}
                            className="form__field break-words text-wrap"
                            required
                        >
                            <option className="break-words text-wrap text-sm overflow-x-auto" value="select" disabled>select</option>
                            {collections.map((collection) => (
                                <option key={collection} className="break-words text-wrap text-sm overflow-x-auto" value={collection}>{collection}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label capitalize">State</label>
                    <select
                        value={slide.data?.info?.find((item) => item.name === "State").value}
                        onChange={(e) => {
                            updateField("state", e.target.value);
                            updateInfoField(page, "State", slide.data?.info?.find((item) => item.name === "State").value, { "value": e.target.value })
                        }}
                        className="form__field break-words text-wrap"
                        required>
                        <option className="break-words text-wrap text-sm overflow-x-auto" value="select" disabled>select</option>
                        {states.map((state) => (
                            <option key={state} className="break-words text-wrap text-sm overflow-x-auto" value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label capitalize">Fabric</label>
                    <select
                        value={slide.data?.info?.find((item) => item.name === "Fabric").value}
                        onChange={(e) => {
                            updateField("fabric", e.target.value);
                            updateInfoField(page, "Fabric", slide.data?.info?.find((item) => item.name === "Fabric").value, { "value": e.target.value })
                        }}
                        className="form__field break-words text-wrap"
                        required>
                        <option className="break-words text-wrap text-sm overflow-x-auto" value="select" disabled>select</option>
                        {fabric.map((fabric, index) => (
                            <option key={fabric} className="break-words text-wrap overflow-hidden max-w-[200px] text-sm overflow-x-auto" title={fabric} value={fabric}>{fabric}</option>
                        ))}
                    </select>
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label capitalize">Trim</label>
                    <textarea
                        type="text"
                        value={slide.data?.info?.find((item) => item.name === "Trim").value}
                        onChange={(e) => updateInfoField(page, "Trim", slide.data?.info?.find((item) => item.name === "Trim").value, { "value": e.target.value })}
                        className="form__field"
                        required
                    />
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label capitalize">Product Type</label>
                    <input
                        type="text"
                        value={slide.data?.info?.find((item) => item.name === "Product Type").value}
                        className="form__field"
                        required
                        disabled
                    />
                </div>
                {slide.data?.info?.map((field, index) => {
                    if (["Style No", "Designer", "Size", "Gender", "State", "Fabric", "Collection", "Trim", "Product Type"].includes(field.name)) {
                        return null;
                    }
                    return (
                        <div key={index} className="form__group field w-[45%] relative group">
                            <textarea
                                type="text"
                                className="form__field"
                                value={field.value}
                                rows={1}
                                onChange={(e) => updateInfoField(page, field.name, field.value, { "value": e.target.value })}
                                required
                            />
                            <button
                                className="text-xs text-right w-full hidden leading-[10px] group-hover:flex absolute left-[95%]"
                                onClick={() => deleteInfoField(page, field.name, field.value)}
                                type="button"
                            >
                                <MdDelete className="text-red-600 hover:scale-150 transition-all" title="Delete" />
                            </button>
                            <input
                                type="text"
                                value={slide.data?.info?.find((item) => item.name === field.name).name}
                                onChange={(e) => updateInfoField(page, field.name, field.value, { "name": e.target.value })}
                                className="form__label capitalize"
                                placeholder={field.name}
                                required
                            />
                        </div>
                    )
                }
                )}
            </div>
        </section>
    )
}

export default SpecSheet