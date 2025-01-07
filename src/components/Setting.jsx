import { useState } from "react";
import { LiaSaveSolid } from "react-icons/lia";


export default function Setting() {

    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [Category, setCategory] = useState([
        { id: 1, value: "T-Shirt", isEditable: false, color: "#719F82" },
        { id: 2, value: "Sweat Shirt", isEditable: false, color: "#0C2F2F" },
        { id: 3, value: "Hoodie", isEditable: false, color: "#A9A57E" },
    ]);

    const handleAddCategory = () => {
        setShowCategoryPopup(true); // Show the popup when 'Add' is clicked
    };

    const handleSaveNewCategory = () => {
        if (newCategoryName.trim() !== '') {
            const newCategory = {
                id: Date.now(), // Unique ID based on timestamp (you can change it to your preferred method)
                value: newCategoryName,
                color: '#000000', // You can set a default or prompt the user for color
                isEditable: true,
            };
            setCategory([...Category, newCategory]); // Add the new category to the Category array
            setNewCategoryName(''); // Clear the input field
            setShowCategoryPopup(false); // Close the popup
        }
    };

    const toggleCategoryEdit = (id) => {
        setCategory((prevCategory) =>
            prevCategory.map((input) =>
                input.id === id
                    ? { ...input, isEditable: !input.isEditable }
                    : input
            )
        );
    };

    const handleCategoryChange = (id, newValue) => {
        setCategory((prevCategory) =>
            prevCategory.map((input) =>
                input.id === id ? { ...input, value: newValue } : input
            )
        );
    };

    const [GenderCategory, setGenderCategory] = useState([
        { id: 1, value: "Men", isEditable: false, color: "#3FC1C9" },
        { id: 2, value: "Women", isEditable: false, color: "#F38181" },
        { id: 3, value: "Unisex", isEditable: false, color: "#6A2C70" },
    ]);
    const [CategoryGenderPopup, setCategoryGenderPopup] = useState(false);
    const [newGenderCategoryName, setNewGenderCategoryName] = useState("");


    // Handlers for managing input and category updates
    const handleSaveGenderCategory = () => {
        if (newGenderCategoryName.trim() === "") {
            alert("Box name cannot be empty.");
            return;
        }
        const newCategory = {
            id: Date.now(), // Unique ID
            value: newGenderCategoryName,
            color: "#2ecc71", // Default color for new categories
            isEditable: false,
        };
        setGenderCategory([...GenderCategory, newCategory]);
        setNewGenderCategoryName(""); // Reset input
        setCategoryGenderPopup(false); // Close popup
    };

    const toggleGenderCategoryEdit = (id) => {
        setGenderCategory(
            GenderCategory.map((category) =>
                category.id === id
                    ? { ...category, isEditable: !category.isEditable }
                    : category
            )
        );
    };

    const handleGenderCategoryChange = (id, newValue) => {
        setGenderCategory(
            GenderCategory.map((category) =>
                category.id === id ? { ...category, value: newValue } : category
            )
        );
    };

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
    const [newOptionName, setNewOptionName] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages({ ...images, [selectedOption]: URL.createObjectURL(file) });
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImages({ ...images, [selectedOption]: URL.createObjectURL(file) });
        }
    };

    const [boxes, setBoxes] = useState([
        { id: 1, name: 'T-shirt', image: '' },
        { id: 2, name: 'Sweatshirt', image: '' },
        { id: 3, name: 'Hoodie', image: '' },
    ]);
    const [popup, setPopup] = useState({ visible: false, id: null });
    const [formData, setFormData] = useState({ name: '', image: null });

    const handleEdit = (id) => {
        const box = boxes.find((box) => box.id === id);
        setPopup({ visible: true, id });
        setFormData({ name: box.name, image: box.image });
    };

    const handleSave = () => {
        if (popup.id) {
            setBoxes((prev) =>
                prev.map((box) =>
                    box.id === popup.id ? { ...box, name: formData.name, image: formData.image } : box
                )
            );
        } else {
            const newBox = {
                id: Date.now(),
                name: formData.name,
                image: formData.image || 'https://via.placeholder.com/346x163',
            };
            setBoxes((prev) => [...prev, newBox]);
        }
        setPopup({ visible: false, id: null });
        setFormData({ name: '', image: null });
    };
    const [trimsBoxes, setTrimsBoxes] = useState([
        { id: 1, name: 'Silicone Tag', image: 'https://via.placeholder.com/346x163?text=Silicone+Tag' },
        { id: 2, name: 'Main Label', image: 'https://via.placeholder.com/346x163?text=Main+Label' },
        { id: 3, name: 'Wash Care Label (T-shirt)', image: 'https://via.placeholder.com/346x163?text=Wash+Care+Label+(T-shirt)' },
        { id: 4, name: 'Wash Care Label (Hood/Sweat)', image: 'https://via.placeholder.com/346x163?text=Wash+Care+Label+(Hood/Sweat)' },
    ]);

    const [trimsPopup, setTrimsPopup] = useState({ visible: false, id: null });
    const [trimsFormData, setTrimsFormData] = useState({ name: '', image: null });

    const handleTrimsAdd = () => {
        setTrimsPopup({ visible: true, id: null });
        setTrimsFormData({ name: '', image: null });
    };

    const handleTrimsEdit = (id) => {
        const box = trimsBoxes.find((box) => box.id === id);
        setTrimsPopup({ visible: true, id });
        setTrimsFormData({ name: box.name, image: box.image });
    };

    const handleTrimsSave = () => {
        if (trimsPopup.id) {
            setTrimsBoxes((prev) =>
                prev.map((box) =>
                    box.id === trimsPopup.id
                        ? { ...box, name: trimsFormData.name, image: trimsFormData.image }
                        : box
                )
            );
        } else {
            const newBox = {
                id: Date.now(),
                name: trimsFormData.name,
                image: trimsFormData.image || 'https://via.placeholder.com/346x163',
            };
            setTrimsBoxes((prev) => [...prev, newBox]);
        }
        setTrimsPopup({ visible: false, id: null });
        setTrimsFormData({ name: '', image: null });
    };
    const [collections, setCollections] = useState([
        { id: 1, name: "Collection 1", isEditing: false },
    ]);
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
        { id: 1, name: 'T-shirt', image: '' },
        { id: 2, name: 'Sweatshirt', image: '' },
        { id: 3, name: 'Hoodie', image: '' },
    ]);
    const [parameterspopup, setParametersPopup] = useState({ visible: false, id: null });

    const handleEditParameter = (id) => {
        const parameter = parameters.find((param) => param.id === id);
        setParametersPopup({ visible: true, id });
        setFormData({ name: parameter.name, image: parameter.image });
    };

    const handleSaveParameter = () => {
        if (parameterspopup.id) {
            setParameters((prev) =>
                prev.map((parameter) =>
                    parameter.id === parameterspopup.id ? { ...parameter, name: formData.name, image: formData.image } : parameter
                )
            );
        } else {
            const newParameter = {
                id: Date.now(),
                name: formData.name,
                image: formData.image || 'https://via.placeholder.com/346x163',
            };
            setParameters((prev) => [...prev, newParameter]);
        }
        setParametersPopup({ visible: false, id: null });
        setFormData({ name: '', image: null });
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
                            <button className="underline" onClick={handleAddCategory}>Add</button>
                            <button className="underline">Delete</button>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        {Category.map((input) => (
                            <div
                                key={input.id}
                                className="flex relative items-center border rounded-xl px-4 py-5 text-center text-lg"
                                style={{
                                    borderColor: input.color, // Unique border color
                                }}
                            >
                                <input
                                    type="text"
                                    value={input.value}
                                    readOnly={!input.isEditable}
                                    onChange={(e) => handleCategoryChange(input.id, e.target.value)}
                                    style={{
                                        color: input.color, // Unique text color
                                    }}
                                    className={`border-none text-center outline-none ${input.isEditable ? "bg-white" : "bg-transparent"}`}
                                />
                                <button
                                    onClick={() => toggleCategoryEdit(input.id)}
                                    className="ml-2 absolute right-0 p-3 bottom-0"
                                >
                                    {input.isEditable ? (
                                        <LiaSaveSolid />
                                    ) : (
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
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Category Popup */}
                    {showCategoryPopup && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg">
                                <h3 className="mb-4">New Category</h3>
                                <input
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="p-2 rounded w-full mb-4"
                                />
                                <button
                                    onClick={() => setShowCategoryPopup(false)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveNewCategory}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Save Category
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex gap-10 pb-5">
                        <div>
                            <h1 className="font-bold text-xl">Category (Gender wise)</h1>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="underline"
                                onClick={() => setCategoryGenderPopup(true)}
                            >
                                Add
                            </button>
                            <button className="underline">Delete</button>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        {GenderCategory.map((input) => (
                            <div
                                key={input.id}
                                className="flex relative items-center border rounded-xl px-4 py-5 text-center text-lg"
                                style={{
                                    borderColor: input.color, // Unique border color
                                }}
                            >
                                <input
                                    type="text"
                                    value={input.value}
                                    readOnly={!input.isEditable}
                                    onChange={(e) => handleGenderCategoryChange(input.id, e.target.value)}
                                    style={{
                                        color: input.color, // Unique text color
                                    }}
                                    className={`border-none text-center outline-none ${input.isEditable ? "bg-white" : "bg-transparent"}`}
                                />
                                <button
                                    onClick={() => toggleGenderCategoryEdit(input.id)}
                                    className="ml-2 absolute right-0 p-3 bottom-0"
                                >
                                    {input.isEditable ? (
                                        <LiaSaveSolid />
                                    ) : (
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
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Category Gender Popup */}
                    {CategoryGenderPopup && (
                        <div className="fixed inset-0 bg-gray-500 z-50 h-full bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg">
                                <h3 className="mb-4">New Category Gender</h3>
                                <input
                                    type="text"
                                    placeholder="Enter Gender Category"
                                    value={newGenderCategoryName}
                                    onChange={(e) => setNewGenderCategoryName(e.target.value)}
                                    className="p-2 rounded w-full mb-4"
                                />
                                <button
                                    onClick={() => setCategoryGenderPopup(false)}
                                    className="border px-4 text-sm py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveGenderCategory}
                                    className="bg-black text-white ml-3 text-sm px-4 py-2 rounded-lg"
                                >
                                    Apply
                                </button>
                            </div>
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
                    </div>

                    {/* Image Upload and Preview Section */}
                    {selectedOption && (
                        <div className="flex items-center gap-5">
                            <div>
                                <div className="flex gap-5 px-10">
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div
                                    className="border-2 w-[300px] left-0 mt-10 border-dashed border-gray-300 bg-[#FCFCFC] flex items-center justify-center"
                                    style={{ height: "150px" }}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
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
                            <div>
                                <label
                                    onClick={() => setIsEditing(true)}
                                    htmlFor="fileInput"
                                    className={`rounded cursor-pointer`}
                                >
                                    <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className="border-b p-10 space-y-10">
                <div>
                    <div>
                        <div className="flex gap-10 pb-5">
                            <div>
                                <h1 className="font-bold text-xl">Constriction Sheet</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-4 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {boxes.map((box) => (
                                    <div key={box.id} className="p-4">
                                        <div className="flex gap-10 items-center pb-2">
                                            <h1 className="text-xl text-center">{box.name}</h1>
                                            <button
                                                onClick={() => handleEdit(box.id)}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div>
                                            <img
                                                src={box.image}
                                                className="h-[163px] bg-[#F3F3F3] border border-dashed border-[#CACACA] w-[346.67px] object-cover mb-2"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Popup Modal */}
                            {popup.visible && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded shadow-md w-[400px]">
                                        <h2 className="text-lg font-bold mb-4">{popup.id ? 'Edit Box' : 'Add Box'}</h2>
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-2 border-b rounded mb-4"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    image: URL.createObjectURL(e.target.files[0]),
                                                })
                                            }
                                            className="w-full mb-4"
                                        />
                                        <div className="flex mt-5 gap-2">
                                            <button
                                                className="px-4 py-2 border text-black rounded-lg text-sm"
                                                onClick={() => setPopup({ visible: false, id: null })}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                                                onClick={handleSave}
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
                                <button className="underline">Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {trimsBoxes.map((box) => (
                                <div key={box.id} className="p-4">
                                    <div className="flex gap-10 items-center pb-2">
                                        <h1 className="text-xl text-nowrap">{box.name}</h1>
                                        <button onClick={() => handleTrimsEdit(box.id)}>
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
                                    <div>
                                        <img
                                            src={box.image}
                                            alt={box.name}
                                            className="h-[163px] bg-[#FCFCFC] border border-dashed border-[#CACACA] w-[346.67px] object-cover mb-2"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Popup Modal */}
                        {trimsPopup.visible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded shadow-md w-[400px]">
                                    <h2 className="text-lg font-bold mb-4">
                                        {trimsPopup.id ? 'Edit Box' : 'Add Box'}
                                    </h2>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={trimsFormData.name}
                                        onChange={(e) => setTrimsFormData({ ...trimsFormData, name: e.target.value })}
                                        className="w-full p-2 border rounded mb-4"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setTrimsFormData({
                                                ...trimsFormData,
                                                image: URL.createObjectURL(e.target.files[0]),
                                            })
                                        }
                                        className="w-full mb-4"
                                    />
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
                            <button className="underline">Delete</button>
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
                                    value={collection.name}
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
                                            onClick={() => handleSaveCollection(collection.id, collection.name)}
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

            <div className="border-b p-10 space-y-10">
                <div>
                    <div className="flex gap-10">
                        <div>
                            <h1 className="font-bold text-xl">Required Parameters</h1>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="p-4 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {parameters.map((parameter) => (
                                <div key={parameter.id} className="p-4">
                                    <div className="flex gap-10 items-center pb-2">
                                        <h1 className="text-xl text-center">{parameter.name}</h1>
                                        <button
                                            onClick={() => handleEditParameter(parameter.id)}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625" stroke="#0C2F2F" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <img
                                            src={parameter.image}
                                            className="h-[163px] bg-[#F3F3F3] border border-dashed border-[#CACACA] w-[346.67px] object-cover mb-2"
                                        />
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
                                        className="w-full p-2 border-b rounded mb-4"
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                image: URL.createObjectURL(e.target.files[0]),
                                            })
                                        }
                                        className="w-full mb-4"
                                    />
                                    <div className="flex mt-5 gap-2">
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
        </section>
    );
};
