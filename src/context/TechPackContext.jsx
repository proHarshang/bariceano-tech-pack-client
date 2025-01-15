import React, { createContext, useState, useContext } from 'react';

const TechPackContext = createContext();

export const TechPackProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        specSheet: {
            page: 1,
            name: "Spec. Sheet",
            layout: "layout1",
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

    // Handle image uploads
    const handleImageUpload = (section, field, position, files) => {
        const newImages = Array.from(files).map((file) => ({
            position: position,
            src: URL.createObjectURL(file), // Temporary preview
            file,
        }));

        const existingImages = formData[section][field] || [];

        // Merge new images, replacing ones with the same position
        const updatedImages = [...existingImages];

        newImages.forEach((newImage) => {
            const existingIndex = updatedImages.findIndex(
                (img) => img.position === newImage.position
            );
            if (existingIndex >= 0) {
                updatedImages[existingIndex] = newImage; // Replace existing image
            } else {
                updatedImages.push(newImage); // Add new image
            }
        });

        updateFormData(section, { [field]: updatedImages });
    };

    const handleSubmit = async () => {
        const structuredData = new FormData();

        Object.entries(formData).forEach(([section, data]) => {
            console.log("section:", section, "data:", data);
            if (typeof data === 'object' && !Array.isArray(data)) {
                Object.entries(data).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        // console.log("key:", key, "value:", value);
                        // Handle arrays like images
                        value.forEach((item, index) => {
                            // console.log("item:", item, "index:", index);
                            if (item.file) {
                                structuredData.append(`${section}.${key}[${index}].src`, item.file);
                            } else {
                                structuredData.append(`${section}.${key}[${index}].src`, item.src);
                            }
                        });
                    } else {
                        structuredData.append(`${section}.${key}`, value);
                    }
                });
            }
        });

        console.log("structuredData", structuredData);
        // try {
        //     const response = await fetch('/api/techpack', {
        //         method: 'POST',
        //         body: structuredData,        
        //     });
        //     const result = await response.json();
        //     console.log('Submission Success:', result);
        // } catch (error) {
        //     console.error('Submission Error:', error);
        // }
    };

    return (
        <TechPackContext.Provider value={{ formData, updateFormData, handleImageUpload, handleSubmit }}>
            {children}
        </TechPackContext.Provider>
    );
};

export const useTechPack = () => useContext(TechPackContext);
