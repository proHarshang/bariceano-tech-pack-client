import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import { useTechPack } from '../context/TechPackContext';

const SpecSheet = () => {
    const { formData, updateFormData } = useTechPack();
    const { specSheetTable } = formData;

    const [fields, setFields] = useState([
        { id: 1, name: 'styleNo', label: "STYLE No", type: "text", value: specSheetTable.info.styleNo },
        { id: 2, name: 'gender', label: "Gender", type: "select", options: ["Male", "Female"], value: specSheetTable.info.gender },
        { id: 3, name: 'fabricColor', label: "FABRIC COLOUR", type: "text", value: specSheetTable.info.fabricColor },
        { id: 4, name: 'fit', label: "FIT", type: "select", options: ["Oversize", "Regular"], value: specSheetTable.info.fit },
        { id: 5, name: 'season', label: "SEASON", type: "text", value: specSheetTable.info.season },
        { id: 6, name: 'status', label: "status", type: "select", options: ["Development", "Production", "Selected"], value: specSheetTable.info.status },
        { id: 7, name: 'ratio', label: "RATIO", type: "text", value: specSheetTable.info.ratio },
        { id: 8, name: 'style', label: "Style", type: "select", options: ["Sweat Shirt", "Hoodie", "T shirt"], value: specSheetTable.info.style },
        { id: 9, name: 'trim', label: "TRIM", type: "textarea", value: specSheetTable.info.trim },
        { id: 10, name: 'category', label: "CATEGORY", type: "select", options: ["Top", "Bottom", "Shirt", "T-Shirt"], value: specSheetTable.info.category },
        { id: 11, name: 'fabric', label: "FABRIC", type: "textarea", value: specSheetTable.info.fabric },
        { id: 12, name: 'size', label: "SIZE", type: "text", value: specSheetTable.info.size },
        { id: 13, name: 'description', label: "DESCRIPTION", type: "textarea", value: specSheetTable.info.description },
        { id: 14, name: 'designer', label: "Designer", type: "select", options: ["Harshita", "Ritika"], value: specSheetTable.info.designer },
        { id: 15, name: 'note', label: "NOTE", type: "textarea", value: specSheetTable.info.note },
    ]);

    // Add new field
    const addField = () => {
        const newField = {
            id: fields.length + 1,
            label: "New Field",
            name: "",
            type: "text",
            value: "",
        };
        setFields([...fields, newField]);
    };

    // Delete a field
    const deleteField = (id) => {
        const updatedFields = fields.filter((field) => field.id !== id);
        setFields(updatedFields);
    };

    const handleInputChange = (field, value) => {
        updateFormData("specSheetTable", { "info": { ...specSheetTable.info, [field]: value } });
    };

    // // Handle input changes
    // const handleChange = (id, value) => {
    //     const updatedFields = fields.map((field) =>
    //         field.id === id ? { ...field, value } : field
    //     );
    //     setFields(updatedFields);
    // };

    return (
        <section className='mx-auto mb-20 px-10'>
            <div className="text-xs flex gap-5 justify-end mt-10">
                <button
                    className="px-3 py-1 border rounded-lg border-black"
                    onClick={addField}
                >
                    Add new
                </button>
            </div>
            <div className="flex flex-wrap gap-10">
                {fields.map((field) => (
                    <div key={field.id} className="form__group field w-[45%] relative group">
                        {field.type === "text" && (
                            <input
                                type="text"
                                className="form__field"
                                value={field.value}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                            />
                        )}
                        {field.type === "textarea" && (
                            <textarea
                                className="form__field"
                                rows={1}
                                value={field.value}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                            ></textarea>
                        )}
                        {field.type === "select" && (
                            <select
                                className="form__field"
                                value={field.value}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                            >
                                <option value="">Select</option>
                                {field.options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                        <button
                            className="text-xs text-right w-full hidden leading-[10px] group-hover:flex absolute left-[95%]"
                            onClick={() => deleteField(field.id)}
                            type="button"
                        >
                            <MdDelete />
                        </button>
                        <input
                            type="text"
                            value={field.label}
                            className="form__label uppercase"
                            placeholder={field.label}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SpecSheet