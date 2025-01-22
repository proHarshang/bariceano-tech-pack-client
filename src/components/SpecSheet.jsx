import { MdDelete } from "react-icons/md";
import { useTechPack } from '../context/TechPackContext';
import { fetchAll } from "../API/TechPacks";
import { useState, useEffect } from "react";

const SpecSheet = ({ page }) => {
    const [fabric, setFabric] = useState([]);
    const [genders, setGenders] = useState([]);
    const [states] = useState([
        "Sample",
        "Development",
        "Production",
    ]);

    useEffect(() => {
        const fetchAllSetting = async () => {
            try {
                const data = await fetchAll(); // Use the categoryFetch hook                                    
                if (data.status) {
                    setFabric(data.techPack.fabric); // Set the fetched fabric
                    setGenders(data.techPack.gender); // Set the fetched fabric
                } else {
                    console.error('Failed to fetch fabric');
                }
            } catch (error) {
                console.error('Error fetching fabric:', error);
            }
        };
        fetchAllSetting();
    }, []);


    const { getSlideByPage } = useTechPack();

    const slide = getSlideByPage(page);

    const { addInfoField, updateInfoField, deleteInfoField, updateField } = useTechPack();

    // const [fields, setFields] = useState([
    //     { id: 1, name: 'styleNo', label: "STYLE No", type: "text", value: specSheetTable.info.styleNo },
    //     { id: 2, name: 'gender', label: "Gender", type: "select", options: ["Male", "Female"], value: specSheetTable.info.gender },
    //     { id: 3, name: 'fabricColor', label: "FABRIC COLOUR", type: "text", value: specSheetTable.info.fabricColor },
    //     { id: 4, name: 'fit', label: "FIT", type: "select", options: ["Oversize", "Regular"], value: specSheetTable.info.fit },
    //     { id: 5, name: 'season', label: "SEASON", type: "text", value: specSheetTable.info.season },
    //     { id: 6, name: 'status', label: "status", type: "select", options: ["Development", "Production", "Selected"], value: specSheetTable.info.status },
    //     { id: 7, name: 'ratio', label: "RATIO", type: "text", value: specSheetTable.info.ratio },
    //     { id: 8, name: 'style', label: "Style", type: "select", options: ["Sweat Shirt", "Hoodie", "T shirt"], value: specSheetTable.info.style },
    //     { id: 9, name: 'trim', label: "TRIM", type: "textarea", value: specSheetTable.info.trim },
    //     { id: 10, name: 'category', label: "CATEGORY", type: "select", options: ["Top", "Bottom", "Shirt", "T-Shirt"], value: specSheetTable.info.category },
    //     { id: 11, name: 'fabric', label: "FABRIC", type: "textarea", value: specSheetTable.info.fabric },
    //     { id: 12, name: 'size', label: "SIZE", type: "text", value: specSheetTable.info.size },
    //     { id: 13, name: 'description', label: "DESCRIPTION", type: "textarea", value: specSheetTable.info.description },
    //     { id: 14, name: 'designer', label: "Designer", type: "select", options: ["Harshita", "Ritika"], value: specSheetTable.info.designer },
    //     { id: 15, name: 'note', label: "NOTE", type: "textarea", value: specSheetTable.info.note },
    // ]); 

    return (
        <section className='mx-auto mb-20 px-10'>
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
                    <label className="form__label">Style No</label>
                    <input
                        type="text"
                        value={slide.data?.info?.find((item) => item.name === "styleNo").value}
                        onChange={(e) => {
                            updateField("styleNo", e.target.value);
                            updateInfoField(page, "styleNo", slide.data?.info?.find((item) => item.name === "styleNo").value, { "value": e.target.value })
                        }}
                        className="form__field"
                        placeholder="BR-00-00"
                        required
                    />
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label">Designer</label>
                    <input
                        type="text"
                        value={JSON.parse(localStorage.getItem('user')).Name}
                        className="form__field"
                        placeholder="BR-00-00"
                        required
                        disabled
                    />
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label">Size</label>
                    <input
                        type="text"
                        value={slide.data?.info?.find((item) => item.name === "size").value}
                        onChange={(e) => updateInfoField(page, "size", slide.data?.info?.find((item) => item.name === "size").value, { "value": e.target.value })}
                        className="form__field"
                        placeholder="BR-00-00"
                        required
                    />
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label">Gender</label>
                    <select name="" id="" value={slide.data?.info?.find((item) => item.name === "gender").value}
                        onChange={(e) => {
                            updateField("gender", e.target.value);
                            updateInfoField(page, "gender", slide.data?.info?.find((item) => item.name === "gender").value, { "value": e.target.value })
                        }}
                        className="form__field break-words text-wrap"
                        required>
                        {genders.map((gender) => (
                            <option className="break-words text-wrap text-sm overflow-x-auto" value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label">State</label>
                    <select name="" id="" value={slide.data?.info?.find((item) => item.name === "state").value}
                        onChange={(e) => {
                            updateField("state", e.target.value);
                            updateInfoField(page, "state", slide.data?.info?.find((item) => item.name === "state").value, { "value": e.target.value })
                        }}
                        className="form__field break-words text-wrap"
                        required>
                        {states.map((state) => (
                            <option className="break-words text-wrap text-sm overflow-x-auto" value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="form__group field w-[45%] relative group">
                    <label className="form__label">Fabric</label>
                    <select name="" id="" value={slide.data?.info?.find((item) => item.name === "fabric").value}
                        onChange={(e) => {
                            updateField("fabric", e.target.value);
                            updateInfoField(page, "fabric", slide.data?.info?.find((item) => item.name === "fabric").value, { "value": e.target.value })
                        }}
                        className="form__field break-words text-wrap"
                        required>
                        {fabric.map((fabric) => (
                            <option className="break-words text-wrap text-sm overflow-x-auto" value={fabric}>{fabric}</option>
                        ))}
                    </select>
                </div>
                {slide.data?.info?.map((field, index) => {
                    if (["styleNo", "designer", "size", "gender", "state", "fabric"].includes(field.name)) {
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
                                className="form__label"
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