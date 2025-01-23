import { useState, useEffect } from "react";
import { LiaSaveSolid } from "react-icons/lia";
import { fetchAll, categoryAdd, categoryEdit, categoryDelete, genderAdd, genderEdit, genderDelete, trimAdd, useAddSizeChart, useDeleteSizeChart, useEditSizeChart, useDeleteTrims, fabricEdit, fabricAdd, fabricDelete, collectionEdit, collectionAdd, collectionDelete } from "../API/TechPacks";

export default function Setting() {

    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);
    const [sizecharts, setSizeCharts] = useState([]);
    const [construction, setConstructionSheets] = useState([]);
    const [trims, setTrims] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [finishing, setFinishing] = useState([]);
    const [collections, setCollections] = useState([]);
    const [fabrics, setFabrics] = useState([]);

    useEffect(() => {
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
        fetchAllSetting();
    }, []);

    console.log("collection", collections)
    // Category
    const [editedCategory, setEditedCategory] = useState('');
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddCategory = async () => {
        setShowCategoryPopup(true);
    };

    const handleEditCategory = async (cat) => {
        const newCategoryName = prompt('Enter the new category name:', cat);
        if (newCategoryName && newCategoryName !== cat) {
            // Use the categoryEdit hook to update the category
            const updated = await categoryEdit(cat, newCategoryName);
            if (updated.status) {
                // Update the state with the new category
                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category === cat ? newCategoryName : category
                    )
                );
            } else {
                console.error('Failed to edit category');
            }
        }
    };

    const handleDeleteCategory = async (cat) => {
        // Use the categoryDelete hook to delete the category
        const deleted = await categoryDelete(cat);
        if (deleted.status) {
            // Remove the deleted category from the state
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category !== cat)
            );
        } else {
            console.error('Failed to delete category');
        }
    };

    const handleSaveNewCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Use the categoryAdd hook to add a new category
        const newCategory = await categoryAdd(editedCategory);
        if (newCategory.status) {
            setCategories((prevCategories) => [...prevCategories, editedCategory]);
            setEditedCategory('');
            setShowCategoryPopup(false);
        } else {
            console.error('Failed to add category');
        }
        setLoading(false);
    };

    // ----------------------------------

    const [editedGender, setEditedGender] = useState('');
    const [showGenderPopup, setShowGenderPopup] = useState(false);

    const handleAddGender = async () => {
        setShowGenderPopup(true);
    };

    const handleEditGender = async (gen) => {
        const newGenderName = prompt('Enter the new gender name:', gen);
        if (newGenderName && newGenderName !== gen) {
            // Use the categoryEdit hook to update the category
            const updated = await genderEdit(gen, newGenderName);
            if (updated.status) {
                // Update the state with the new category
                setGenders((prevGenders) =>
                    prevGenders.map((gender) =>
                        gender === gen ? newGenderName : gender
                    )
                );
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
            setGenders((prevGenders) =>
                prevGenders.filter((gender) => gender !== gen)
            );
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
            setGenders((prevGenders) => [...prevGenders, editedGender]);
            setEditedGender('');
            setShowGenderPopup(false);
        } else {
            console.error('Failed to add category');
        }
        setLoading(false);
    };

    // ----------------------------------


    const handleTrimsSave = async () => {
        const trimData = {
            name: trimsFormData.name, // Name entered in the popup
            images: trimsFormData.images.map((image, index) => ({
                position: index,
                file: image.file,
            })),
        };

        try {
            await trimAdd(trimData);
            alert("Trim added successfully!");
            setTrimsPopup({ visible: false, id: null });
            setTrimsFormData({ name: "", images: [] });
            // Optionally refetch the trims list
        } catch (error) {
            alert(error.message || "Failed to add trim");
        }
    };


    const [selectedOption, setSelectedOption] = useState("");
    const [formValues, setFormValues] = useState({
        name: '',
        category: '',
        gender: '',
        position: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedOption, setEditedOption] = useState('');
    const [editedImage, setEditedImage] = useState(null);

    const options = sizecharts.map(item => item.name);
    const images = sizecharts.reduce((acc, item) => {
        acc[item.name] = item.images?.src || "";  // Default to empty string if no image found
        return acc;
    }, {});

    const { addSizeChart, success, error } = useAddSizeChart();
    const { editSizeChart, } = useEditSizeChart();
    const { deleteSizeChart } = useDeleteSizeChart();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);  // Store the new image file temporarily
        setEditedImage(null); // Clear the existing image preview
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('category', formValues.category);
        formData.append('gender', formValues.gender);
        formData.append('position', formValues.position);
        if (imageFile) formData.append('image', imageFile);

        try {
            await addSizeChart(formData);
            alert('Size guide added successfully!');
            setIsAdding(false); // Close modal
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isEditing && selectedOption) {
            const selectedData = sizecharts.find(item => item.name === selectedOption);
            if (selectedData) {
                setFormValues({
                    name: selectedData.name,
                    category: selectedData.category,
                    gender: selectedData.gender,
                    position: selectedData.images?.position || "", // Set default if not available
                });
                setEditedImage(selectedData.images?.src || null);
            }
        }
    }, [isEditing, selectedOption, sizecharts]);

    const handleEditOption = async () => {
        if (selectedOption) {
            const formData = new FormData();

            // Append name, category, gender, position
            formData.append('name', formValues.name);
            formData.append('category', formValues.category);
            formData.append('gender', formValues.gender);
            formData.append('position', formValues.position);

            // Check if there's a new image and append it
            if (editedImage) {
                formData.append('image', editedImage);  // Ensure 'image' is the field name
            }

            // Debugging: log the FormData content
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            try {
                await editSizeChart(selectedOption, formData);
                alert("Size guide updated successfully!");
            } catch (err) {
                console.error(err);
            }
        } else {
            alert("Please select a size chart to edit.");
        }
    };


    const handleDelete = async () => {
        if (selectedOption) {
            const confirmed = window.confirm("Are you sure you want to delete this size chart?");
            if (confirmed) {
                await deleteSizeChart(selectedOption);
                alert("Size chart deleted successfully!");
            }
        } else {
            alert("Please select a size chart to delete.");
        }
    };


    const handleCancelEdit = () => {
        // Close the editing form without applying changes
        setIsEditing(false);
    };

    const handleAddOption = () => {
        setIsAdding(true); // Open the "add option" modal
        setEditedOption(""); // Reset the input fields
        setEditedImage(null); // Reset the image preview
    };

    const handleCancelAddOption = () => {
        setIsAdding(false); // Close the "add option" modal
    };


    const [trimsPopup, setTrimsPopup] = useState({ visible: false, id: null });
    const [trimsFormData, setTrimsFormData] = useState({
        name: '',
        images: [], // Initialize as an empty array
    });
    const handleTrimsAdd = () => {
        setTrimsPopup({ visible: true, id: null });
        setTrimsFormData({ name: '', images: [] }); // Initialize with empty array
    };

    const { deleteTrims, errorTrims } = useDeleteTrims();
    const handleDeleteTrimBox = async (id) => {
        console.log("Deleting trim with ID:", id); // Log the ID being passed
        const confirmed = window.confirm("Are you sure you want to delete this trim?");
        if (!confirmed) return;

        await deleteTrims(id); // Pass the ID to the hook

        if (!errorTrims) {
            setTrims((prevTrims) => prevTrims.filter((trim) => trim._id !== id));
        }
    };

    const [parameters, setParameters] = useState([
        { id: 1, name: 'T-shirt', image: [] },
        { id: 2, name: 'Sweatshirt', image: [] },
        { id: 3, name: 'Hoodie', image: [] },
    ]);

    const [parameterspopup, setParametersPopup] = useState({ visible: false, id: null });
    const [formData, setFormData] = useState({ name: '', images: [] });

    const handleEditParameter = (id) => {
        const parameter = parameters.find((param) => param.id === id);
        setParametersPopup({ visible: true, id });
        setFormData({ name: parameter.name, images: parameter.image });
    };

    const handleSaveParameter = () => {
        if (parameterspopup.id) {
            // Edit an existing parameter
            setParameters((prev) =>
                prev.map((parameter) =>
                    parameter.id === parameterspopup.id
                        ? { ...parameter, name: formData.name, image: formData.images }
                        : parameter
                )
            );
        } else {
            // Add a new parameter
            const newParameter = {
                id: Date.now(),
                name: formData.name,
                image: formData.images,
            };
            setParameters((prev) => [...prev, newParameter]);
        }
        setParametersPopup({ visible: false, id: null });
        setFormData({ name: '', images: [] });
    };

    const [finishingData, setFinishingData] = useState({ name: '', images: [] });

    const [finishingpopup, setFinishingPopup] = useState({ visible: false, id: null });

    const handleEditFinishing = (id) => {
        const finising = finishing.find((param) => param.id === id);
        setFinishingPopup({ visible: true, id });
        setFinishingData({ name: finising.name, images: finising.image });
    };
    const handleSaveFinising = () => {
        if (finishingpopup.id) {
            // Edit an existing parameter
            setFinishing((prev) =>
                prev.map((finishing) =>
                    finishing.id === finishingpopup.id
                        ? { ...finishing, name: finishingData.name, image: finishingData.images }
                        : finishing
                )
            );
        } else {
            // Add a new parameter
            const newFinising = {
                id: Date.now(),
                name: finishingData.name,
                image: finishingData.images,
            };
            setFinishing((prev) => [...prev, newFinising]);
        }
        setFinishingPopup({ visible: false, id: null });
        setFinishingData({ name: '', images: [] });
    };


    // Fabric
    const [editedFabric, setEditedFabric] = useState('');
    const [showFabricPopup, setShowFabricPopup] = useState(false);
    const [loadingFabric, setLoadingFabric] = useState(false);

    const handleAddFabric = async () => {
        setShowFabricPopup(true);
    };

    const handleEditFabric = async (fabric) => {
        const newFabricName = prompt('Enter the new fabric name:', fabric);
        if (newFabricName && newFabricName !== fabric) {
            // Use the fabricEdit hook to update the fabric
            const updated = await fabricEdit(fabric, newFabricName);
            if (updated.status) {
                // Update the state with the new fabric name
                setFabrics((prevFabrics) =>
                    prevFabrics.map((item) => (item === fabric ? newFabricName : item))
                );
            } else {
                console.error('Failed to edit fabric');
            }
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

    const handleSaveNewFabric = async (e) => {
        e.preventDefault();
        setLoadingFabric(true);

        // Use the fabricAdd hook to add a new fabric
        const newFabric = await fabricAdd(editedFabric);
        if (newFabric.status) {
            setFabrics((prevFabrics) => [...prevFabrics, editedFabric]);
            setEditedFabric('');
            setShowFabricPopup(false);
        } else {
            console.error('Failed to add fabric');
        }
        setLoadingFabric(false);
    };

    // Collection
    const [editedCollection, setEditedCollection] = useState('');
    const [showCollectionPopup, setShowCollectionPopup] = useState(false);
    const [loadingCollection, setLoadingCollection] = useState(false);

    const handleAddCollection = async () => {
        setShowCollectionPopup(true);
    };

    const handleEditCollection = async (collection) => {
        const newCollectionName = prompt('Enter the new collection name:', collection);
        if (newCollectionName && newCollectionName !== collection) {
            // Use the collectionEdit hook to update the collection
            const updated = await collectionEdit(collection, newCollectionName);
            if (updated.status) {
                // Update the state with the new collection name
                setCollections((prevCollections) =>
                    prevCollections.map((item) => (item === collection ? newCollectionName : item))
                );
            } else {
                console.error('Failed to edit collection');
            }
        }
    };

    const handleDeleteCollection = async (collection) => {
        // Use the collectionDelete hook to delete the collection
        const deleted = await collectionDelete(collection);
        if (deleted.status) {
            // Remove the deleted collection from the state
            setCollections((prevCollections) => prevCollections.filter((item) => item !== collection));
        } else {
            console.error('Failed to delete collection');
        }
    };

    const handleSaveNewCollection = async (e) => {
        e.preventDefault();
        setLoadingCollection(true);

        // Use the fabricAdd hook to add a new collection
        const newCollection = await collectionAdd(editedCollection);
        if (newCollection.status) {
            setCollections((prevCollections) => [...prevCollections, editedCollection]);
            setEditedCollection('');
            setShowCollectionPopup(false);
        } else {
            console.error('Failed to add collection');
        }
        setLoadingCollection(false);
    };

    return (
        <section className="container mx-auto">
            <div className="border-b p-10 flex flex-col gap-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">New Category</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="underline" onClick={handleAddCategory}>
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
                                    readOnly={true} // Make it read-only by default
                                    className="border-none text-center text-black outline-none"
                                />
                                <div className="hidden gap-1 group-hover:flex absolute right-0 bottom-0 ml-2 p-3">
                                    {/* Edit Button */}
                                    <button onClick={() => handleEditCategory(cat)}>
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
                                    <button onClick={() => {
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
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M5.41602 6.5V10.0455"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M7.58398 6.5V10.0455"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Category Popup */}
                    {showCategoryPopup && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <form onSubmit={handleSaveNewCategory} className="bg-white p-6 rounded-lg">
                                <h3 className="mb-4">New Category</h3>
                                <input
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={editedCategory}
                                    onChange={(e) => setEditedCategory(e.target.value)}
                                    required
                                    className="p-2 rounded w-full mb-4"
                                />
                                <button
                                    onClick={() => setShowCategoryPopup(false)}
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
                            <h1 className="font-bold text-xl">Category (Gender wise)</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="underline" onClick={handleAddGender}>
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
                                        readOnly={true} // Make it read-only by default
                                        className="border-none text-center text-black outline-none"
                                    />
                                    <div className="hidden gap-1 group-hover:flex absolute right-0 bottom-0 ml-2 p-3">
                                        {/* Edit Button */}
                                        <button onClick={() => handleEditGender(gen)}>
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
                                        <button onClick={() => {
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
                                                    stroke-width="0.6"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                    stroke="black"
                                                    stroke-width="0.6"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M5.41602 6.5V10.0455"
                                                    stroke="black"
                                                    stroke-width="0.6"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M7.58398 6.5V10.0455"
                                                    stroke="black"
                                                    stroke-width="0.6"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg></span>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Gender Popup */}
                    {showGenderPopup && (
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
                                    onClick={() => setShowGenderPopup(false)}
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


            </div>

            <div className="border-b p-10 space-y-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">Gender (size chart)</h1>
                        </div>
                        <div className="flex gap-5">
                            <button className="underline" onClick={handleAddOption}>
                                Add
                            </button>
                            <button className="underline" onClick={handleDelete}>
                                Delete
                            </button>
                            <button className="underline" onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    </div>

                    <div className="w-full flex gap-10 items-center">
                        <div className="dropdown-container">
                            <select
                                className="custom-dropdown border border-gray-300 p-2 rounded"
                                name="sizeChart"
                                id="sizeChart"
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            >
                                <option value="" disabled>
                                    Please select chart
                                </option>
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className="border-2 w-[300px] left-0 mt-10 border-dashed border-gray-300 bg-[#FCFCFC] flex items-center justify-center"
                            style={{ height: "150px" }}
                        >
                            {images[selectedOption] ? (
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/${images[selectedOption]}`}
                                    alt={selectedOption}
                                    className="h-full object-fill"
                                />
                            ) : (
                                <p className="text-gray-400">Drop an Image here</p>
                            )}
                        </div>
                    </div>

                    {/* Success and Error Messages */}
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}


                    {/* Modal for adding an option */}
                    {isAdding && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h2 className="text-xl mb-4">Add Size Guide</h2>

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
                                                <label>{cat}</label>
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
                                                <label>{gen}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Option Name */}
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    className="outline p-2 rounded mb-4 w-full"
                                    placeholder="Enter size guide name"
                                    required
                                />

                                {/* Position */}
                                <input
                                    type="text"
                                    name="position"
                                    value={formValues.position}
                                    onChange={handleInputChange}
                                    className="outline p-2 rounded mb-4 w-full"
                                    placeholder="Enter image position"
                                    required
                                />

                                {/* Image Preview */}
                                <div className="border-2 w-full h-40 border-dashed border-gray-300 bg-[#FCFCFC] flex items-center justify-center">
                                    {imageFile ? (
                                        <img
                                            src={URL.createObjectURL(imageFile)}
                                            alt="Preview"
                                            className="h-full object-contain"
                                        />
                                    ) : (
                                        <p className="text-gray-400">No image selected</p>
                                    )}
                                </div>

                                {/* File Input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="my-4"
                                    onChange={handleImageChange}
                                    required
                                />

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        {loading ? 'Adding...' : 'Add Size Guide'}
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
                                {success && <p className="text-green-500 mt-2">Size guide added successfully!</p>}
                            </div>
                        </div>
                    )}

                    {/* Modal for editing a size guide */}
                    {isEditing && (
                        <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h2 className="text-xl mb-4">Edit Size Guide</h2>

                                {/* Name Input */}
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    className="outline p-2 rounded mb-4 w-full"
                                    placeholder="Enter updated size guide name"
                                />

                                {/* Category Radio Buttons */}
                                <div className="mb-4">
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
                                                <label>{cat}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gender Radio Buttons */}
                                <div className="mb-4">
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
                                                <label>{gen}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Position Input */}
                                <input
                                    type="text"
                                    name="position"
                                    value={formValues.position}
                                    onChange={handleInputChange}
                                    className="outline p-2 rounded mb-4 w-full"
                                    placeholder="Enter position"
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="my-4"
                                />
                                {/* Current Image (if exists) */}
                                {editedImage && !imageFile && (
                                    <div className="mb-4 h-[100px] mx-auto">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/${editedImage}`}
                                            alt="Current"
                                            className="h-full object-fill"
                                        />
                                    </div>
                                )}

                                {/* New Image Preview (if new image is uploaded) */}
                                {imageFile && (
                                    <div className="mb-4 h-[100px] mx-auto">
                                        <img
                                            src={URL.createObjectURL(imageFile)}  // Temporary preview of the uploaded image
                                            alt="Uploaded Preview"
                                            className="h-full object-fill"
                                        />
                                    </div>
                                )}



                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleEditOption}
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        {loading ? 'Updating...' : 'Update Size Guide'}
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="border border-black px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className="border-b p-10 space-y-10">
                <div>
                    <h1 className="font-bold text-xl mb-4">Construction Sheet</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {construction.map((box) => (
                            <div key={box.id} className="p-4 border border-gray-400">
                                <div className="flex justify-between items-center pb-2">
                                    <h1 className="text-xl text-center">{box.name}</h1>
                                    <button
                                        className="text-gray-600 hover:text-black"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${box.images?.src}` || "images.jpg"}
                                    alt={box.name}
                                    className="w-24 h-20 object-cover bg-[#FCFCFC] border border-dashed border-[#CACACA] rounded"
                                />
                            </div>
                        ))}
                    </div>

                    {/* {secondPopup.visible && (
                        <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-md w-[400px] h-[85vh] overflow-scroll">
                                <h2 className="text-lg font-bold mb-4">Edit Construction Sheet</h2>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    value={secondFormData.name}
                                    onChange={(e) =>
                                        setSecondFormData({ ...secondFormData, name: e.target.value })
                                    }
                                    className="w-full p-2 border bg-slate-100 rounded mb-4"
                                />
                                <div className="mb-4">
                                    <label className="block mb-2 font-semibold">Images:</label>
                                    {secondFormData.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/${image}`}
                                                alt={`Preview ${index + 1}`}
                                                className="w-28 h-16 object-cover rounded"
                                            />
                                            <button
                                                className="text-red-500 text-sm"
                                                onClick={() => handleSecondRemoveImage(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            const fileURLs = files.map((file) => URL.createObjectURL(file));

                                            setSecondFormData((prev) => ({
                                                ...prev,
                                                images: [...prev.images, ...fileURLs],
                                                imageFiles: [...prev.imageFiles, ...files],
                                            }));
                                        }}
                                        className="w-full mb-4"
                                    />
                                </div>
                                {error && console.error('Error:', error)}
                                {error && <p className="text-red-500 mb-2">{error}</p>}
                                <div className="flex justify-end gap-2">
                                    <button
                                        className="px-4 py-2 border text-black rounded-lg text-sm"
                                        onClick={() => setSecondPopup({ visible: false, id: null })}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                        onClick={handleSecondSave}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    )} */}
                </div>
            </div>

            <div className="border-b p-10 space-y-10">
                <div>
                    <div>
                        <div className="flex gap-10 items-center pb-5">
                            <div>
                                <h1 className="font-bold text-2xl">Trims</h1>
                            </div>
                            <div className="flex gap-3">
                                <button className="underline" onClick={handleTrimsAdd}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {trims.map((trim) => (
                                <div key={trim._id} className="p-4 border border-gray-400 group">
                                    <div className="flex justify-between items-center pb-2">
                                        <h1 className="text-xl whitespace-nowrap">{trim.name}</h1>
                                        <div className="hidden gap-2 group-hover:flex">
                                            <button>Edit</button>
                                            <button onClick={() => handleDeleteTrimBox(trim._id)}>Delete</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Array.isArray(trim.images)
                                            ? trim.images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${image.src}`}
                                                        alt={`${trim.name} ${index + 1}`}
                                                        className="w-24 h-20 object-cover bg-[#FCFCFC] border border-dashed border-[#CACACA] rounded"
                                                    />
                                                </div>
                                            ))
                                            : trim.images && (
                                                <div className="relative">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${trim.images.src}`}
                                                        alt={`${trim.name} 1`}
                                                        className="w-24 h-20 object-cover bg-[#FCFCFC] border border-dashed border-[#CACACA] rounded"
                                                    />
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}

                        </div>


                        {/* Popup Modal */}
                        {trimsPopup.visible && (
                            <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded shadow-md w-[400px] h-[85vh] overflow-scroll">
                                    <h2 className="text-lg font-bold mb-4">
                                        {trimsPopup.id ? 'Edit Box' : 'Add Box'}
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={trimsFormData.name}
                                        onChange={(e) =>
                                            setTrimsFormData({ ...trimsFormData, name: e.target.value })
                                        }
                                        className="w-full p-2 border bg-slate-100 rounded mb-4"
                                    />
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">Images:</label>
                                        {trimsFormData.images?.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-28 h-16 object-cover rounded"
                                                />
                                                <button
                                                    className="text-red-500 text-sm"
                                                    onClick={() => {
                                                        const updatedImages = trimsFormData.images.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setTrimsFormData({
                                                            ...trimsFormData,
                                                            images: updatedImages,
                                                        });
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="file"
                                            accept="image/ .jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                if (e.target.files[0]) {
                                                    const file = e.target.files[0];
                                                    const previewUrl = URL.createObjectURL(file);
                                                    setTrimsFormData({
                                                        ...trimsFormData,
                                                        images: [...(trimsFormData.images || []), { previewUrl, file }],
                                                    });
                                                }
                                            }}

                                            className="w-full"
                                        />
                                        <button
                                            className="mt-5 px-3 py-1 bg-black text-white rounded-lg text-xs"
                                            onClick={() => {
                                                // Add logic for additional image functionality if required.
                                            }}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 border text-black rounded-lg text-sm"
                                            onClick={() => setTrimsPopup({ visible: false, id: null })}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                            onClick={handleTrimsSave}
                                            disabled={loading}
                                        >
                                            {loading ? "Saving..." : "Save"}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {requirements.map((requirement) => (
                                <div key={requirement._id} className="p-4 border border-gray-400">
                                    {/* Item Header */}
                                    <div className="flex gap-10 items-center justify-between pb-2">
                                        <h1 className="text-xl text-center mb-3">{requirement.name}</h1>
                                        <button onClick={() => handleEditParameter(requirement._id)}>
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
                                    <div className="grid grid-cols-3 gap-2">
                                        {requirement.images && requirement.images.src && (
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${requirement.images.src}`}
                                                alt={`${requirement.name}`}
                                                className="h-24 w-24 object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Popup Modal */}
                        {parameterspopup.visible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded shadow-md w-[400px]">
                                    <h2 className="text-lg font-bold mb-4">{parameterspopup.id ? 'Edit Parameter' : 'Add Parameter'}</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-2 border bg-slate-100 rounded mb-4"
                                    />
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">Images:</label>
                                        {formData.images?.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-28 h-16 object-cover rounded"
                                                />
                                                <button
                                                    className="text-red-500 text-sm"
                                                    onClick={() => {
                                                        const updatedImages = formData.images.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setFormData({
                                                            ...formData,
                                                            images: updatedImages,
                                                        });
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="file"
                                            accept="image/ .jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                if (e.target.files[0]) {
                                                    const newImage = URL.createObjectURL(e.target.files[0]);
                                                    setFormData({
                                                        ...formData,
                                                        images: [...(formData.images || []), newImage],
                                                    });
                                                }
                                            }}
                                            className="w-full"
                                        />
                                        <button
                                            className="mt-5 px-3 py-1 bg-black text-white rounded-lg text-xs"
                                            onClick={() => {
                                                // Add logic for additional image functionality if required.
                                            }}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 border text-black rounded-lg text-sm"
                                            onClick={() => setParametersPopup({ visible: false, id: null })}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                            onClick={handleSaveParameter}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {finishing.map((item) => (
                                <div key={item.id} className="p-4 border border-gray-400">
                                    <div className="flex gap-10 items-center justify-between pb-2">
                                        <h1 className="text-xl text-center mb-3">{item.name}</h1>
                                        <button onClick={() => handleEditFinishing(item.id)}>
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
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625"
                                                    stroke="#0C2F2F"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Display images in grid */}
                                    <div className="grid grid-cols-3 gap-2">
                                        {item.images && item.images.src && (
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${item.images.src}`}
                                                alt={`${item.name}`}
                                                className="h-24 w-24 object-cover"
                                            />
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                        {/* Popup Modal */}
                        {finishingpopup.visible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded shadow-md w-[400px]">
                                    <h2 className="text-lg font-bold mb-4">{finishingpopup.id ? 'Edit Finishing' : 'Add Finishing'}</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={finishingData.name}
                                        onChange={(e) => setFinishingData({ ...finishingData, name: e.target.value })}
                                        className="w-full p-2 border bg-slate-100 rounded mb-4"
                                    />
                                    <div className="mb-4">
                                        <label className="block mb-2 font-semibold">Images:</label>
                                        {finishingData.images?.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between gap-2 mb-2 border p-2 rounded"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-28 h-16 object-cover rounded"
                                                />
                                                <button
                                                    className="text-red-500 text-sm"
                                                    onClick={() => {
                                                        const updatedImages = finishingData.images.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setFinishingData({
                                                            ...finishingData,
                                                            images: updatedImages,
                                                        });
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="file"
                                            accept="image/ .jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                if (e.target.files[0]) {
                                                    const newImage = URL.createObjectURL(e.target.files[0]);
                                                    setFinishingData({
                                                        ...finishingData,
                                                        images: [...(finishingData.images || []), newImage],
                                                    });
                                                }
                                            }}
                                            className="w-full"
                                        />
                                        <button
                                            className="mt-5 px-3 py-1 bg-black text-white rounded-lg text-xs"
                                            onClick={() => {
                                                // Add logic for additional image functionality if required.
                                            }}
                                        >
                                            Add More
                                        </button>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-2 border text-black rounded-lg text-sm"
                                            onClick={() => setFinishingPopup({ visible: false, id: null })}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                            onClick={handleSaveFinising}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-b p-10 flex flex-col gap-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">Fabric</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="underline" onClick={handleAddFabric}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-x-4 flex-wrap">
                        {fabrics.map((fabric) => (
                            <div
                                key={fabric}
                                className="flex w-1/4 relative mb-4 group items-center border-2 rounded-xl px-4 py-5 text-center text-lg"
                            >
                                <textarea
                                    value={fabric}
                                    readOnly={true}
                                    rows={5} // Allows for 2-3 lines
                                    className="border-none w-full text-sm text-center text-black outline-none resize-none"
                                />
                                <div className="hidden gap-1 group-hover:flex absolute right-0 bottom-0 ml-2 p-3">
                                    {/* Edit Button */}
                                    <button onClick={() => handleEditFabric(fabric)}>
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
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M5.41602 6.5V10.0455"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M7.58398 6.5V10.0455"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fabric Popup */}
                    {showFabricPopup && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <form
                                onSubmit={handleSaveNewFabric}
                                className="bg-white p-6 rounded-lg"
                            >
                                <h3 className="mb-4">New Fabric</h3>
                                <textarea
                                    placeholder="Enter Fabric Name"
                                    value={editedFabric}
                                    onChange={(e) => setEditedFabric(e.target.value)}
                                    required
                                    rows={3} // Allows for 2-3 lines
                                    className="p-2  rounded w-full mb-4 resize-none"
                                />
                                <button
                                    onClick={() => setShowFabricPopup(false)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loadingFabric}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Fabric
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>



            <div className="border-b p-10 flex flex-col gap-10">
                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">Collection</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="underline" onClick={handleAddCollection}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-x-4 flex-wrap">
                        {collections.map((collection) => (
                            <div
                                key={collection}
                                className="flex w-1/4 relative mb-4 group items-center border-2 rounded-xl px-4 py-5 text-center text-lg"
                            >
                                <textarea
                                    value={collection}
                                    readOnly={true}
                                    rows={1} // Allows for 2-3 lines
                                    className="border-none w-full text-sm text-center text-black outline-none resize-none"
                                />
                                <div className="hidden gap-1 group-hover:flex absolute right-0 bottom-0 ml-2 p-3">
                                    {/* Edit Button */}
                                    <button onClick={() => handleEditCollection(collection)}>
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
                                        onClick={() => {
                                            const confirmDelete = window.confirm(
                                                'Are you sure you want to delete this collection?'
                                            );
                                            if (confirmDelete) {
                                                handleDeleteCollection(collection);
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
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M5.41602 6.5V10.0455"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M7.58398 6.5V10.0455"
                                                stroke="black"
                                                stroke-width="0.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg></span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Collection Popup */}
                    {showCollectionPopup && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <form
                                onSubmit={handleSaveNewCollection}
                                className="bg-white p-6 rounded-lg"
                            >
                                <h3 className="mb-4">New Collection</h3>
                                <textarea
                                    placeholder="Enter Collection Name"
                                    value={editedFabric}
                                    onChange={(e) => setEditedCollection(e.target.value)}
                                    required
                                    rows={1} // Allows for 2-3 lines
                                    className="p-2  rounded w-full mb-4 resize-none"
                                />
                                <button
                                    onClick={() => setShowCollectionPopup(false)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loadingCollection}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Collection
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

        </section >
    );
};
