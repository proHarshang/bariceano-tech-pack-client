import { useState, useEffect } from "react";
import { fetchAll, categoryAdd, categoryEdit, categoryDelete, getTechPacks, genderAdd, genderEdit, genderDelete, trimAdd, useAddSizeChart, useDeleteSizeChart, useEditSizeChart, constructionSheetEdit, useDeleteTrims, fabricEdit, fabricAdd, fabricDelete, collectionEdit, collectionAdd, collectionDelete, parameterEdit, finishingEdit, trimEdit } from "../API/TechPacks";
import ImageSelectorPopup from "./ImageSelectorPopup";

export default function Setting() {

    const initialUpdateFormData = {
        genders: [],
        categories: [],
        styleNo: []
    }

    // Fetch All Data Logic Start
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);
    const [sizecharts, setSizeCharts] = useState([]);
    const [construction, setConstructionSheets] = useState([]);
    const [trims, setTrims] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [finishing, setFinishing] = useState([]);
    const [collections, setCollections] = useState([]);
    const [fabrics, setFabrics] = useState([]);
    const [techpacks, setTechpacks] = useState([]);

    const [submitStatus, setSubmitStatus] = useState(null);

    const [openPopupId, setOpenPopupId] = useState(null);
    const [update, setUpdate] = useState(false);
    const [updateFormData, setUpdateFormFData] = useState(initialUpdateFormData);

    useEffect(() => {
        if (!update) {
            setUpdateFormFData(initialUpdateFormData)
        }
    }, [update])


    useEffect(() => {
        if (submitStatus) {
            const timer = setTimeout(() => {
                setSubmitStatus(null);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const fetchAllSetting = async () => {
        try {
            const data = await fetchAll(); // Use the categoryFetch hook                                    
            if (data.status) {
                setCategories(data.techPack.category); // Set the fetched categories
                setGenders(data.techPack.gender); // Set the fetched categories
                setSizeCharts(data.techPack.sizeCharts); // Set the fetched categories
                setConstructionSheets(data.techPack.constructionSheets); // Set the fetched categories
                setTrims(data.techPack.trims); // Set the fetched categories
                setRequirements(data.techPack.requirements); // Set the fetched categories
                setFinishing(data.techPack.finishing); // Set the fetched categories
                setCollections(data.techPack.collections); // Set the fetched categories
                setFabrics(data.techPack.fabric); // Set the fetched categories
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchAllTechpacks = async () => {
        try {
            const data = await getTechPacks();
            if (data.status) {
                setTechpacks(data.data)
            } else {
                setTechpacks([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllSetting();
        fetchAllTechpacks()
    }, []);


    // Category Logic start
    const [addCategory, setAddCategory] = useState('');
    const [categoryAddBox, setCategoryAddBox] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditCategory = async (cat) => {
        const newCategoryName = prompt('Enter the new category name:', cat);
        if (newCategoryName && newCategoryName !== cat) {
            // Use the categoryEdit hook to update the category
            const updated = await categoryEdit(cat, newCategoryName);
            if (updated.status) {
                await fetchAllSetting();
                setSubmitStatus(updated)
            } else {
                console.error('Failed to edit category');
            }
        }
    };

    const handleDeleteCategory = async (cat) => {
        // Use the categoryDelete hook to delete the category
        const deleted = await categoryDelete(cat);
        if (deleted.status) {
            await fetchAllSetting();
            setSubmitStatus(deleted)
        } else {
            console.error('Failed to delete category');
        }
    };

    const handleSaveNewCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Use the categoryAdd hook to add a new category
        const newCategory = await categoryAdd(addCategory);
        if (newCategory.status) {
            fetchAllSetting();
            setAddCategory('');
            setCategoryAddBox(false);
            setSubmitStatus(newCategory)
        } else {
            console.error('Failed to add category');
        }
        setLoading(false);
    };

    // Category Logic Over


    // Gender Logic Start

    const [editedGender, setEditedGender] = useState('');
    const [genderAddBox, setGenderAddBox] = useState(false);

    const handleEditGender = async (gen) => {
        const newGenderName = prompt('Enter the new gender name:', gen);
        if (newGenderName && newGenderName !== gen) {
            // Use the categoryEdit hook to update the category
            const updated = await genderEdit(gen, newGenderName);
            if (updated.status) {
                fetchAllSetting();
                setSubmitStatus(updated)
            } else {
                console.error('Failed to edit gender');
            }
        }
    };

    const handleDeleteGender = async (gen) => {
        // Use the categoryDelete hook to delete the category
        const deleted = await genderDelete(gen);
        if (deleted.status) {
            // Remove the deleted category from the state
            fetchAllSetting();
            setSubmitStatus(deleted)
        } else {
            console.error('Failed to delete category');
        }
    };

    const handleSaveNewGender = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Use the categoryAdd hook to add a new category
        const newGender = await genderAdd(editedGender);
        if (newGender.status) {
            setEditedGender('');
            setGenderAddBox(false);
            fetchAllSetting();
            setSubmitStatus(newGender)
        } else {
            console.error('Failed to add category');
        }
        setLoading(false);
    };

    // Gender Logic Over


    // Sizechart Logic Start
    const [selectedOption, setSelectedOption] = useState("");
    const [formValues, setFormValues] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { addSizeChart, success, error } = useAddSizeChart();
    const { editSizeChart, } = useEditSizeChart();
    const { deleteSizeChart } = useDeleteSizeChart();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => {
            const updatedValues = { ...prev, [name]: value };
            if (updatedValues.gender && updatedValues.category) {
                updatedValues.name = `${updatedValues.gender}_${updatedValues.category}`.toLowerCase();
            }
            return updatedValues;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValues && formValues.name) {
            try {
                const added = await addSizeChart(formValues);
                fetchAllSetting();
                setSubmitStatus(added)
                setIsAdding(false);
            } catch (err) {
                alert("Could not Save!")
            }
        }
    };

    // Prefill form fields on size chart edit 
    useEffect(() => {
        if (isEditing && selectedOption) {
            const selectedData = sizecharts.find(item => item.name === selectedOption);
            setFormValues({
                name: selectedData.name,
                category: selectedData.category,
                gender: selectedData.gender,
                images: selectedData.images
            });
        } else {
            setFormValues({})
        }
    }, [isEditing, selectedOption, sizecharts]);

    const handleEditOption = async () => {
        if (selectedOption) {
            try {
                const updated = await editSizeChart(updateFormData, formValues);
                fetchAllSetting();
                setSubmitStatus(updated)
                setIsEditing(false);
            } catch (err) {
                alert("Could not Update!")
            }
        } else {
            alert("Please select a size chart to edit.");
        }
    };

    const handleDelete = async () => {
        if (selectedOption) {
            const confirmed = window.confirm("Are you sure you want to delete this size chart?");
            if (confirmed) {
                const deleted = await deleteSizeChart(selectedOption);
                fetchAllSetting();
                setSubmitStatus(deleted)
            }
        } else {
            alert("Please select a size chart to delete.");
        }
    };

    const handleAddOption = () => {
        setIsAdding(true);
    };

    const handleCancelAddOption = () => {
        setIsAdding(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    // Sizechart Logic Over


    // construction sheet Logic start
    const [constructionSheetEditBox, setConstructionSheetEditBox] = useState(null);
    const [constructionSheetLoading, setConstructionSheetLoading] = useState(false);

    const handleConstructionSheetEdit = async () => {
        try {
            setConstructionSheetLoading(true)
            // Use the categoryEdit hook to update the category
            const updated = await constructionSheetEdit(updateFormData, constructionSheetEditBox);
            if (updated.status) {
                fetchAllSetting(); // Refetch the data
                setConstructionSheetEditBox(null);
                setSubmitStatus(updated)
            } else {
                console.error('Failed to edit category');
            }
        } catch (error) {
            console.log("error in construction sheet: ", error)
        } finally {
            setConstructionSheetLoading(false)
        }
    }

    // Trims Logic Start

    // trimEdit Logic start
    const [trimAddBox, setTrimAddBox] = useState(null);
    const [trimEditBox, setTrimEditBox] = useState(null);
    const [trimLoading, setTrimLoading] = useState(false);

    const handleTrimAdd = async () => {
        try {
            setTrimLoading(true)
            // Use the categoryEdit hook to update the category
            const updated = await trimAdd(updateFormData, trimAddBox);
            if (updated.status) {
                fetchAllSetting();
                setTrimAddBox(null)
                setSubmitStatus(updated)
            } else {
                console.error('Failed to add trim');
            }
        } catch (error) {
            console.log("error in trims: ", error)
        } finally {
            setTrimLoading(false)
        }
    }

    const handleTrimEdit = async () => {
        try {
            setTrimLoading(true)
            // Use the categoryEdit hook to update the category
            const updated = await trimEdit(updateFormData, trimEditBox);
            if (updated.status) {
                fetchAllSetting(); // Refetch the data
                setTrimEditBox(null);
                setSubmitStatus(updated)
            } else {
                console.error('Failed to edit trim');
            }
        } catch (error) {
            console.log("error in trims editing : ", error)
            alert("Could not edit trim")
        } finally {
            setTrimLoading(false)
        }
    }

    const { deleteTrims } = useDeleteTrims();
    const handleDeleteTrimBox = async (name) => {
        const confirmed = window.confirm("Are you sure you want to delete this trim?");
        if (!confirmed) return;

        const deleted = await deleteTrims(name);
        await fetchAllSetting()
        setSubmitStatus(deleted)
    };
    // Trims Logic Over


    // Requirment Parameter Start
    const [parameterEditBox, setParameterEditBox] = useState(null);
    const [parameterLoading, setParameterLoading] = useState(false);

    const handleParameterEditBox = async () => {
        try {
            setParameterLoading(true)
            // Use the categoryEdit hook to update the category
            const updated = await parameterEdit(updateFormData, parameterEditBox);
            if (updated.status) {
                fetchAllSetting(); // Refetch the data
                setParameterEditBox(null)
                setSubmitStatus(updated)
            } else {
                console.error('Failed to edit parameter');
            }
        } catch (error) {
            console.log("error in Parameter: ", error)
        } finally {
            setParameterLoading(false)
        }
    }

    // Requirment Parameter Over



    // finishing Logic Start
    const [finishingEditBox, setFinishingEditBox] = useState(null);
    const [finishingLoading, setFinishingLoading] = useState(false);

    const handleFinishingEditBox = async () => {
        try {
            setFinishingLoading(true)
            // Use the categoryEdit hook to update the category
            const updated = await finishingEdit(updateFormData, finishingEditBox);
            if (updated.status) {
                fetchAllSetting(); // Refetch the data
                setFinishingEditBox(null)
                setSubmitStatus(updated)
            } else {
                console.error('Failed to edit finishing');
            }
        } catch (error) {
            console.log("error in finishing: ", error)
        } finally {
            setFinishingLoading(false)
        }
    }
    // finishing Logic Over


    // Fabric Logic Start
    const [editFabric, setEditFabric] = useState(null);
    const [addFabric, setAddFabric] = useState(null);
    const [loadingFabric, setLoadingFabric] = useState(false);
    const [fabricEditOldName, setFabricEditOldName] = useState(null);

    const handleEditFabric = async () => {
        try {
            setLoadingFabric(true)
            // Use the fabricEdit hook to update the fabric
            const updated = await fabricEdit(fabricEditOldName, editFabric);
            if (updated.status) {
                fetchAllSetting();
                setEditFabric(null)
                setSubmitStatus(updated)
            } else {
                console.error('Failed to edit fabric');
            }
        } catch (error) {
            console.log("error in fabric editing: ", error)
        } finally {
            setLoadingFabric(false)
        }
    };

    const handleDeleteFabric = async (fabric) => {
        // Use the fabricDelete hook to delete the fabric
        const deleted = await fabricDelete(fabric);
        if (deleted.status) {
            // Remove the deleted fabric from the state
            setFabrics((prevFabrics) => prevFabrics.filter((item) => item !== fabric));
        } else {
            console.error('Failed to delete fabric');
        }
    };

    const handleSaveNewFabric = async () => {
        try {
            setLoadingFabric(true);
            // Use the fabricAdd hook to add a new fabric
            const newFabric = await fabricAdd(addFabric);
            if (newFabric.status) {
                fetchAllSetting();
                setAddFabric(null)
                setSubmitStatus(newFabric)
            } else {
                console.error('Failed to add fabric');
            }
        } catch (error) {
            console.log("error in fabric creating: ", error)
        } finally {
            setLoadingFabric(false)
        }
    };
    // Fabric Logic Over


    // Collection Logic Start

    const [addCollection, setAddCollection] = useState(false);
    const [editCollection, setEditCollection] = useState(false);
    const [loadingCollection, setLoadingCollection] = useState(false);
    const [collectionEditOldName, setCollectionEditOldName] = useState(null);

    const handleEditCollection = async () => {
        if (editCollection && editCollection.trim() !== '') {
            setLoadingCollection(true);
            try {
                const updated = await collectionEdit(collectionEditOldName, editCollection);
                if (updated.status) {
                    await fetchAllSetting();
                    setAddCollection(false)
                    setSubmitStatus(updated)
                    window.location.reload();
                } else {
                    console.error('Failed to edit collection');
                    alert('Failed to update collection. Please try again.');
                }
            } catch (error) {
                console.error('Error editing collection:', error);
                alert('An error occurred while updating the collection.');
            } finally {
                setLoadingCollection(false);
            }
        }
    };

    const handleDeleteCollection = async (collection) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the collection "${collection}"?`
        );

        if (confirmDelete) {
            try {
                const deleted = await collectionDelete(collection);
                if (deleted.status) {
                    setCollections((prevCollections) =>
                        prevCollections.filter((item) => item !== collection)
                    );
                    window.location.reload();
                } else {
                    console.error('Failed to delete collection');
                    alert('Failed to delete collection. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting collection:', error);
                alert('An error occurred while deleting the collection.');
            } finally {
            }
        }
    };

    const handleSaveNewCollection = async () => {

        if (addCollection.trim() === '') {
            alert('Collection name cannot be empty.');
            setLoadingCollection(false);
            return;
        }

        try {
            setLoadingCollection(true);
            const newCollection = await collectionAdd(addCollection);
            if (newCollection.status) {
                await fetchAllSetting();
                setAddCollection(false)
                setSubmitStatus(newCollection)
                window.location.reload();
            } else {
                console.error('Failed to add collection');
                alert('Failed to add collection. Please try again.');
            }
        } catch (error) {
            console.error('Error adding collection:', error);
            alert('An error occurred while adding the collection.');
        } finally {
            setLoadingCollection(false);
        }
    };
    // Collection Logic Over

    return (
        <section className="container mx-auto">
            {submitStatus && (
                <div className={`fixed left-[50%] top-[10%] -translate-x-1/2 z-50 px-3 text-sm font-bold py-2 rounded-lg group shadow-xl text-white ${submitStatus.message == null ? "hidden" : "flex gap-x-4 justify-between items-center"} ${submitStatus?.status ? "bg-green-600" : "bg-red-600"}`}>
                    <span>{submitStatus?.message}</span>
                    <button
                        type="button"
                        className="hidden group-hover:flex items-center justify-center hover:scale-150 transition-all"
                        onClick={() => setSubmitStatus(initialUpdateFormData)}
                    >X</button>
                </div>
            )}

            {/* Category & Gender  */}
            <div className="border-b p-10 flex flex-col gap-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">Category</h1>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" className="underline" onClick={() => setCategoryAddBox(true)}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-x-4 flex-wrap">
                        {categories.map((cat) => (
                            <div
                                key={cat}
                                className="flex relative mb-4 group items-center border-2 rounded-xl px-4 py-5 text-center text-lg"
                            >
                                <input
                                    type="text"
                                    value={cat}
                                    readOnly={true}
                                    className="border-none text-center text-black outline-none"
                                />
                                <div className="hidden gap-1 group-hover:flex absolute right-0 bottom-0 ml-2 p-3">
                                    {/* Edit Button */}
                                    <button type="button" onClick={() => handleEditCategory(cat)}>
                                        <span><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z"
                                                stroke="#0C2F2F"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                stroke="#0C2F2F"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg></span>
                                    </button>

                                    {/* Delete Button */}
                                    <button type="button" onClick={() => {
                                        const confirmDelete = window.confirm(
                                            "Are you sure you want to delete this category?"
                                        );
                                        if (confirmDelete) {
                                            handleDeleteCategory(cat);
                                        }
                                    }}>
                                        <span><svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 13 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.625 3.54541H2.70833H11.375"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5.41602 6.5V10.0455"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7.58398 6.5V10.0455"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Category Popup */}
                    {categoryAddBox && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <form onSubmit={handleSaveNewCategory} className="bg-white p-6 rounded-lg">
                                <h3 className="mb-4">New Category</h3>
                                <input
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={addCategory}
                                    onChange={(e) => setAddCategory(e.target.value)}
                                    required
                                    className="p-2 rounded w-full mb-4"
                                />
                                <button
                                    onClick={() => setCategoryAddBox(false)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Category
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">Gender</h1>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" className="underline" onClick={() => setGenderAddBox(true)}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-x-4 flex-wrap">
                        {genders.map((gen) => {
                            return (
                                <div
                                    key={gen}
                                    className="flex relative mb-4 group items-center border-2 rounded-xl px-4 py-5 text-center text-lg"
                                >
                                    <input
                                        type="text"
                                        value={gen}
                                        readOnly={true}
                                        className="border-none text-center text-black outline-none"
                                    />
                                    <div className="hidden gap-1 group-hover:flex absolute right-0 bottom-0 ml-2 p-3">
                                        {/* Edit Button */}
                                        <button type="button" onClick={() => handleEditGender(gen)}>
                                            <span><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z"
                                                    stroke="#0C2F2F"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                    stroke="#0C2F2F"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg></span>
                                        </button>

                                        {/* Delete Button */}
                                        <button type="button" onClick={() => {
                                            const confirmDeleteGen = window.confirm(
                                                "Are you sure you want to delete this Gender?"
                                            );
                                            if (confirmDeleteGen) {
                                                handleDeleteGender(gen);
                                            }
                                        }}

                                        >
                                            <span><svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 13 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1.625 3.54541H2.70833H11.375"
                                                    stroke="black"
                                                    strokeWidth="0.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                    stroke="black"
                                                    strokeWidth="0.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M5.41602 6.5V10.0455"
                                                    stroke="black"
                                                    strokeWidth="0.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7.58398 6.5V10.0455"
                                                    stroke="black"
                                                    strokeWidth="0.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg></span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Gender Popup */}
                    {genderAddBox && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <form onSubmit={handleSaveNewGender} className="bg-white p-6 rounded-lg">
                                <h3 className="mb-4">New Gender</h3>
                                <input
                                    type="text"
                                    placeholder="Enter Gender Name"
                                    value={editedGender}
                                    onChange={(e) => setEditedGender(e.target.value)}
                                    required
                                    className="p-2 rounded w-full mb-4"
                                />
                                <button
                                    type="button"
                                    onClick={() => setGenderAddBox(false)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Category
                                </button>
                            </form>
                        </div>
                    )}
                </div>


            </div>

            {/* sizeChart */}
            <div className="border-b p-10 space-y-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <h1 className="font-bold text-xl">Size Chart</h1>
                        <div className="flex gap-5">
                            <button type="button" className="underline" onClick={handleAddOption}>Add</button>
                            {selectedOption && <button type="button" className="underline" onClick={handleDelete}>Delete</button>}
                            {selectedOption && <button type="button" className="underline" onClick={() => setIsEditing(true)}>Edit</button>}
                        </div>
                    </div>

                    <div className="w-full flex gap-5 items-start flex-col">
                        <div className="dropdown-container">
                            <select
                                className="custom-dropdown border border-gray-300 p-2 rounded"
                                name="sizeChart"
                                id="sizeChart"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                <option value="">Please select chart</option>
                                {sizecharts.map(item => item.name).map((option) => <option key={option} value={option}>{option}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center flex-wrap justify-center gap-8">
                            {sizecharts.find(item => item.name === selectedOption) ? (
                                sizecharts.find(item => item.name === selectedOption).images.map(img => (
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${img.src}`}
                                        alt={img.src}
                                        className="h-full object-fill border w-[200px]"
                                    />
                                )
                                )
                            ) : (
                                <p className="flex items-center justify-center border-2 w-[300px] h-[150px] text-gray-400 border-dashed border-gray-300 bg-[#FCFCFC]">No Image</p>
                            )}
                        </div>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}


                    {/* Modal for adding an option */}
                    {isAdding && (
                        <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                            <div className="bg-white p-6 pt-3 rounded shadow-lg overflow-scroll w-[50%] max-w-[1000px]">
                                <h2 className="text-xl mb-4">Add Size Chart</h2>
                                {/* Select Category */}
                                <div className="mb-3">
                                    <h3 className="mb-1">Select Category</h3>
                                    <div className="flex gap-5">
                                        {categories.map((cat) => (
                                            <div key={cat} className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={cat}
                                                    onChange={handleInputChange}
                                                    checked={formValues.category === cat}
                                                />
                                                <label className="text-nowrap">{cat}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Select Gender */}
                                <div className="mb-3">
                                    <h3 className="mb-1">Select Gender</h3>
                                    <div className="flex gap-5">
                                        {genders.map((gen) => (
                                            <div key={gen} className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={gen}
                                                    onChange={handleInputChange}
                                                    checked={formValues.gender === gen}
                                                />
                                                <label className="text-nowrap">{gen}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Option Name */}
                                <div className="flex flex-col">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        className="p-2 rounded mb-4 w-full border border-black outline outline-1"
                                        placeholder="Enter size chart name"
                                        disabled
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold">Images:</label>
                                    {formValues.images && formValues.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                alt={`${image.src}`}
                                                className="w-28 h-16 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                className="text-red-500 text-sm"
                                                onClick={() => {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        images: prev.images.filter((_, i) => i !== index),
                                                    }))
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="w-fit px-6 py-2 mb-4 border border-black" onClick={() => setOpenPopupId(`sizeChartBox`)}>Upload image</button>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        {loading ? 'Adding...' : 'Add Size Chart'}
                                    </button>
                                    <button
                                        onClick={handleCancelAddOption}
                                        className="border border-black px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                {/* Error Message */}
                                {error && <p className="text-red-500 mt-2">{error}</p>}

                                {/* Success Message */}
                                {success && <p className="text-green-500 mt-2">Size Chart added successfully!</p>}
                            </div>
                        </div>
                    )}

                    {/* Modal for editing a size Chart */}
                    {isEditing && (
                        <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                            <div className="bg-white p-6 pt-3 rounded shadow-lg h-[85vh] overflow-scroll w-[80%] max-w-[1000px]">
                                <div className="flex justify-between item-center mb-4  sticky z-50 top-[-24px] pt-5  left-0 bg-white">
                                    <h2 className="text-xl">Edit Size Chart</h2>
                                    {/* Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={handleEditOption}
                                            className="bg-black text-white px-4 py-2 rounded-lg"
                                        >
                                            {loading ? 'Updating...' : 'Update Size Chart'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="border border-black px-4 py-2 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                {/* Name Input */}
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    className="outline p-2 rounded mb-4 w-full border"
                                    placeholder="Enter updated size chart name"
                                    disabled
                                />

                                {/* Category Radio Buttons */}
                                <div className="mb-4 hidden">
                                    <h3>Select Category</h3>
                                    <div className="flex gap-5">
                                        {categories.map((cat) => (
                                            <div key={cat} className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={cat}
                                                    onChange={handleInputChange}
                                                    checked={formValues.category === cat}
                                                />
                                                <label className="text-nowrap">{cat}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gender Radio Buttons */}
                                <div className="mb-4 hidden">
                                    <h3>Select Gender</h3>
                                    <div className="flex gap-5">
                                        {genders.map((gen) => (
                                            <div key={gen} className="flex gap-2 items-center">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={gen}
                                                    onChange={handleInputChange}
                                                    checked={formValues.gender === gen}
                                                />
                                                <label className="text-nowrap">{gen}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold">Images:</label>
                                    {formValues.images && formValues.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                alt={`${image.src}`}
                                                className="w-28 h-16 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                className="text-red-500 text-sm"
                                                onClick={() => {
                                                    setFormValues((prev) => ({
                                                        ...prev,
                                                        images: prev.images.filter((_, i) => i !== index),
                                                    }))
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="w-fit py-2 px-6 mb-4 border border-black" onClick={() => setOpenPopupId(`sizeChartBox`)}>Upload image</button>
                                </div>
                                <div className="flex gap-4 my-5 items-center">
                                    {update ?
                                        <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black bg-black`} onClick={() => setUpdate(false)}></div>
                                        :
                                        <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black bg-white`} onClick={() => setUpdate(true)}></div>
                                    }
                                    <span>Update In all the tackpacks including previous one</span>
                                </div>
                                {update && <UpdateForm field="sizeChart" updateFormData={updateFormData} setUpdateFormFData={setUpdateFormFData} genders={genders} categories={categories} selectedSizeCategory={formValues.category} selectedSizeGender={formValues.gender} techpacks={techpacks} />}

                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Construction Sheet */}
            <div className="border-b p-10 space-y-10">
                <div>
                    <h1 className="font-bold text-xl mb-4">Construction Sheet</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {construction.map((box) => {
                            return (
                                <div key={box.id} className="p-4 border border-gray-400">
                                    <div className="flex justify-between items-center pb-2">
                                        <h1 className="text-xl text-center">{box.name}</h1>
                                        <button type="button" className="text-gray-600 hover:text-black" onClick={() => setConstructionSheetEditBox(box)}>
                                            Edit
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {box.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}` || "default.jpg"}
                                                alt={`${image.src}`}
                                                className="w-24 h-20 object-cover bg-[#FCFCFC] border border-dashed border-[#CACACA] rounded"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {constructionSheetEditBox && (
                        <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 pt-3 rounded shadow-md h-[85vh] overflow-scroll w-[80%] max-w-[1000px]">
                                <div className="flex items-center justify-between  mb-4  sticky z-50 top-[-24px] pt-5  left-0 bg-white">
                                    <h2 className="text-lg font-bold">Edit Construction Sheet</h2>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 border text-black rounded-lg text-sm"
                                            onClick={() => setConstructionSheetEditBox(null)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                            onClick={handleConstructionSheetEdit}
                                            disabled={constructionSheetLoading}
                                        >
                                            {constructionSheetLoading ? "Saving..." : "Save"}
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={constructionSheetEditBox.name}
                                    className="w-full p-2 border bg-slate-100 rounded mb-4"
                                    disabled
                                />
                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold">Images:</label>
                                    {constructionSheetEditBox.images && constructionSheetEditBox.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                alt={`${image.src}`}
                                                className="w-28 h-16 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                className="text-red-500 text-sm"
                                                onClick={() => {
                                                    setConstructionSheetEditBox((prev) => ({
                                                        ...prev,
                                                        images: prev.images.filter((_, i) => i !== index),
                                                    }))
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="w-fit py-2 px-6 mb-4 border border-black" onClick={() => setOpenPopupId(`constructionSheetEditBox`)}>Upload image</button>
                                </div>
                                {error && console.error('Error:', error)}
                                {error && <p className="text-red-500 mb-2">{error}</p>}
                                <div className="flex gap-4 my-5 items-center">
                                    {update ?
                                        <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black bg-black`} onClick={() => setUpdate(false)}></div>
                                        :
                                        <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black bg-white`} onClick={() => setUpdate(true)}></div>
                                    }
                                    <span className="mt-1">Update In all the tackpacks including previous one</span>
                                </div>
                                {update && <UpdateForm field="constructionSheet" updateFormData={updateFormData} setUpdateFormFData={setUpdateFormFData} genders={genders} categories={categories} selectedConstruction={constructionSheetEditBox.name} techpacks={techpacks} />}

                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* Trims */}
            <div className="border-b p-10 space-y-10">
                <div>
                    <div>
                        <div className="flex gap-10 items-center pb-5">
                            <div>
                                <h1 className="font-bold text-2xl">Trims</h1>
                            </div>
                            <div className="flex gap-3">
                                <button type="button" className="underline" onClick={() => setTrimAddBox(true)}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap gap-3">
                            {trims.map(trim => {
                                return (
                                    <div key={trim._id} className="p-4 border border-gray-400 w-[30%] group">
                                        <div className="flex justify-between items-center pb-2">
                                            <h1 className="text-base whitespace-nowrap">{trim.name}</h1>
                                            <div className="hidden gap-2 group-hover:flex">
                                                <button type="button" onClick={() => setTrimEditBox(trim)}> <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z"
                                                        stroke="#0C2F2F"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                        stroke="#0C2F2F"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg></button>
                                                <button type="button" onClick={() => handleDeleteTrimBox(trim.name)}><svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 13 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.625 3.54541H2.70833H11.375"
                                                        stroke="black"
                                                        strokeWidth="0.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                        stroke="black"
                                                        strokeWidth="0.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M5.41602 6.5V10.0455"
                                                        stroke="black"
                                                        strokeWidth="0.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M7.58398 6.5V10.0455"
                                                        stroke="black"
                                                        strokeWidth="0.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg></button>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 w-fit">
                                            {Array.isArray(trim.images)
                                                ? trim.images.map((image, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                            alt={`${image.src}`}
                                                            className="w-24 h-20 object-cover bg-[#FCFCFC] border border-dashed border-[#CACACA] rounded"
                                                        />
                                                    </div>
                                                ))
                                                : trim.images && (
                                                    <div className="relative">
                                                        <img
                                                            src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${trim.images.src}`}
                                                            alt={`${trim.images.src}`}
                                                            className="w-24 h-20 object-cover bg-[#FCFCFC] border border-dashed border-[#CACACA] rounded"
                                                        />
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                )
                            })}

                        </div>


                        {/* Popup Modal */}
                        {trimEditBox && (
                            <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 pt-3 rounded shadow-md h-[85vh] overflow-scroll w-[80%] max-w-[1000px]">
                                    <div className="flex items-center justify-between mb-4  sticky z-50 top-[-24px] pt-5  left-0 bg-white">
                                        <h2 className="text-lg font-bold">Edit Trims</h2>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                className="px-4 py-2 border text-black rounded-lg text-sm"
                                                onClick={() => setTrimEditBox(null)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                                onClick={handleTrimEdit}
                                                disabled={trimLoading}
                                            >
                                                {trimLoading ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="my-4 w-full flex items-center gap-4">
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            value={trimEditBox.name}
                                            className="w-1/2 p-2 border bg-slate-100 rounded"
                                            // onChange={(e) => setTrimEditBox((prev) => ({ ...prev, "name": e.target.value }))}
                                            disabled
                                        />
                                        <span>as</span>
                                        <input
                                            type="text"
                                            value={trimEditBox.displayName}
                                            placeholder={trimEditBox.name}
                                            className="w-1/2 p-2 border bg-slate-100 rounded"
                                            onChange={(e) => setTrimEditBox((prev) => ({ ...prev, "displayName": e.target.value }))}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">Images:</label>
                                        {trimEditBox.images?.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                    alt={`${image.src}`}
                                                    className="w-28 h-16 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    className="text-red-500 text-sm"
                                                    onClick={() => {
                                                        setTrimEditBox((prev) => ({
                                                            ...prev,
                                                            images: prev.images.filter((_, i) => i !== index),
                                                        }))
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="w-fit px-6 py-2 mb-4 border border-black"
                                            onClick={() => setOpenPopupId(`trimEditBox`)}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                    <div className="flex gap-4 my-5 items-center">
                                        {update ?
                                            <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black bg-black`} onClick={() => setUpdate(false)}></div>
                                            :
                                            <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black bg-white`} onClick={() => setUpdate(true)}></div>
                                        }
                                        <span>Update In all the tackpacks including previous one</span>
                                    </div>
                                    {update && <UpdateForm field="trims" updateFormData={updateFormData} setUpdateFormFData={setUpdateFormFData} genders={genders} categories={categories} techpacks={techpacks} />}

                                </div>
                            </div>
                        )}

                        {/* Popup Modal */}
                        {trimAddBox && (
                            <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 pt-3 rounded shadow-md h-[85vh] overflow-scroll w-[80%] max-w-[1000px]">
                                    <div className="flex items-center justify-between mb-4  sticky z-50 top-[-24px] pt-5 pb-2 left-0 bg-white">
                                        <h2 className="text-lg font-bold mb-4">Add New Trims</h2>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                className="px-4 py-2 border text-black rounded-lg text-sm"
                                                onClick={() => setTrimAddBox(null)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                                onClick={handleTrimAdd}
                                                disabled={trimLoading}
                                            >
                                                {trimLoading ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="my-4 w-full flex items-center gap-4">
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            value={trimAddBox.name}
                                            className="w-1/2 p-2 border bg-slate-100 rounded"
                                            onChange={(e) => setTrimAddBox((prev) => ({ ...prev, name: e.target.value }))}                                            
                                        />
                                        <span>as</span>
                                        <input
                                            type="text"
                                            value={trimAddBox.displayName}
                                            placeholder={trimAddBox.name}
                                            className="w-1/2 p-2 border bg-slate-100 rounded"
                                            onChange={(e) => setTrimEditBox((prev) => ({ ...prev, "displayName": e.target.value }))}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">Images:</label>
                                        {trimAddBox.images?.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                    alt={`${image.src}`}
                                                    className="w-28 h-16 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    className="text-red-500 text-sm"
                                                    onClick={() => {
                                                        setTrimAddBox((prev) => ({
                                                            ...prev,
                                                            images: prev.images.filter((_, i) => i !== index),
                                                        }))
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="w-fit px-6 py-2 mb-4 border border-black"
                                            onClick={() => setOpenPopupId(`trimAddBox`)}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                    <div className="flex gap-4 my-5 items-center">
                                        {update ?
                                            <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid]  outline-black bg-black`} onClick={() => setUpdate(false)}></div>
                                            :
                                            <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black bg-white`} onClick={() => setUpdate(true)}></div>
                                        }
                                        <span>Update In all the tackpacks including previous one</span>
                                    </div>
                                    {update && <UpdateForm field="trims" updateFormData={updateFormData} setUpdateFormFData={setUpdateFormFData} genders={genders} categories={categories} techpacks={techpacks} />}

                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Required Parameters */}
            <div className="border-b p-10 space-y-10">
                <div>
                    <div className="flex gap-10">
                        <div>
                            <h1 className="font-bold text-xl">Required Parameters</h1>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {requirements.map((requirement) => (
                                <div key={requirement._id} className="p-4 border border-gray-400 w-[30%]">
                                    {/* Item Header */}
                                    <div className="flex gap-10 items-center justify-between pb-2">
                                        <h1 className="text-base text-center mb-3">{requirement.name}</h1>
                                        <button type="button" onClick={() => setParameterEditBox(requirement)}>
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z"
                                                    stroke="#0C2F2F"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                    stroke="#0C2F2F"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Images Grid */}
                                    <div className="flex flex-wrap gap-2 w-fit">
                                        {requirement.images && requirement.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}` || 'default.jpg'}
                                                alt={`${image.src}`}
                                                className="h-24 w-24 object-cover border-2"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Popup Modal */}
                        {parameterEditBox && (
                            <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 pt-3 rounded shadow-md h-[85vh] overflow-scroll w-[80%] max-w-[1000px]">
                                    <div className="mb-4 flex justify-between items-center  sticky z-50 top-[-24px] pt-5  left-0 bg-white">
                                        <h2 className="text-lg font-bold">Edit Parameter</h2>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="px-4 py-2 border text-black rounded-lg text-sm"
                                                onClick={() => setParameterEditBox(null)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                                onClick={handleParameterEditBox}
                                                disabled={parameterLoading}
                                            >
                                                {parameterLoading ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={parameterEditBox.name}
                                        className="w-full p-2 border bg-slate-100 rounded mb-4"
                                        disabled
                                    />
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">Images:</label>
                                        {(parameterEditBox.images && parameterEditBox.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                            >
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                    alt={`${image.src}`}
                                                    className="w-28 h-16 object-cover rounded"
                                                />
                                                <button
                                                    className="text-red-500 text-sm"
                                                    type="button"
                                                    onClick={() => {
                                                        setParameterEditBox((prev) => ({
                                                            ...prev,
                                                            images: prev.images.filter((_, i) => i !== index),
                                                        }))
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )))}
                                        <button
                                            type="button"
                                            className="w-fit px-6 py-2 mb-4 border border-black"
                                            onClick={() => setOpenPopupId(`parameterEditBox`)}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                    <div className="flex gap-4 my-5 items-center">
                                        <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black ${update ? 'bg-black' : 'bg-white'}`} onClick={() => setUpdate(!update)}></div>
                                        <span>Update In all the tackpacks including previous one</span>
                                    </div>
                                    {update && <UpdateForm field="parameter" updateFormData={updateFormData} setUpdateFormFData={setUpdateFormFData} genders={genders} categories={categories} selectedParameter={parameterEditBox.name} techpacks={techpacks} />}

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* finishing */}
            <div className="border-b p-10 space-y-10">
                <div>
                    <div className="flex gap-10">
                        <div>
                            <h1 className="font-bold text-xl">Finishing</h1>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {finishing.map((item) => (
                                <div key={item._id} className="p-4 border border-gray-400 w-[30%]">
                                    <div className="flex gap-10 items-center justify-between pb-2">
                                        <h1 className="text-xl text-center mb-3">{item.name}</h1>
                                        <button type="button" onClick={() => setFinishingEditBox(item)}>
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z"
                                                    stroke="#0C2F2F"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                    stroke="#0C2F2F"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Display images in grid */}
                                    <div className="flex flex-wrap gap-2">
                                        {(item.images && item.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                alt={`${image.src}`}
                                                className="h-24 w-24 object-cover border-2"
                                            />
                                        )))}
                                    </div>

                                </div>
                            ))}
                        </div>
                        {/* Popup Modal */}
                        {finishingEditBox && (
                            <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 pt-3 rounded shadow-md h-[85vh] overflow-scroll w-[80%] max-w-[1000px]">
                                    <div className="mb-4 flex justify-between items-center sticky z-50 top-[-24px] pt-5  left-0 w-full bg-white">
                                        <h2 className="text-lg font-bold mb-4">Edit Finishing</h2>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                type="button"
                                                className="px-4 py-2 border text-black rounded-lg text-sm"
                                                onClick={() => setFinishingEditBox(null)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                                onClick={handleFinishingEditBox}
                                                disabled={finishingLoading}
                                            >
                                                {finishingLoading ? "Saving..." : "Save"}
                                            </button>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={finishingEditBox.name}
                                        className="w-full p-2 border bg-slate-100 rounded mb-4"
                                        disabled
                                    />
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">Images:</label>
                                        {(finishingEditBox.images && finishingEditBox.images.map((image, index) => (
                                            <div key={index} className="flex items-center justify-between gap-2 mb-2 border p-2 rounded">
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                    alt={`${image.src}`}
                                                    className="w-28 h-16 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    className="text-red-500 text-sm"
                                                    onClick={() => {
                                                        setFinishingEditBox((prev) => ({
                                                            ...prev,
                                                            images: prev.images.filter((_, i) => i !== index),
                                                        }))
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )))}
                                        <button
                                            type="button"
                                            className="w-fit px-6 py-2 mb-4 border border-black"
                                            onClick={() => setOpenPopupId(`finishingEditBox`)}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                    <div className="flex gap-4 my-5 items-center">
                                        <div className={`rounded-full aspect-square size-[15px] outline-1 [outline-style:solid] outline-black ${update ? 'bg-black' : 'bg-white'}`} onClick={() => setUpdate(!update)}></div>
                                        <span>Update In all the tackpacks including previous one</span>
                                    </div>
                                    {update && <UpdateForm field="finishing" updateFormData={updateFormData} setUpdateFormFData={setUpdateFormFData} genders={genders} categories={categories} selectedFinishing={finishingEditBox.name} techpacks={techpacks} />}

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fabric */}
            <div className="border-b p-10 flex flex-col gap-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">Fabric</h1>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" className="underline" onClick={() => setAddFabric("Fabric")}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-x-4 flex-wrap">
                        {fabrics.map((fabric) => (
                            <div
                                key={fabric}
                                className="flex w-1/4 mb-4 items-center border-2 rounded-xl px-4 py-5 text-center text-lg"
                            >
                                <textarea
                                    value={fabric}
                                    readOnly={true}
                                    rows={5} // Allows for 2-3 lines
                                    className="border-none w-full text-sm text-center text-black outline-none resize-none"
                                />
                                <div className="gap-4 ml-3 flex flex-col border bg-white py-2 px-3">
                                    {/* Edit Button */}
                                    <button type="button" onClick={() => { setEditFabric(fabric); setFabricEditOldName(fabric) }}>
                                        <span><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z"
                                                stroke="#0C2F2F"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                stroke="#0C2F2F"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg></span>
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const confirmDelete = window.confirm(
                                                'Are you sure you want to delete this fabric?'
                                            );
                                            if (confirmDelete) {
                                                handleDeleteFabric(fabric);
                                            }
                                        }}
                                    >
                                        <span><svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 13 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.625 3.54541H2.70833H11.375"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5.41602 6.5V10.0455"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7.58398 6.5V10.0455"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fabric add Popup */}
                    {addFabric && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg w-[80%] max-w-[1000px]">
                                <h3 className="mb-4">New Fabric</h3>
                                <textarea
                                    placeholder="Enter Fabric Name"
                                    value={addFabric}
                                    onChange={(e) => setAddFabric(e.target.value)}
                                    required
                                    rows={3}
                                    className="p-2  rounded w-full mb-4 resize-none border border-black"
                                />
                                <button
                                    type="button"
                                    onClick={() => setAddFabric(null)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={loadingFabric}
                                    onClick={handleSaveNewFabric}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Fabric
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Fabric edit Popup */}
                    {editFabric && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg overflow-scroll w-[80%] max-w-[1000px]">
                                <h3 className="mb-4">Edit Fabric</h3>
                                <textarea
                                    placeholder="Enter Fabric Name"
                                    value={editFabric}
                                    onChange={(e) => setEditFabric(e.target.value)}
                                    required
                                    rows={3}
                                    className="p-2  rounded w-full mb-4 resize-none border border-black"
                                />

                                <button
                                    type="button"
                                    onClick={() => setEditFabric(null)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={loadingFabric}
                                    onClick={handleEditFabric}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Fabric
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* collection */}
            <div className="border-b p-10 flex flex-col gap-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <h1 className="font-bold text-xl">Collection</h1>
                        <button
                            type="button"
                            className="underline"
                            onClick={() => setAddCollection("collection")}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex gap-x-4 flex-wrap">
                        {collections.map((collection) => (
                            <div
                                key={collection}
                                className="flex w-1/4 relative mb-4 group items-center border-2 rounded-xl px-4 py-5 text-center text-lg"
                            >
                                <textarea
                                    value={collection}
                                    readOnly
                                    rows={1}
                                    className="border-none w-full text-sm text-center text-black outline-none resize-none"
                                />
                                <div className="hidden gap-1 group-hover:flex absolute right-0 bottom-0 ml-2 p-3">
                                    {/* Edit Button */}
                                    <button type="button" onClick={() => { setEditCollection(collection); setCollectionEditOldName(collection) }}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z"
                                                stroke="#0C2F2F"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                stroke="#0C2F2F"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this collection?')) {
                                                handleDeleteCollection(collection);
                                            }
                                        }}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 13 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.625 3.54541H2.70833H11.375"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5.41602 6.5V10.0455"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M7.58398 6.5V10.0455"
                                                stroke="black"
                                                strokeWidth="0.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Collection add Popup */}
                    {addCollection && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg overflow-scroll w-[90%] max-w-[500px]">
                                <h3 className="mb-4">New Collection</h3>
                                <textarea
                                    placeholder="Enter Collection Name"
                                    value={addCollection}
                                    onChange={(e) => setAddCollection(e.target.value)}
                                    required
                                    rows={1}
                                    className="p-2 rounded w-full mb-4 resize-none border"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setAddCollection(false)}
                                        className="border px-4 text-sm py-2 rounded-lg mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveNewCollection}
                                        disabled={loadingCollection}
                                        className="bg-black text-white text-sm px-4 py-2 rounded-lg"
                                    >
                                        {loadingCollection ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Collection edit Popup */}
                    {editCollection && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg">
                                <h3 className="mb-4">Edit Collection</h3>
                                <textarea
                                    placeholder="Enter Collection Name"
                                    value={editCollection}
                                    onChange={(e) => setEditCollection(e.target.value)}
                                    required
                                    rows={1}
                                    className="p-2 rounded w-full mb-4 resize-none border"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setEditCollection(false)}
                                        className="border px-4 text-sm py-2 rounded-lg mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleEditCollection}
                                        disabled={loadingCollection}
                                        className="bg-black text-white text-sm px-4 py-2 rounded-lg"
                                    >
                                        {loadingCollection ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {["sizeChartBox", "constructionSheetEditBox", "parameterEditBox", "finishingEditBox", "trimEditBox", "trimAddBox"].map(elem => {
                return <ImageSelectorPopup
                    key={elem}
                    isOpen={openPopupId === elem}
                    closeModal={() => setOpenPopupId(null)}
                    onImageSelect={(imgName) => {
                        if (elem === "sizeChartBox") {
                            setFormValues((prev) => ({
                                ...prev,
                                images: prev.images ? [...prev.images, { "position": prev.images.length.toString(), "src": imgName }] : [{ "position": 0, "src": imgName }],
                            }));
                        } else if (elem === "constructionSheetEditBox") {
                            setConstructionSheetEditBox((prev) => ({
                                ...prev,
                                images: [...prev.images, { "position": 0, "src": imgName }],
                            }));
                        } else if (elem === "parameterEditBox") {
                            setParameterEditBox((prev) => ({
                                ...prev,
                                images: prev.images ? [...prev.images, { "position": 0, "src": imgName }] : [{ "position": 0, "src": imgName }],
                            }));
                        } else if (elem === "finishingEditBox") {
                            setFinishingEditBox((prev) => ({
                                ...prev,
                                images: prev.images ? [...prev.images, { "position": 0, "src": imgName }] : [{ "position": 0, "src": imgName }],
                            }));
                        } else if (elem === "trimEditBox") {
                            setTrimEditBox((prev) => ({
                                ...prev,
                                images: [...prev.images, { "position": prev.images.length.toString(), "src": imgName }],
                            }));
                        } else if (elem === "trimAddBox") {
                            setTrimAddBox((prev) => ({
                                ...prev,
                                images: [{ "position": prev.images ? prev.images.length.toString() : 0, "src": imgName }],
                            }));
                        }
                    }}
                />
            })}

        </section >
    );
};

const UpdateForm = ({ field, updateFormData, setUpdateFormFData, genders, categories, selectedSizeGender, selectedSizeCategory, techpacks, selectedConstruction, selectedFinishing, selectedParameter }) => {

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setUpdateFormFData((prev) => {
            const updatedCategories = prev.categories.includes(newCategory)
                ? prev.categories.filter((cat) => cat !== newCategory)  // Remove if already selected
                : [...prev.categories, newCategory];  // Add if not selected
            return { ...prev, categories: updatedCategories };
        });
    };

    const handleGenderChange = (e) => {
        const newGender = e.target.value;
        setUpdateFormFData((prev) => {
            const updatedGenders = prev.genders.includes(newGender)
                ? prev.genders.filter((gen) => gen !== newGender)  // Remove if already selected
                : [...prev.genders, newGender];  // Add if not selected
            return { ...prev, genders: updatedGenders };
        });
    };

    const handleStyleNoChange = (e) => {
        const newStyleNo = e.target.value;
        setUpdateFormFData((prev) => {
            const updatedStyleNo = prev.styleNo.includes(newStyleNo)
                ? prev.styleNo.filter((tp) => tp !== newStyleNo)
                : [...prev.styleNo, newStyleNo];
            return { ...prev, styleNo: updatedStyleNo };
        });
    };


    // search logic 
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBySearch = techpacks.filter(techpack =>
        techpack.styleNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        techpack.designer?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // filter logic
    const [selectedDesigner, setSelectedDesigner] = useState([]); // Array to hold selected designers
    const [selectedGender, setSelectedGender] = useState(""); // State for gender filter
    const [selectedCategory, setSelectedCategory] = useState(""); // State for gender filter
    const [showDesignerOptions, setShowDesignerOptions] = useState(false); // State to control visibility of designer options
    const [showGenderOptions, setShowGenderOptions] = useState(false); // State to control visibility of designer options
    const [showCategoryOptions, setShowCategoryOptions] = useState(false); // State to control visibility of designer options

    const uniqueDesigners = Array.from(new Set(filteredBySearch.map(item => item.designer)));
    const uniqueGenders = Array.from(new Set(filteredBySearch.map(item => item.gender)));
    const uniqueCategory = Array.from(new Set(filteredBySearch.map(item => item.category)));

    // Filter data based on selected designer and gender
    const filteredData = filteredBySearch.filter(item => {
        const isDesignerSelected = selectedDesigner.length === 0 || selectedDesigner.includes(item.designer);
        const isGenderSelected = selectedGender.length === 0 || selectedGender.includes(item.gender);
        const isCategorySelected = selectedCategory.length === 0 || selectedCategory.includes(item.category);
        return isDesignerSelected && isGenderSelected && isCategorySelected;
    });
    useEffect(() => {
        // Set default values from selectedSizeGender and selectedSizeCategory
        if (selectedSizeGender) {
            setSelectedGender([selectedSizeGender]); // Ensure it's in an array
        }
        if (selectedSizeCategory) {
            setSelectedCategory([selectedSizeCategory]); // Ensure it's in an array
        }
        if (selectedConstruction) {
            setSelectedCategory([selectedConstruction]); // Ensure it's in an array
        }
        if (selectedFinishing) {
            setSelectedCategory([selectedFinishing]); // Ensure it's in an array
        }
        if (selectedParameter) {
            setSelectedCategory([selectedParameter]); // Ensure it's in an array
        }
    }, [selectedSizeGender, selectedSizeCategory, selectedConstruction, selectedFinishing, selectedParameter]); // Runs when these values change

    // Add this function to handle the "Check All" button click
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Select all checkboxes
            setUpdateFormFData(prev => ({
                ...prev,
                styleNo: filteredData.map(techpack => techpack.styleNo)
            }));
        } else {
            // Deselect all checkboxes
            setUpdateFormFData(prev => ({
                ...prev,
                styleNo: []
            }));
        }
    };


    const handleSelectAllCategories = (event) => {
        setUpdateFormFData(prev => ({
            ...prev,
            categories: event.target.checked ? categories : []
        }));
    };

    const handleSelectAllGenders = (event) => {
        setUpdateFormFData(prev => ({
            ...prev,
            genders: event.target.checked ? genders : []
        }));
    };


    return (
        <div className="p-6 pt-4">
            {["trims"].includes(field) &&
                <div className="mb-7">
                    <div className="flex gap-3 items-center justify-start mb-2">
                        <h3 className="font-semibold">Select Category</h3>
                        <div>
                            <input
                                type="checkbox"
                                onChange={handleSelectAllCategories}
                                checked={updateFormData.categories.length === categories.length && categories.length > 0}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 flex-wrap">
                        {categories.map((cat) => (
                            <div key={cat} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    value={cat}
                                    onChange={handleCategoryChange}
                                    checked={updateFormData.categories.includes(cat)}
                                    className=""
                                />
                                <label className="text-sm">{cat}</label>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {["constructionSheet", "parameter", "finishing", "trims"].includes(field) &&
                <div className="mb-7">
                    <div className="flex gap-3 items-center justify-start mb-2">
                        <h3 className="font-semibold">Select Gender</h3>
                        <input
                            type="checkbox"
                            onChange={handleSelectAllGenders}
                            checked={updateFormData.genders.length === genders.length && genders.length > 0}
                        />
                    </div>
                    <div className="flex gap-5">
                        {genders.map((gen) => (
                            <div key={gen} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    value={gen}
                                    onChange={handleGenderChange}
                                    checked={updateFormData.genders.includes(gen)}
                                />
                                <label className="text-nowrap">{gen}</label>
                            </div>
                        ))}
                    </div>
                </div>
            }

            <div className='w-full flex gap-10 my-5'>
                <div className="flex flex-col w-full gap-2">
                    <span>Search</span>
                    <div className="border bg-white border-black px-1 md:px-[7px] h-8 md:h-8 flex justify-start">
                        <input
                            type="text"
                            placeholder="Enter Techpack Id or Name"
                            value={searchTerm}
                            onChange={handleSearch} // Ensure state update
                            className="w-full"
                        />
                    </div>
                </div>
                <div className='flex flex-col w-1/2 gap-2'>
                    <span>Designer</span>
                    <div className="border bg-white border-black px-2  h-auto flex flex-col">
                        <button
                            type="button"
                            className="w-full text-left py-1"
                            onClick={() => setShowDesignerOptions(!showDesignerOptions)}
                        >
                            {selectedDesigner.length > 0 ? `${selectedDesigner.length} Selected` : 'All Designers'}
                        </button>

                        {showDesignerOptions && (
                            <div className="flex flex-col space-y-2 mt-2">
                                {uniqueDesigners.map((designer, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id={`designer-${index}`}
                                            value={designer}
                                            checked={selectedDesigner.includes(designer)}
                                            onChange={(e) => {
                                                const { value, checked } = e.target;
                                                if (checked) {
                                                    setSelectedDesigner((prev) => [...prev, value]);
                                                } else {
                                                    setSelectedDesigner((prev) =>
                                                        prev.filter((designer) => designer !== value)
                                                    );
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`designer-${index}`}>{designer}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {["constructionSheet", "parameter", "finishing", "trims"].includes(field) &&
                    <div className='flex flex-col gap-2 w-1/2'>
                        <span>Gender</span>
                        <div className="border bg-white border-black px-2 h-auto flex flex-col">
                            <button
                                type="button"
                                className="w-full text-left py-1"
                                onClick={() => setShowGenderOptions(!showGenderOptions)}
                            >
                                Select Gender
                            </button>

                            {showGenderOptions && (
                                <div className="flex flex-col space-y-2 mt-2">
                                    {uniqueGenders.map((gender, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id={`gender-${index}`}
                                                value={gender}
                                                checked={
                                                    selectedGender.includes(gender) || selectedSizeGender === gender
                                                }
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    if (checked) {
                                                        setSelectedGender((prev) => [...prev, value]);
                                                    } else {
                                                        setSelectedGender((prev) =>
                                                            prev.filter((g) => g !== value)
                                                        );
                                                    }
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`gender-${index}`}>{gender}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>}
                {["trims"].includes(field) &&
                    <div className='flex flex-col gap-2 w-1/2'>
                        <span>Category</span>
                        <div className="border bg-white border-black px-2 h-auto flex flex-col">
                            <button
                                type="button"
                                className="w-full text-left py-1"
                                onClick={() => setShowCategoryOptions(!showCategoryOptions)}
                            >
                                Select Category
                            </button>

                            {showCategoryOptions && (
                                <div className="flex flex-col space-y-2 mt-2">
                                    {uniqueCategory.map((category, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id={`category-${index}`}
                                                value={category}
                                                checked={
                                                    selectedCategory.includes(category) || selectedSizeCategory === category
                                                }
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    if (checked) {
                                                        setSelectedCategory((prev) => [...prev, value]);
                                                    } else {
                                                        setSelectedCategory((prev) =>
                                                            prev.filter((c) => c !== value)
                                                        );
                                                    }
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`category-${index}`}>{category}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>}
            </div>

            {["constructionSheet", "parameter", "finishing", "trims", "sizeChart"].includes(field) &&
                <>
                    <h1>Total {filteredData?.length} Tech Packs</h1>
                    <table className='techPack-table'>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        className="size-5 p-1"
                                        onChange={handleSelectAll}
                                        checked={updateFormData.styleNo.length === filteredData.length && filteredData.length > 0}
                                    />
                                </th>
                                <th>Style No</th>
                                <th>Gender</th>
                                <th>Category</th>
                                <th>Designer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((techpack) => (
                                <tr key={techpack._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="size-5"
                                            value={techpack.styleNo}
                                            onChange={handleStyleNoChange}
                                            checked={updateFormData.styleNo.includes(techpack.styleNo)}
                                        />
                                    </td>
                                    <td className="text-nowrap">{techpack.styleNo}</td>
                                    <td className="text-nowrap">{techpack.gender}</td>
                                    <td className="text-nowrap">{techpack.category}</td>
                                    <td className="text-nowrap">{techpack.designer}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}