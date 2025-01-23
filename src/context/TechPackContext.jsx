import React, { createContext, useState, useContext, useEffect } from 'react';
import { addTechPacks } from '../API/TechPacks';
import { useNavigate } from 'react-router-dom';

const TechPackContext = createContext();

export const useTechPack = () => useContext(TechPackContext);

export const TechPackProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAdding, setIsAdding] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        status: null,
        message: null,
    });
    const [techPackData, setTechPackData] = useState({
        designer: JSON.parse(localStorage.getItem('user')).Name || "",
        styleNo: "",
        collection: "",
        state: "Sample",
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
                        "src": "placeholder.png"
                    },
                    {
                        "position": 1,
                        "src": "placeholder.png"
                    },
                    {
                        "position": 2,
                        "src": "placeholder.png"
                    }
                ],
                "threadColorImages": [
                    {
                        "position": 0,
                        "src": "placeholder.png"
                    },
                    {
                        "position": 1,
                        "src": "placeholder.png"
                    },
                    {
                        "position": 2,
                        "src": "placeholder.png "
                    }
                ],
                "images": [
                    {
                        "position": 0,
                        "src": "placeholder.png"
                    },
                    {
                        "position": 1,
                        "src": "placeholder.png"
                    },
                    {
                        "position": 2,
                        "src": "placeholder.png"
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
                        "value": ""
                    },
                    {
                        "position": "1",
                        "name": "designer",
                        "value": ""
                    },
                    {
                        "position": "2",
                        "name": "fabricColor",
                        "value": ""
                    },
                    {
                        "position": "3",
                        "name": "gender",
                        "value": "Male"
                    },
                    {
                        "position": "4",
                        "name": "state",
                        "value": "Sample"
                    },
                    {
                        "position": "4",
                        "name": "fit",
                        "value": ""
                    },
                    {
                        "position": "Last",
                        "name": "trim",
                        "value": ""
                    },
                    {
                        "position": "Last",
                        "name": "fabric",
                        "value": ""
                    },
                    {
                        "position": "Last",
                        "name": "description",
                        "value": ""
                    },
                    {
                        "position": "Last",
                        "name": "note",
                        "value": ""
                    },
                    {
                        "position": "5",
                        "name": "style",
                        "value": ""
                    },
                    {
                        "position": "6",
                        "name": "category",
                        "value": ""
                    },
                    {
                        "position": "3",
                        "name": "size",
                        "value": "S,M,L,XL"
                    },
                    {
                        "position": "3",
                        "name": "ratio",
                        "value": ""
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
                        "placement": "",
                        "technique": "",
                        "color": "",
                        "artworkimage": [
                            {
                                "position": 0,
                                "src": ""
                            }
                        ],
                        "placementimage": [
                            {
                                "position": 0,
                                "src": ""
                            }
                        ]
                    },
                    {
                        "sNo": 2,
                        "placement": "",
                        "technique": "",
                        "color": "",
                        "artworkimage": [
                            {
                                "position": "0",
                                "src": ""
                            }
                        ],
                        "placementimage": [
                            {
                                "position": "0",
                                "src": ""
                            }
                        ]
                    }
                ]
            }
        },
        {
            "page": 4,
            "name": "Art Work",
            "type": "ArtWork",
            "data": {
                "images": [
                    {
                        "position": 0,
                        "src": ""
                    }
                ]
            }
        },
        {
            "page": 6,
            "name": "Silicon Label",
            "type": "SiliconLabel",
            "data": {
                "title": "Silicon Label Details",
                "images": [
                    {
                        "position": 0,
                        "src": "default.png"
                    }
                ]
            }
        }
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

    // const deleteSlideByPage = (page) => {
    //     setTechPackData((prev) => {
    //         return {
    //             ...prev,
    //             slides: prev.slides.filter((slide) => slide.page !== page),
    //         };
    //     });
    // };

    const deleteSlideByPage = (page) => {
        setTechPackData((prev) => {
            const updatedSlides = prev.slides
                .filter((slide) => slide.page !== page) // Remove the slide
                .map((slide, index) => ({ ...slide, page: index + 1 })); // Reassign page numbers

            return {
                ...prev,
                slides: updatedSlides,
            };
        });
    };

    const addSlideAtIndex = (index, newSlide) => {
        setTechPackData((prev) => {
            const updatedSlides = [...prev.slides];
            updatedSlides.splice(index, 0, newSlide); // Insert the new slide at the desired index

            // Update the page numbers for slides after the inserted one
            const adjustedSlides = updatedSlides.map((slide, i) => ({
                ...slide,
                page: i + 1,
            }));

            return {
                ...prev,
                slides: adjustedSlides,
            };
        });
    };

    const getMaxPageNumber = () => {
        return Math.max(0, ...techPackData.slides.map(slide => slide.page));
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
        try {
            const response = await addTechPacks(techPackData)
            setSubmitStatus(response)
            console.log("response", response)
            if (response.status === true) {
                navigate('/tech-pack-data')
            }
        } catch (error) {
            throw new Error("Error creating TechPack:", error.message);
        } finally {
            setIsAdding(false)
        }

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSubmitStatus({
                status: null,
                message: null,
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, [submitStatus]);

    useEffect(() => {
        setSubmitStatus({
            status: null,
            message: null,
        });
    }, [techPackData]);

    const resetTechPack = async () => {
        console.log("reset techpack")
    };

    return (
        <TechPackContext.Provider
            value={{
                techPackData,
                isAdding,
                submitStatus,
                updateField,
                addSlide,
                deleteSlideByPage,
                addSlideAtIndex,
                getMaxPageNumber,
                updateSlide,
                updateTypeInSlides,
                getSlideByPage,
                updateSlideByPage,
                addInfoField,
                updateInfoField,
                deleteInfoField,
                submitTechPack,
                resetTechPack,
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