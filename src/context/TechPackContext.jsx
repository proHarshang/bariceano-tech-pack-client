import React, { createContext, useState, useContext } from 'react';

const TechPackContext = createContext();

export const TechPackProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        specSheet: {
            page: 1,
            name: "Spec. Sheet",
            layout: "",
            fabricColorImages: [],
            threadColorImages: [],
            images: [],
        },
        specSheetTable: {
            page: 2,
            name: "Spec. Sheet",
            info: {},
        },
        artwork: {
            page: 3,
            name: "Artwork Placement Sheet",
            artworkPlacementSheet: [],
            artworkImages: [],
        },
        siliconLabelSheet: {
            page: 4,
            name: "Spec. Sheet",
            title: "",
            images: [],
        },
        Pages: [],
    });

    const updateFormData = (section, data) => {
        setFormData((prevData) => ({
            ...prevData,
            [section]: { ...prevData[section], ...data },
        }));
    };

    const handleSubmit = async () => {
        // Transform formData to fit API requirements
        const structuredData = { ...formData }; // Modify if needed
        console.log("formData", formData);
        try {
            const response = await fetch('/api/techpack', {
                method: 'POST',
                body: JSON.stringify(structuredData),
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            console.log('Submission Success:', result);
        } catch (error) {
            console.error('Submission Error:', error);
        }
    };

    return (
        <TechPackContext.Provider value={{ formData, updateFormData, handleSubmit }}>
            {children}
        </TechPackContext.Provider>
    );
};

export const useTechPack = () => useContext(TechPackContext);
