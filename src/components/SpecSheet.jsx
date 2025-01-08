import React from 'react'
import { MdDelete } from "react-icons/md";
import { useState } from 'react';

const SpecSheet = () => {
    const [fields, setFields] = useState([
        { id: 1, label: "STYLE No", type: "text", value: "" },
        { id: 2, label: "Gender", type: "select", options: ["Male", "Female"] },
        { id: 3, label: "FABRIC COLOUR", type: "text", value: "" },
        { id: 4, label: "FIT", type: "select", options: ["Oversize", "Regular"] },
        { id: 5, label: "SEASON", type: "text", value: "" },
        { id: 6, label: "status", type: "select", options: ["Development", "Production", "Selected"] },
        { id: 7, label: "RATIO", type: "text", value: "" },
        { id: 8, label: "Style", type: "select", options: ["Sweat Shirt", "Hoodie", "T shirt"] },
        { id: 9, label: "TRIM", type: "textarea", value: "" },
        { id: 10, label: "CATEGORY", type: "select", options: ["Top", "Bottom", "Shirt", "T-Shirt"] },
        { id: 11, label: "FABRIC", type: "textarea", value: "" },
        { id: 12, label: "SIZE", type: "text", value: "S, M, L, XL" },
        { id: 13, label: "DESCRIPTION", type: "textarea", value: "" },
        { id: 14, label: "Designer", type: "select", options: ["Harshita", "Ritika"] },
        { id: 15, label: "NOTE", type: "textarea", value: "" },
    ]);

    // Add new field
    const addField = () => {
        const newField = {
            id: fields.length + 1,
            label: "New Field",
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

    // Handle input changes
    const handleChange = (id, value) => {
        const updatedFields = fields.map((field) =>
            field.id === id ? { ...field, value } : field
        );
        setFields(updatedFields);
    };

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
            <form className="flex flex-wrap gap-10">
                {fields.map((field) => (
                    <div key={field.id} className="form__group field w-[45%] relative group">
                        {field.type === "text" && (
                            <input
                                type="text"
                                className="form__field"
                                value={field.value}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                            />
                        )}
                        {field.type === "textarea" && (
                            <textarea
                                className="form__field"
                                rows={1}
                                value={field.value}
                                onChange={(e) => handleChange(field.id, e.target.value)}
                            ></textarea>
                        )}
                        {field.type === "select" && (
                            <select
                                className="form__field"
                                value={field.value}
                                onChange={(e) => handleChange(field.id, e.target.value)}
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
            </form>
        </section>
    )
}

export default SpecSheet