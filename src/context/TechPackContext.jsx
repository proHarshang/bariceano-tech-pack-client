import React, { createContext, useState, useContext, useEffect } from 'react';
import { addTechPacks } from '../API/TechPacks';

const TechPackContext = createContext();

export const useTechPack = () => useContext(TechPackContext);

export const TechPackProvider = ({ children }) => {

    const [isAdding, setIsAdding] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        status: null,
        message: null,
    });
    const [techPackData, setTechPackData] = useState({
        designer: "",
        styleNo: "BR-00-00",
        state: "",
        gender: "",
        category: "",
        slides: [{
            "page": 1,
            "name": "Spac Sheet",
            "type": "Layout2",
            "data": {
                "fabricColorImages": [
                    {
                        "position": 0,
                        "src": "PANTONE1.jpg"
                    },
                    {
                        "position": 1,
                        "src": "PANTONE1.jpg"
                    },
                    {
                        "position": 2,
                        "src": "PANTONE1.jpg"
                    }
                ],
                "threadColorImages": [
                    {
                        "position": 0,
                        "src": "PANTONE1.jpg"
                    },
                    {
                        "position": 1,
                        "src": "PANTONE1.jpg"
                    },
                    {
                        "position": 2,
                        "src": "PANTONE1.jpg"
                    }
                ],
                "images": [
                    {
                        "position": 0,
                        "src": "BRMS04FRONT.jpg"
                    },
                    {
                        "position": 1,
                        "src": "BRMS04SIDE.jpg"
                    },
                    {
                        "position": 2,
                        "src": "BRMS04BACK.jpg"
                    }
                ]
            },
        },
        {
            "page": 2,
            "name": "Spec Sheet",
            "type": "Information",
            "data": {
                "info": [
                    {
                        "position": "1",
                        "name": "styleNo",
                        "value": "BR-00-00"
                    },
                    {
                        "position": "1",
                        "name": "designer",
                        "value": ""
                    },
                    {
                        "position": "2",
                        "name": "fabricColor",
                        "value": "Bright White (11-0601 TP)"
                    },
                    {
                        "position": "3",
                        "name": "gender",
                        "value": "Male"
                    },
                    {
                        "position": "4",
                        "name": "state",
                        "value": "Development"
                    },
                    {
                        "position": "4",
                        "name": "fit",
                        "value": "Oversize"
                    },
                    {
                        "position": "Last",
                        "name": "trim",
                        "value": "Silicon label, Wash care label, Size label, Main label, 2X1 Rib, 1x1 Rib, Hang tag, Sewing thread"
                    },
                    {
                        "position": "Last",
                        "name": "fabric",
                        "value": "96% supima cotton, 4% spandex (elastane)(340gsm) loop knit, mild brushing back side (soft hand feel) (all type of fabrics should be treated with remazol dye only)"
                    },
                    {
                        "position": "Last",
                        "name": "description",
                        "value": "Centre front screen print + sleeve screen print + centre back silicon tag."
                    },
                    {
                        "position": "Last",
                        "name": "note",
                        "value": "Use water based ink."
                    },
                    {
                        "position": "5",
                        "name": "style",
                        "value": "Sweatshirt"
                    },
                    {
                        "position": "6",
                        "name": "category",
                        "value": "Top"
                    },
                    {
                        "position": "3",
                        "name": "size",
                        "value": "S,M,L,XL"
                    },
                    {
                        "position": "3",
                        "name": "ratio",
                        "value": "1:1:1:1"
                    }
                ]
            }
        },
        {
            "page": 3,
            "name": "Artwork Placement Sheet",
            "type": "ArtworkPlacementSheet",
            "data": {
                "artworkPlacementSheet": [
                    {
                        "sNo": 1,
                        "placement": "Front",
                        "technique": "Flock",
                        "color": "#FFFFFF #FFFFFF #FFFFFF",
                        "artworkimage": [
                            {
                                "position": 0,
                                "src": "3.png"
                            }
                        ],
                        "placementimage": [
                            {
                                "position": 0,
                                "src": "4.png"
                            }
                        ]
                    },
                    {
                        "sNo": 2,
                        "placement": "Front",
                        "technique": "Flock",
                        "color": "#FFFFFF #FFFFFF #FFFFFF",
                        "artworkimage": [
                            {
                                "position": "0",
                                "src": "3.png"
                            }
                        ],
                        "placementimage": [
                            {
                                "position": "0",
                                "src": "4.png"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "page": 4,
            "name": "Art Work",
            "type": "Artwork",
            "data": {
                "images": [
                    {
                        "position": 0,
                        "src": "HangTag.jpg"
                    }
                ]
            }
        },
        {
            "page": 5,
            "name": "Silicon Label",
            "type": "SiliconLabel",
            "data": {
                "title": "Silicon Label Details",
                "images": [
                    {
                        "position": 0,
                        "src": "artworksheet.jpg"
                    }
                ]
            }
        },
        ],
    });

    // Add a new slide to the slides array
    const addSlide = (newSlide) => {
        if (newSlide) {
            setTechPackData((prev) => ({
                ...prev,
                slides: [...prev.slides, newSlide],
            }));
        }
    };

    // Update a slide
    const updateSlide = (index, field, value) => {
        setTechPackData((prev) => {
            const updatedSlides = [...prev.slides];
            if (!updatedSlides[index]) updatedSlides[index] = {};
            updatedSlides[index][field] = value;
            return { ...prev, slides: updatedSlides };
        });
    };

    // Update a field in the main form
    const updateField = (field, value) => {
        setTechPackData((prev) => ({ ...prev, [field]: value }));
    };

    // Update the type value
    const updateTypeInSlides = (newType) => {
        setTechPackData((prev) => ({
            ...prev,
            slides: prev.slides.map((slide) =>
                slide.type === "Layout0" || slide.type === "Layout1" || slide.type === "Layout2" || slide.type === "Layout3"
                    ? { ...slide, type: newType }
                    : slide
            ),
        }));
    };

    const addInfoField = (page, newField) => {
        setTechPackData((prev) => {
            const updatedSlides = prev.slides.map((slide) => {
                if (slide.page === page) {
                    return {
                        ...slide,
                        data: {
                            ...slide.data,
                            info: [...slide.data.info, newField], // Add the new field to the info array
                        },
                    };
                }
                return slide;
            });

            return { ...prev, slides: updatedSlides };
        });
    };

    const updateInfoField = (page, label, value, updatedField) => {
        setTechPackData((prev) => {
            const updatedSlides = prev.slides.map((slide) => {
                if (slide.page === page) {
                    return {
                        ...slide,
                        data: {
                            ...slide.data,
                            info: slide.data.info.map((field) =>
                                field.name === label && field.value === value ? { ...field, ...updatedField } : field
                            ),
                        },
                    };
                }
                return slide;
            });

            return { ...prev, slides: updatedSlides };
        });
    };

    const deleteInfoField = (page, label, value) => {
        setTechPackData((prev) => {
            const updatedSlides = prev.slides.map((slide) => {
                if (slide.page === page) {
                    return {
                        ...slide,
                        data: {
                            ...slide.data,
                            info: slide.data.info.filter(
                                (field) => !(field.name === label && field.value === value)
                            ), // Remove the matching field
                        },
                    };
                }
                return slide;
            });

            return { ...prev, slides: updatedSlides };
        });
    };

    const addArtworkPlacement = (page, newPlacement) => {
        setTechPackData((prev) => {
            const updatedSlides = prev.slides.map((slide) => {
                if (slide.page === page) {
                    return {
                        ...slide,
                        data: {
                            ...slide.data,
                            artworkPlacementSheet: [...slide.data.artworkPlacementSheet, newPlacement],
                        },
                    };
                }
                return slide;
            });

            return { ...prev, slides: updatedSlides };
        });
    };

    // Update an artwork placement entry by `sNo`
    const updateArtworkPlacement = (page, sNo, updatedFields) => {
        console.log(page, sNo, updatedFields);
        setTechPackData((prev) => {
            const updatedSlides = prev.slides.map((slide) => {
                if (slide.page === page) {
                    return {
                        ...slide,
                        data: {
                            ...slide.data,
                            artworkPlacementSheet: slide.data.artworkPlacementSheet.map((placement) =>
                                placement.sNo === sNo ? { ...placement, ...updatedFields } : placement
                            ),
                        },
                    };
                }
                return slide;
            });

            console.log(updatedSlides);
            return { ...prev, slides: updatedSlides };
        });
    };

    // Delete an artwork placement entry by `sNo`
    const deleteArtworkPlacement = (page, sNo) => {
        setTechPackData((prev) => {
            const updatedSlides = prev.slides.map((slide) => {
                if (slide.page === page) {
                    return {
                        ...slide,
                        data: {
                            ...slide.data,
                            artworkPlacementSheet: slide.data.artworkPlacementSheet.filter(
                                (placement) => placement.sNo !== sNo
                            ),
                        },
                    };
                }
                return slide;
            });

            return { ...prev, slides: updatedSlides };
        });
    };


    const updateSlideByPage = (page, fieldPath, value) => {
        setTechPackData((prev) => {
            const updatedSlides = prev.slides.map((slide) => {
                if (slide.page === page) {
                    const updatedSlide = { ...slide };
                    const fieldParts = fieldPath.split(".");
                    let currentField = updatedSlide;

                    // Traverse to the target field
                    fieldParts.forEach((key, index) => {
                        if (index === fieldParts.length - 1) {
                            // Update the target field
                            if (Array.isArray(currentField[key])) {
                                const positionIndex = currentField[key].findIndex(
                                    (item) => item.position === value.position
                                );
                                if (positionIndex !== -1) {
                                    currentField[key][positionIndex] = {
                                        ...currentField[key][positionIndex],
                                        src: value.src,
                                    };
                                }
                            } else {
                                currentField[key] = value;
                            }
                        } else {
                            if (!currentField[key]) {
                                currentField[key] = {};
                            }
                            currentField = currentField[key];
                        }
                    });

                    return updatedSlide;
                }
                return slide;
            });

            return { ...prev, slides: updatedSlides };
        });
    };

    const updateNestedImages = (page, field, operation, data = {}) => {
        setTechPackData((prev) => {
            return {
                ...prev,
                slides: prev.slides.map((slide) => {
                    if (slide.page === page) {
                        return {
                            ...slide,
                            data: {
                                ...slide.data,
                                [field]: (() => {
                                    const currentImages = slide.data[field] || [];
                                    switch (operation) {
                                        case "add":
                                            return [...currentImages, data]; // Add a new image
                                        case "update":
                                            return currentImages.map((img) =>
                                                img.position === data.position
                                                    ? { ...img, ...data } // Update matching image
                                                    : img
                                            );
                                        case "delete":
                                            return currentImages.filter(
                                                (img) => img.position !== data.position
                                            ); // Remove matching image
                                        default:
                                            return currentImages;
                                    }
                                })(),
                            },
                        };
                    }
                    return slide;
                }),
            };
        });
    };


    const getSlideByPage = (pageNumber) => {
        return techPackData.slides.find((slide) => slide.page === pageNumber) || null;
    };

    // Submit the form data
    const submitTechPack = async () => {
        setIsAdding(true)
        console.log("TechPackData : ", techPackData);
        try {
            const response = await addTechPacks(techPackData)
            setSubmitStatus(response)
        } catch (error) {
            throw new Error("Error creating TechPack:", error.message);
        } finally {
            setIsAdding(false)
        }
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setSubmitStatus({
    //             status: null,
    //             message: null,
    //         });
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, [submitStatus]);

    useEffect(() => {
        setSubmitStatus({
            status: null,
            message: null,
        });
    }, [techPackData]);


    return (
        <TechPackContext.Provider
            value={{
                techPackData,
                isAdding,
                submitStatus,
                updateField,
                addSlide,
                updateSlide,
                updateTypeInSlides,
                getSlideByPage,
                updateSlideByPage,
                addInfoField,
                updateInfoField,
                deleteInfoField,
                submitTechPack,
                deleteArtworkPlacement,
                updateNestedImages,
                updateArtworkPlacement,
                addArtworkPlacement
            }}
        >
            {children}
        </TechPackContext.Provider>
    );
};