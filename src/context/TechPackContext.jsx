import { createContext, useState, useContext, useEffect } from 'react';
import { addTechPacks, fetchAll, getTechPacksById, updateTechPacks } from '../API/TechPacks';
import { useNavigate } from 'react-router-dom';

const TechPackContext = createContext();

export const useTechPack = () => useContext(TechPackContext);

export const TechPackProvider = ({ children }) => {
    const navigate = useNavigate();

    const [construction, setConstructionSheets] = useState([]);
    const [trims, setTrims] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [finishing, setFinishing] = useState([]);
    const [sizecharts, setSizeCharts] = useState([]);

    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUpdatingAs, setIsUpdatingAs] = useState(false);
    const [isSettingDataFetched, setIsSettingDataFetched] = useState(false);
    const [updateMode, setUpdateMode] = useState("off");
    const [submitStatus, setSubmitStatus] = useState({
        status: null,
        message: null,
    });
    const [techPackData, setTechPackData] = useState({
        designer: JSON.parse(localStorage.getItem('user')).Name || "",
        styleNo: "",
        // collection: localStorage.getItem("currentCollection"),
        collection: "Collection 1",
        state: "",
        gender: "",
        category: "",
        slides: [{
            "page": 1,
            "name": "Spec Sheet",
            "type": "Layout2",
            "data": {
                "fabricColorImages": [
                    {
                        "position": 0,
                        "src": ""
                    },
                    {
                        "position": 1,
                        "src": ""
                    },
                    {
                        "position": 2,
                        "src": ""
                    }
                ],
                "threadColorImages": [
                    {
                        "position": 0,
                        "src": ""
                    },
                    {
                        "position": 1,
                        "src": ""
                    },
                    {
                        "position": 2,
                        "src": " "
                    }
                ],
                "images": [
                    {
                        "position": 0,
                        "src": ""
                    },
                    {
                        "position": 1,
                        "src": ""
                    },
                    {
                        "position": 2,
                        "src": ""
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
                        "name": "Style No",
                        "value": ""
                    },
                    {
                        "position": "Last",
                        "name": "Fabric color",
                        "value": ""
                    },
                    {
                        "position": "3",
                        "name": "Gender",
                        "value": "Male"
                    },
                    {
                        "position": "3",
                        "name": "Collection",
                        "value": "Collection 1"
                    },
                    {
                        "position": "4",
                        "name": "State",
                        "value": "select"
                    },
                    {
                        "position": "4",
                        "name": "Fit",
                        "value": "Oversize"
                    },
                    {
                        "position": "Last",
                        "name": "Trim",
                        "value": ""
                    },
                    {
                        "position": "Last",
                        "name": "Fabric",
                        "value": "select"
                    },
                    {
                        "position": "Last",
                        "name": "Description",
                        "value": ""
                    },
                    {
                        "position": "Last",
                        "name": "Note",
                        "value": ""
                    },
                    {
                        "position": "5",
                        "name": "Product Type",
                        "value": ""
                    },
                    {
                        "position": "6",
                        "name": "Category",
                        "value": "Top"
                    },
                    {
                        "position": "3",
                        "name": "Size",
                        "value": "S,M,L,XL"
                    },
                    {
                        "position": "3",
                        "name": "Ratio",
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
        ],
    });

    const fetchAllSetting = async () => {
        try {
            const data = await fetchAll();
            if (data.status) {
                setConstructionSheets(data.techPack.constructionSheets);
                setTrims(data.techPack.trims);
                setRequirements(data.techPack.requirements);
                setFinishing(data.techPack.finishing);
                setSizeCharts(data.techPack.sizeCharts);
                setIsSettingDataFetched(true);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchAllSetting();
    }, [])

    const getType = (label, category, gender) => {
        // console.log(`${label.name} - ${techPackData.category}`)
        if (!isSettingDataFetched) return null;

        if (label.name === "Silicon Label Sheet") {
            return "SiliconLabel";
        } else if (trims.some(item => item.name === label.name)) {
            return label.name;
        } else if (["Construction Sheet", "Requirements", "Finishing"].includes(label.name)) {
            return `${label.name} - ${category}`;
        } else if (label.name === "Size Charts") {
            return sizecharts.find(item => item.gender === gender && item.category === category).name;
        } else {
            return "Page";
        }
    }

    const createUpdateTechPackSetup = async (id) => {
        try {
            setUpdateMode(id);
            if (id) {
                const techpack = await getTechPacksById(id);
                setTechPackData({
                    designer: techpack.data.designer,
                    styleNo: techpack.data.styleNo,
                    collection: techpack.data.collection,
                    state: techpack.data.state,
                    gender: techpack.data.gender,
                    category: techpack.data.category,
                    slides: techpack.data.slides
                });
            }
            console.log("🔄 updateMode - ", updateMode)
            return;
        } catch (e) {
            console.log(e)
            alert("Something Went Wrong! Ask Harshang")
        }
    }

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

    const moveSlideUp = (page) => {
        setTechPackData((prevData) => {
            const slides = [...prevData.slides];
            const index = slides.findIndex((slide) => slide.page === page);

            if (index > 0) {
                // Swap the current slide with the previous slide
                const temp = slides[index - 1];
                slides[index - 1] = slides[index];
                slides[index] = temp;

                // Adjust the page numbers
                slides[index - 1].page -= 1;
                slides[index].page += 1;

                return { ...prevData, slides };
            }

            alert(`Slide with page ${page} is already at the top.`);
            return prevData; // No changes if already at the top
        });
    };

    const moveSlideDown = (page) => {
        setTechPackData((prevData) => {
            const slides = [...prevData.slides];
            const index = slides.findIndex((slide) => slide.page === page);

            if (index < slides.length - 1) {
                // Swap the current slide with the next slide
                const temp = slides[index + 1];
                slides[index + 1] = slides[index];
                slides[index] = temp;

                // Adjust the page numbers
                slides[index + 1].page += 1;
                slides[index].page -= 1;

                return { ...prevData, slides };
            }

            console.alert(`Slide with page ${page} is already at the bottom.`);
            return prevData; // No changes if already at the bottom
        });
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

    const duplicateSlide = (pageToDuplicate) => {
        setTechPackData((prevData) => {
            const slides = [...prevData.slides];
            const pageIndex = slides.findIndex((slide) => slide.page === pageToDuplicate);

            if (pageIndex === -1) {
                console.error(`Slide with page number ${pageToDuplicate} not found.`);
                return prevData;
            }

            // Duplicate the slide and set its page number
            const duplicatedSlide = {
                ...slides[pageIndex],
                page: slides[pageIndex].page + 1,
            };

            // Insert the duplicated slide right after the original
            slides.splice(pageIndex + 1, 0, duplicatedSlide);

            // Adjust page numbers for subsequent slides
            for (let i = pageIndex + 2; i < slides.length; i++) {
                slides[i].page += 1;
            }

            return { ...prevData, slides };
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

    const updateTechPack = async () => {
        setIsUpdating(true)
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
            setIsUpdating(false)
        }

    };

    const updateAsTechPack = async () => {
        setIsUpdatingAs(true)
        try {
            const response = await updateTechPacks(updateMode, techPackData)
            setSubmitStatus(response)
            console.log("response", response)
            if (response.status === true) {
                navigate('/tech-pack-data')
            }
        } catch (error) {
            throw new Error("Error creating TechPack:", error.message);
        } finally {
            setIsUpdatingAs(false)
        }
    };

    useEffect(() => {
        if (submitStatus.status) {
            const timer = setTimeout(() => {
                setSubmitStatus({
                    status: null,
                    message: null,
                });
            }, 5000);

            return () => clearTimeout(timer);
        }
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
                construction,
                trims,
                requirements,
                finishing,
                sizecharts,
                setConstructionSheets,
                setTrims,
                setRequirements,
                setFinishing,
                setSizeCharts,
                fetchAllSetting,
                isSettingDataFetched,
                getType,
                techPackData,
                isAdding,
                submitStatus,
                updateMode,
                setUpdateMode,
                isUpdating,
                isUpdatingAs,
                moveSlideUp,
                moveSlideDown,
                updateTechPack,
                updateAsTechPack,
                createUpdateTechPackSetup,
                updateField,
                addSlide,
                deleteSlideByPage,
                duplicateSlide,
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