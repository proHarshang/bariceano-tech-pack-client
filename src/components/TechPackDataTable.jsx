import React, { useEffect, useState, useRef, useCallback } from "react";
import { handleCommentSubmit, deleteTechPack } from '../API/TechPacks';
// import TechPackPdfGenerator from '../TechPackPdfGenerator';
import NewPdfGenerator from '../NewPDF';
import { useForm } from "react-hook-form";
import Pagination from '../common/Pagination.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa";
import generatePdf from "../utility/generatePDF";

const TechPackDataTable = ({ data = [], fetchTechPacks }) => {
    const { user } = useAuth();
    const sidebarRef = useRef(null);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(null);
    const { register, watch } = useForm();
    const isCommentChecked = watch("Comment"); // Watch the checkbox state    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCollection = queryParams.get("collection");

    const navigate = useNavigate();

    data = data?.filter(item => item.designCollection === selectedCollection || selectedCollection === "all collection" || queryParams.size === 0) || [];

    data = isCommentChecked
        ? data.filter(item => item.comment?.message) // Filter data with a comment
        : data; // Show all data if checkbox is not checked

    const formatDate = (dateString) => {
        if (!dateString) return "Not Modified Yet";
        const date = new Date(dateString);
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const [comment, setComment] = useState({
        name: "",  // Temporary name
        message: "",   // Comment message
        date: new Date().toISOString() // Comment date
    });

    const toggleSidebar = useCallback((styleNo = null, comment = null) => {
        if (styleNo) {
            setIsSidebarOpen(styleNo); // Open sidebar with styleNo
            const comment = data.find(tp => tp.styleNo === styleNo)?.comment
            setComment(comment ? {
                name: comment.name || "",
                message: comment.message || "",
                date: comment.date,
            } : {
                name: user.Name || "",
                message: "",   // Ensure message is empty
                date: new Date().toISOString(), // Ensure date is reset
            });
        } else {
            setIsSidebarOpen(null); // Close sidebar
            setComment({
                name: user.Name || "",
                message: "",   // Ensure message is empty
                date: new Date().toISOString(), // Ensure date is reset
            });
        }
    }, [user.Name]);

    const handleCommentChange = (event) => {
        const { name, value } = event.target;
        setComment((prev) => ({
            ...prev,
            [name]: value,
            date: new Date().toISOString(), // Automatically set the current date
        }));
    };
    const handleApply = () => {
        toggleSidebar(false)
        window.location.reload();
        fetchTechPacks();
    }



    // -- to close sidebar by clicking outside of div --
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar(false);
            }
        }
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen, toggleSidebar]);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // search logic 
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBySearch = data.filter(techpack =>
        techpack.styleNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        techpack.designer?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };


    // filter logic
    const [selectedDesigner, setSelectedDesigner] = useState([]); // Array to hold selected designers
    const [selectedGender, setSelectedGender] = useState(""); // State for gender filter
    const [selectedCategory, setSelectedCategory] = useState(""); // State for gender filter
    const [selectedStatus, setSelectedStatus] = useState(""); // State for gender filter
    const [showDesignerOptions, setShowDesignerOptions] = useState(false); // State to control visibility of designer options
    const [showGenderOptions, setShowGenderOptions] = useState(false); // State to control visibility of designer options
    const [showCategoryOptions, setShowCategoryOptions] = useState(false); // State to control visibility of designer options
    const [showCategoryStatus, setShowCategoryStatus] = useState(false); // State to control visibility of designer options

    const uniqueDesigners = Array.from(new Set(filteredBySearch.map(item => item.designer)));
    const uniqueGenders = Array.from(new Set(filteredBySearch.map(item => item.gender)));
    const uniqueCategory = Array.from(new Set(filteredBySearch.map(item => item.category)));
    const uniqueStatus = Array.from(new Set(filteredBySearch.map(item => item.state)));

    // Filter data based on selected designer and gender
    const filteredData = filteredBySearch.filter(item => {
        const isDesignerSelected = selectedDesigner.length === 0 || selectedDesigner.includes(item.designer);
        const isGenderSelected = selectedGender.length === 0 || selectedGender.includes(item.gender);
        const isCategorySelected = selectedCategory.length === 0 || selectedCategory.includes(item.category);
        const isStatusSelected = selectedStatus.length === 0 || selectedStatus.includes(item.state);
        return isDesignerSelected && isGenderSelected && isCategorySelected && isStatusSelected;
    });

    // shorting logic
    const [isTimeAscending, setIsTimeAscending] = useState(false); // For time (modifiedAt) sorting
    const [isStyleNoAscending, setIsStyleNoAscending] = useState(false); // For styleNo sorting
    const [isStyleNoSorting, setIsStyleNoSorting] = useState(false); // Flag to check if we are sorting by styleNo

    const handleSort = (column) => {
        if (column === 'date') {
            setIsStyleNoSorting(false); // Stop sorting by styleNo
            setIsTimeAscending(!isTimeAscending); // Toggle sorting order for date
        } else if (column === 'styleNo') {
            setIsStyleNoSorting(true); // Enable sorting by styleNo
            setIsStyleNoAscending(!isStyleNoAscending); // Toggle sorting order for StyleNo
        }
    };

    // Sorting logic
    const sortedData = [...filteredData].sort((a, b) => {
        if (isStyleNoSorting) {
            // If sorting by Style No
            return isStyleNoAscending
                ? a.styleNo.localeCompare(b.styleNo) // Ascending order
                : b.styleNo.localeCompare(a.styleNo); // Descending order
        } else {
            // If sorting by modifiedAt
            return isTimeAscending
                ? new Date(a.modifiedAt) - new Date(b.modifiedAt) // Oldest to newest
                : new Date(b.modifiedAt) - new Date(a.modifiedAt); // Newest to oldest
        }
    });


    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCopy = async (item) => {
        const confirmCopy = window.confirm("Are you sure you want to copy this item?");
        if (confirmCopy) {
            try {
                let copyCount = 1;
                if (item.styleNo.includes("copied")) {
                    const matches = item.styleNo.match(/copied\((\d+)\)/);
                    if (matches) {
                        copyCount = parseInt(matches[1]) + 1;
                    }
                }

                // Ensure all required fields are provided
                const copiedItem = {
                    ...item,
                    styleNo: item.styleNo.split(" ")[0] + ` copied(${copyCount})`,
                    designer: item.designer, // Default if undefined
                    category: item.category, // Default if undefined
                    gender: item.gender,       // Default if undefined
                    state: item.state,         // Default if undefined
                    slides: item.slides || [],                   // Default if undefined
                };

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/design/techpacks/add`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "api-key": process.env.REACT_APP_API_KEY,
                        },
                        body: JSON.stringify(copiedItem),
                    }
                );
                if (response.ok) {
                    const newTechPack = await response.json();
                    // Update the table state with the new item
                    data = ((prevData) => [...prevData, newTechPack.data]);
                    window.location.reload();
                } else {
                    const errorResponse = await response.json();
                    console.error("API Error:", errorResponse);
                    alert(`Failed to copy the TechPack: ${errorResponse.message || "Unknown error"}`);
                }
            } catch (error) {
                console.error("Unexpected error while copying the TechPack:", error);
                alert("An unexpected error occurred while copying the TechPack.");
            }
        }
    };

    // delete button
    const handleDeleteTechpack = async (id) => {
        // Use the categoryDelete hook to delete the TechPack
        const deleted = await deleteTechPack(id);
        if (deleted.status) {
            // Remove the deleted TechPack from the state
            data = ((prevTechPacks) =>
                prevTechPacks.filter((TechPack) => TechPack !== id)
            );
            window.location.reload();
        } else {
            console.error('Failed to delete TechPack');
        }
    };

    const handleEditClick = (itemId) => {
        // window.location.href = `/tech-pack?id=${itemId}`
        navigate(`/tech-pack?id=${itemId}`)
    };

    const [isDownloading, setIsDownloading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const generateAllPDFs = async () => {
        setIsDownloading(true);

        for (let i = 0; i < sortedData.length; i++) {
            setCurrentIndex(i); // Set the current object to process
            await generatePdf(sortedData[i], setIsDownloading)
        }

        setCurrentIndex(null);
        setIsDownloading(false);
    };


    return (
        <>
            <div className='w-full mx-auto max-w-[1500px] table px-10 pb-10'>
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
                    <div className='flex flex-col gap-2 w-1/2'>
                        <span>Gender</span>
                        <div className="border bg-white border-black px-2  h-auto flex flex-col">
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
                                                checked={selectedGender.includes(gender)}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    if (checked) {
                                                        setSelectedGender((prev) => [...prev, value]);
                                                    } else {
                                                        setSelectedGender((prev) =>
                                                            prev.filter((gender) => gender !== value)
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
                    </div>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <span>Category</span>
                        <div className="border bg-white border-black px-2  h-auto flex flex-col">
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
                                                checked={selectedCategory.includes(category)}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    if (checked) {
                                                        setSelectedCategory((prev) => [...prev, value]);
                                                    } else {
                                                        setSelectedCategory((prev) =>
                                                            prev.filter((category) => category !== value)
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
                    </div>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <span>Status</span>
                        <div className="border bg-white border-black px-2  h-auto flex flex-col">
                            <button
                                type="button"
                                className="w-full text-left py-1"
                                onClick={() => setShowCategoryStatus(!showCategoryStatus)}
                            >
                                Select Status
                            </button>

                            {showCategoryStatus && (
                                <div className="flex flex-col space-y-2 mt-2">
                                    {uniqueStatus.map((status, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id={`status-${index}`}
                                                value={status}
                                                checked={selectedStatus.includes(status)}
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    if (checked) {
                                                        setSelectedStatus((prev) => [...prev, value]);
                                                    } else {
                                                        setSelectedStatus((prev) =>
                                                            prev.filter((status) => status !== value)
                                                        );
                                                    }
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`status-${index}`}>{status}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-[42px] h-[42px] pt-[32px]">
                        <label
                            className={`cursor-pointer px-3 h-8 text-nowrap border border-black bg-transparent flex items-center justify-center `}
                        >
                            <input
                                type="checkbox"
                                {...register("Comment")}
                                className="hidden" // Hide the actual checkbox
                            />
                            {isCommentChecked ? (
                                <FaCommentDots className="size-7" />) : (
                                <FaRegCommentDots className="size-7" />
                            )}
                        </label>
                    </div>
                </div>
                <div className='w-full'>
                    {/* {submitStatus && (
                        <p className={`fixed right-[40%] top-[20%] transform -translate-y-1/2 px-3 text-sm font-bold py-2 rounded-lg shadow-lg text-white ${submitStatus.message == null ? "hidden" : "visible"}  ${submitStatus?.status ? "bg-green-600" : "bg-red-600"} animate-slide-down-up`}>
                            {submitStatus?.message}
                        </p>
                    )} */}
                    <div className="flex justify-between items-end">
                        <span>
                            Total {sortedData?.length} Tech Packs
                        </span>
                        <div>
                            <button
                                className="border py-1 bg-black text-white text-nowrap flex gap-2 px-4"
                                onClick={generateAllPDFs}
                            >
                                Generate PDFs
                            </button>

                            {/* Show progress while generating PDFs */}
                            {isDownloading && currentIndex !== null && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-white p-4 rounded shadow-lg">
                                        <p>Downloading PDF {currentIndex + 1} of {sortedData.length}...</p>
                                    </div>
                                </div>
                            )}

                            {/* Render only one NewPdfGenerator at a time */}
                            {currentIndex !== null && <NewPdfGenerator data={sortedData[currentIndex]} />}
                        </div>

                    </div>
                    <table className='techPack-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th onClick={() => handleSort('styleNo')}>Style No {isStyleNoAscending ? '▲' : '▼'}</th>
                                <th onClick={() => handleSort('date')}>Last Edited {isTimeAscending ? '▼' : '▲'}</th>
                                <th>Designer</th>
                                <th>Status</th>
                                <th>Gender</th>
                                <th>Category</th>
                                <th>Comment</th>
                                <th>
                                    <h1 className="text-center">
                                        Actions
                                    </h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((item, index) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{item.styleNo}</td>
                                        <td>{formatDate(item?.modifiedAt)}</td>
                                        <td>{item.designer}</td>
                                        <td>{item?.state}</td>
                                        <td>{item?.gender}</td>
                                        <td>{item?.category}</td>
                                        <td>
                                            {item.comment?.message ? (
                                                <button type="button" className="m-auto px-3" onClick={() => toggleSidebar(item.styleNo, item.comment.message)}>
                                                    <FaCommentDots className="size-6" />

                                                </button>
                                            ) : <button type="button" className="m-auto px-3" title="Add comment" onClick={() => toggleSidebar(item.styleNo, item.comment?.message)}>
                                                <FaRegCommentDots className="size-6" />

                                            </button>}
                                        </td>
                                        <td className="flex items-center gap-2 w-full">
                                            <div className="action-buttons w-1/2">
                                                <button type="button" className="copy-button hover:bg-zinc-300" onClick={() => handleCopy(item)}>Copy</button>
                                                <button type="button" className="edit-button hover:bg-zinc-300" onClick={() => handleEditClick(item._id)}>Edit</button>
                                            </div>
                                            <div className="action-buttons w-1/2">
                                                <div className="flex justify-center items-center download-button hover:bg-green-300">
                                                    <NewPdfGenerator data={currentItems[index]} />
                                                </div>
                                                <button type="button" onClick={() => {
                                                    const confirmDelete = window.confirm(
                                                        "Are you sure you want to delete this TechPack?"
                                                    );
                                                    const id = item._id
                                                    if (confirmDelete) {
                                                        handleDeleteTechpack(id);
                                                    }
                                                }} className="delete-button  hover:bg-red-300">Delete</button>
                                            </div>
                                        </td>
                                        {isSidebarOpen && (
                                            <div ref={sidebarRef} className="fixed top-0 right-0 h-full w-1/4 max-w-sm bg-white shadow-lg z-50 p-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="text-lg font-bold">Add Comment</h2>
                                                </div>
                                                <textarea
                                                    className="w-full h-40 p-2 border rounded"
                                                    name="message"  // Bind the name to the comment message field
                                                    value={comment.message}  // Bind the textarea to the state
                                                    onChange={handleCommentChange}  // Handle the change of comment
                                                    placeholder="Enter your comment here..."
                                                ></textarea>
                                                <span>{comment.name}</span>
                                                <br />
                                                <span>{isSidebarOpen}</span>
                                                <br />
                                                <span>{formatDate(comment?.date)}</span>
                                                <div className="flex mt-20">
                                                    <button type="button" onClick={() => {
                                                        handleCommentSubmit(isSidebarOpen, comment);
                                                        handleApply();
                                                    }} className="mt-4 p-5 pt-0 text-xl text-blue-500 hover:underline">
                                                        Apply
                                                    </button>

                                                    <button type="button" onClick={() => toggleSidebar(false)} className="mt-4 p-5 pt-0 text-xl text-blue-500 hover:underline">
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={sortedData.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div >

        </>
    );
};

export default TechPackDataTable;
