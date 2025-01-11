import { useState, useEffect } from "react";
import { LiaSaveSolid } from "react-icons/lia";
import { categoryFetch, categoryAdd, categoryEdit, categoryDelete, genderFetch, genderAdd, genderEdit, genderDelete, trimFetch, trimAdd, requirementsFetch, finishingFetch, collectionFetch } from "../API/TechPacks";

export default function Setting() {

    // Category
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState('');
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryFetch(); // Use the categoryFetch hook
                if (data.status) {
                    setCategories(data.data); // Set the fetched categories
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

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

    const [genders, setGenders] = useState([]);
    const [editedGender, setEditedGender] = useState('');
    const [showGenderPopup, setShowGenderPopup] = useState(false);

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const data = await genderFetch(); // Use the categoryFetch hook                                    
                if (data.status) {
                    setGenders(data.data); // Set the fetched categories
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchGenders();
    }, []);

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

    const [construction, setConstructionSheets] = useState([]);

    useEffect(() => {
        const fetchConstructionSheets = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/design/setting/constructionSheet`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': process.env.REACT_APP_API_KEY,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setConstructionSheets(data.data); // Assuming the data is in the 'data' field
                    setLoading(false);
                } else {
                    const text = await response.text();
                    console.error('Response Text:', text);
                    throw new Error('Failed to fetch construction sheets');
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                setLoading(false);
            }
        };

        fetchConstructionSheets();
    }, []);
    // ----------------------------------
    const [trims, setTrims] = useState([]);

    useEffect(() => {
        const fetchTrims = async () => {
            try {
                const data = await trimFetch(); // Use the categoryFetch hook
                if (data.status) {
                    setTrims(data.data);
                    // Set the fetched categories
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchTrims();
    }, []);

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



    // ----------------------------------

    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const data = await requirementsFetch(); // Use the categoryFetch hook
                if (data.status) {
                    setRequirements(data.data); // Set the fetched Requirements
                } else {
                    console.error('Failed to fetch Requirements');
                }
            } catch (error) {
                console.error('Error fetching Requirements:', error);
            }
        };

        fetchRequirements();
    }, []);
    console.log("first,", requirements)
    // ----------------------------------

    const [finishing, setFinishing] = useState([]);

    useEffect(() => {
        const fetchFinishing = async () => {
            try {
                const data = await finishingFetch();
                if (data.status) {
                    setFinishing(data.data); // Set the fetched Finishing
                } else {
                    console.error('Failed to fetch Finishing');
                }
            } catch (error) {
                console.error('Error fetching Finishing:', error);
            }
        };

        fetchFinishing();
    }, []);

    // ----------------------------------

    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await collectionFetch();
                if (data) {
                    setCollections(data.collections); // Set the fetched Collections
                } else {
                    console.error('Failed to fetch Collections');
                }
            } catch (error) {
                console.error('Error fetching Collections:', error);
            }
        };

        fetchCollections();
    }, []);

    // ----------------------------------

    const [options, setOptions] = useState([
        "Men T-shirt",
        "Men Sweat shirt",
        "Men Hoodie",
        "Women T-shirt",
        "Women Hoodie",
    ]);

    const [selectedOption, setSelectedOption] = useState("");
    const [images, setImages] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedOption, setEditedOption] = useState(""); // To store the edited name
    const [editedImage, setEditedImage] = useState(null); // To store the edited image
    const [isAdding, setIsAdding] = useState(false); // To handle adding new options

    const handleEditOption = () => {
        if (selectedOption) {
            // Open the edit modal with the current option data
            setEditedOption(selectedOption);
            setEditedImage(images[selectedOption] || null); // Set the current image
            setIsEditing(true); // Open the editing form
        }
    };

    const handleApplyChanges = () => {
        if (editedOption.trim() !== "") {
            // Update the options list with the new name
            setOptions((prevOptions) =>
                prevOptions.map((option) =>
                    option === selectedOption ? editedOption.trim() : option
                )
            );
            // Update the image for the selected option
            if (editedImage) {
                setImages({ ...images, [editedOption]: editedImage });
            }

            // Close the editing form
            setIsEditing(false);
            setSelectedOption(editedOption); // Update selected option with the new name
        }
    };

    const handleCancelEdit = () => {
        // Close the editing form without applying changes
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedImage(URL.createObjectURL(file)); // Set the new image for editing
        }
    };

    const handleAddOption = () => {
        setIsAdding(true); // Open the "add option" modal
        setEditedOption(""); // Reset the input fields
        setEditedImage(null); // Reset the image preview
    };

    // Handle confirming adding a new option
    const handleConfirmAddOption = () => {
        if (editedOption.trim() !== "") {
            // Add the new option name to the list if it's not already present
            if (!options.includes(editedOption)) {
                setOptions((prevOptions) => [...prevOptions, editedOption.trim()]);
                // Add the image to the images object if uploaded
                if (editedImage) {
                    setImages((prevImages) => ({
                        ...prevImages,
                        [editedOption]: editedImage,
                    }));
                }

                setIsAdding(false); // Close the "add option" modal
            } else {
                alert("Option already exists.");
            }
        }
    };

    const handleCancelAddOption = () => {
        setIsAdding(false); // Close the "add option" modal
    };

    // Handle deleting the selected option
    const handleDeleteOption = () => {
        if (selectedOption) {
            const confirmDelete = window.confirm("Are you sure you want to delete this option?");
            if (confirmDelete) {
                setOptions((prevOptions) => prevOptions.filter((option) => option !== selectedOption));
                setSelectedOption(""); // Reset selected option after deletion
            }
        }
    };

    const [trimsBoxes, setTrimsBoxes] = useState([
        { id: 1, name: 'Silicone Tag', images: ['https://via.placeholder.com/346x163?text=Silicone+Tag'] },
        { id: 2, name: 'Main Label', images: ['https://via.placeholder.com/346x163?text=Main+Label'] },
        { id: 3, name: 'Wash Care Label (T-shirt)', images: ['https://via.placeholder.com/346x163?text=Wash+Care+Label+(T-shirt)'] },
        { id: 4, name: 'Wash Care Label (Hood/Sweat)', images: ['https://via.placeholder.com/346x163?text=Wash+Care+Label+(Hood/Sweat)'] },
    ]);


    const [trimsPopup, setTrimsPopup] = useState({ visible: false, id: null });
    const [trimsFormData, setTrimsFormData] = useState({
        name: '',
        images: [], // Initialize as an empty array
    });
    const handleTrimsAdd = () => {
        setTrimsPopup({ visible: true, id: null });
        setTrimsFormData({ name: '', images: [] }); // Initialize with empty array
    };

    const handleTrimsEdit = (id) => {
        const box = trimsBoxes.find((box) => box.id === id);
        setTrimsPopup({ visible: true, id });
        setTrimsFormData({ name: box.name, images: box.images });
    };


    const handleDeleteTrimBox = (boxId) => {
        // Delete the entire trim box after confirmation
        if (window.confirm('Are you sure you want to delete this trim box?')) {
            setTrimsBoxes((prev) => prev.filter((box) => box.id !== boxId));
        }
    };

    const [newCollectionName, setNewCollectionName] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleAddCollection = () => {
        setShowPopup(true);
    };

    const handleSaveNewCollection = () => {
        if (newCollectionName) {
            setCollections([
                ...collections,
                { id: Date.now(), name: newCollectionName, isEditing: false },
            ]);
            setShowPopup(false);
            setNewCollectionName("");
        }
    };

    const handleEditCollection = (id) => {
        setCollections((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, isEditing: true, isEditable: !item.isEditable }
                    : item
            )
        );
    };

    const handleSaveCollection = (id, name) => {
        setCollections((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, name, isEditing: false } : item
            )
        );
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

    const handleParameterChange = (e) => {
        const files = e.target.files;
        if (files) {
            const newImages = [...formData.images];
            Array.from(files).forEach((file) => {
                newImages.push(URL.createObjectURL(file));
            });
            setFormData({ ...formData, images: newImages });
        }
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
                                    <button onClick={() => handleDeleteCategory(cat)}>
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
                                        <button onClick={() => handleDeleteGender(gen)}>
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
                            <button
                                className="underline"
                                onClick={handleAddOption}
                            >
                                Add
                            </button>
                            <button
                                className="underline"
                                onClick={handleDeleteOption}
                            >
                                Delete
                            </button>
                            <button
                                className="underline"
                                onClick={handleEditOption}
                            >
                                Edit
                            </button>
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
                                    src={images[selectedOption]}
                                    alt="Preview"
                                    className="h-full object-fill"
                                />
                            ) : (
                                <p className="text-gray-400">Drop an Image here</p>
                            )}
                        </div>
                    </div>

                    {/* Modal for adding an option */}
                    {isAdding && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h2 className="text-xl mb-4">Add Option</h2>
                                <input
                                    type="text"
                                    value={editedOption}
                                    onChange={(e) => setEditedOption(e.target.value)}
                                    className="outline p-2 rounded mb-4 w-full"
                                    placeholder="Enter option name"
                                />
                                <div className="border-2 w-full h-40 border-dashed border-gray-300 bg-[#FCFCFC] flex items-center justify-center">
                                    {editedImage ? (
                                        <img
                                            src={editedImage}
                                            alt="Preview"
                                            className="h-full object-contain"
                                        />
                                    ) : (
                                        <p className="text-gray-400">No image selected</p>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="my-4"
                                    onChange={handleImageChange}
                                />
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleConfirmAddOption}
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        Add Option
                                    </button>
                                    <button
                                        onClick={handleCancelAddOption}
                                        className="border border-black px-4 py-2 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal for editing an option */}
                    {isEditing && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h2 className="text-xl mb-4">Edit Option</h2>
                                <input
                                    type="text"
                                    value={editedOption}
                                    onChange={(e) => setEditedOption(e.target.value)}
                                    className="outline p-2 rounded mb-4 w-full"
                                />
                                <div className="border-2 w-full h-40 border-dashed border-gray-300 bg-[#FCFCFC] flex items-center justify-center">
                                    {editedImage ? (
                                        <img
                                            src={editedImage}
                                            alt="Preview"
                                            className="h-full object-contain"
                                        />
                                    ) : (
                                        <p className="text-gray-400">No image selected</p>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="my-4"
                                    onChange={handleImageChange}
                                />
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleApplyChanges}
                                        className="bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        Apply
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
                    <h1 className="font-bold text-xl">Construction Sheet</h1>
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
                                <div key={trim.id} className="p-4 border border-gray-400 group">
                                    <div className="flex justify-between items-center pb-2">
                                        <h1 className="text-xl whitespace-nowrap">{trim.name}</h1>
                                        <div className="hidden gap-2 group-hover:flex">
                                            <button onClick={() => handleTrimsEdit(trim.id)}>Edit</button>
                                            <button onClick={() => handleDeleteTrimBox(trim.id)}>Delete</button>
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
                                                alt={`Image of ${requirement.name}`}
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
                                                alt={`Image of ${item.name}`}
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

            <div className="border-b p-10 space-y-10">
                <div>
                    <div className="flex gap-10">
                        <div>
                            <h1 className="font-bold text-2xl">Collection</h1>
                        </div>
                        <div className="flex gap-3">
                            <button className="underline" onClick={handleAddCollection}>Add</button>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {collections.map((collection) => (
                            <div
                                key={collection.id}
                                className="p-4 bg-gray-200 border relative rounded-lg flex items-center"
                            >
                                <input
                                    type="text"
                                    value={collection}
                                    disabled={!collection.isEditing}  // Disable input when isEditing is false
                                    className="flex-1 border text-center p-2 rounded"
                                    onChange={(e) =>
                                        setCollections((prev) =>
                                            prev.map((item) =>
                                                item.id === collection.id
                                                    ? { ...item, name: e.target.value }
                                                    : item
                                            )
                                        )
                                    }
                                />
                                <div className="absolute right-0 p-3 bottom-0">
                                    {collection.isEditing ? (
                                        <button
                                            onClick={() => handleSaveCollection(collection.id, collection)}
                                        >
                                            <LiaSaveSolid className="size-5" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditCollection(collection.id)}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}


                    </div>

                    {/* Popup for new collection */}
                    {showPopup && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg">
                                <h3 className="mb-4">New collection</h3>
                                <input
                                    type="text"
                                    placeholder="Enter Collection Name"
                                    value={newCollectionName}
                                    onChange={(e) => setNewCollectionName(e.target.value)}
                                    className="p-2 rounded w-full mb-4"
                                />
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNewCollection}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Collection
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </section >
    );
};
