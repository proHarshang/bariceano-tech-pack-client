import React, { useEffect, useState, useRef, useCallback } from "react";
import { handleCommentSubmit, deleteTechPack } from '../API/TechPacks';
// import TechPackPdfGenerator from '../TechPackPdfGenerator';
import NewPdfGenerator from '../NewPDF';
import { useForm } from "react-hook-form";
import Pagination from '../common/Pagination.jsx';
import { useTechPack } from "../context/TechPackContext";
import { useNavigate } from 'react-router-dom';

const TechPackDataTable = ({ data = [] }) => {
    const sidebarRef = useRef(null);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(null);
    const { register, watch } = useForm();
    const isCommentChecked = watch("Comment"); // Watch the checkbox state

    const { submitStatus } = useTechPack();

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
        name: "user",  // Temporary name
        message: "",   // Comment message
        date: new Date().toISOString() // Comment date
    });


    const toggleSidebar = useCallback((styleNo = null, comment = null) => {
        if (styleNo) {
            setIsSidebarOpen(styleNo); // Open sidebar with styleNo
            setComment({
                name: "user",  // Temporarily set name to "user"
                message: comment?.message || "", // Ensure message is set even if undefined
                date: comment?.date || new Date().toISOString(), // Ensure date is set even if undefined
            });
        } else {
            setIsSidebarOpen(null); // Close sidebar
            setComment({
                name: "user",  // Temporarily set name to "user"
                message: "",   // Ensure message is empty
                date: new Date().toISOString(), // Ensure date is reset
            });
        }
    }, []);

    const handleCommentChange = (event) => {
        const { name, value } = event.target;
        setComment((prev) => ({
            ...prev,
            [name]: value,
            date: new Date().toISOString(), // Automatically set the current date
        }));
    };


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
        techpack.styleNo?.includes(searchTerm) ||
        techpack.designer?.includes(searchTerm));

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

    const navigate = useNavigate();

    const handleEditClick = (itemId) => {
        navigate(`/tech-pack?id=${itemId}`);
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
                    <div className="w-[32px] h-[32px] pt-[32px]">
                        <label
                            className={`cursor-pointer px-4 h-8 text-nowrap border border-black flex items-center justify-center ${isCommentChecked ? "bg-black text-white" : "bg-white text-black"}`}
                        >
                            <input
                                type="checkbox"
                                {...register("Comment")}
                                className="hidden" // Hide the actual checkbox
                            />
                            {isCommentChecked ? (
                                <span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6666 10C11.6666 10.9205 10.9204 11.6667 9.99992 11.6667C9.07942 11.6667 8.33325 10.9205 8.33325 10C8.33325 9.07954 9.07942 8.33337 9.99992 8.33337C10.9204 8.33337 11.6666 9.07954 11.6666 10Z" fill="white" />
                                        <path d="M10 16.3167C5.35917 16.3167 1.50109 13.6111 0.366076 10C1.50109 6.38899 5.35917 3.68337 10 3.68337C14.6409 3.68337 18.4989 6.38899 19.6339 10C18.4989 13.6111 14.6409 16.3167 10 16.3167ZM10 13.313C12.0585 13.313 13.6833 11.8635 13.6833 10C13.6833 8.13659 12.0585 6.68708 10 6.68708C7.94146 6.68708 6.31667 8.13658 6.31667 10C6.31667 11.8635 7.94146 13.313 10 13.313Z" stroke="white" strokeWidth="0.7" />
                                    </svg>
                                </span>
                            ) : (
                                <span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.7288 4.50667L15.4932 6.27103M14.8632 2.95241L10.0906 7.72504C9.84433 7.97135 9.67641 8.28505 9.60808 8.62658L9.16675 10.8333L11.3735 10.392C11.715 10.3237 12.0287 10.1558 12.275 9.9095L17.0477 5.13686C17.6509 4.53364 17.6509 3.55563 17.0477 2.95242C16.4444 2.3492 15.4664 2.34919 14.8632 2.95241Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.8333 12.5V15C15.8333 15.9205 15.0871 16.6666 14.1666 16.6666H4.99992C4.07944 16.6666 3.33325 15.9205 3.33325 15V5.83329C3.33325 4.91282 4.07944 4.16663 4.99992 4.16663H7.49992" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </label>
                    </div>
                </div>
                <div className='w-full'>
                    {submitStatus && (
                        <p className={`fixed right-[40%] top-[20%] transform -translate-y-1/2 px-3 text-sm font-bold py-2 rounded-lg shadow-lg text-white ${submitStatus.message == null ? "hidden" : "visible"}  ${submitStatus?.status ? "bg-green-600" : "bg-red-600"} animate-slide-down-up`}>
                            {submitStatus?.message}
                        </p>
                    )}
                    <div className="flex justify-between items-end">
                        <span>
                            Total {sortedData?.length} Tech Packs
                        </span>
                        <div className="border py-1 bg-black text-white text-nowrap flex gap-2 px-4">
                            <NewPdfGenerator data={sortedData} /> All
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
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.6666 10C11.6666 10.9205 10.9204 11.6667 9.99992 11.6667C9.07942 11.6667 8.33325 10.9205 8.33325 10C8.33325 9.07954 9.07942 8.33337 9.99992 8.33337C10.9204 8.33337 11.6666 9.07954 11.6666 10Z" fill="black" />
                                                        <path d="M10 16.3167C5.35917 16.3167 1.50109 13.6111 0.366076 10C1.50109 6.38899 5.35917 3.68337 10 3.68337C14.6409 3.68337 18.4989 6.38899 19.6339 10C18.4989 13.6111 14.6409 16.3167 10 16.3167ZM10 13.313C12.0585 13.313 13.6833 11.8635 13.6833 10C13.6833 8.13659 12.0585 6.68708 10 6.68708C7.94146 6.68708 6.31667 8.13658 6.31667 10C6.31667 11.8635 7.94146 13.313 10 13.313Z" stroke="black" strokeWidth="0.7" />
                                                    </svg>
                                                </button>
                                            ) : <button type="button" className="m-auto px-3" title="Add comment" onClick={() => toggleSidebar(item.styleNo, item.comment?.message)}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.7288 4.50667L15.4932 6.27103M14.8632 2.95241L10.0906 7.72504C9.84433 7.97135 9.67641 8.28505 9.60808 8.62658L9.16675 10.8333L11.3735 10.392C11.715 10.3237 12.0287 10.1558 12.275 9.9095L17.0477 5.13686C17.6509 4.53364 17.6509 3.55563 17.0477 2.95242C16.4444 2.3492 15.4664 2.34919 14.8632 2.95241Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.8333 12.5V15C15.8333 15.9205 15.0871 16.6666 14.1666 16.6666H4.99992C4.07944 16.6666 3.33325 15.9205 3.33325 15V5.83329C3.33325 4.91282 4.07944 4.16663 4.99992 4.16663H7.49992" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>}
                                        </td>
                                        <td className="flex items-center gap-2 w-full">
                                            <div className="action-buttons w-1/2">
                                                <button type="button" className="copy-button hover:bg-zinc-300" onClick={() => handleCopy(item)}                                            >Copy</button>
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
            {isSidebarOpen && (
                <div ref={sidebarRef} className="fixed top-0 right-0 h-full w-1/4 max-w-sm bg-white shadow-lg z-50 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Add Comment</h2>
                    </div>
                    <textarea
                        className="w-full h-40 p-2 border rounded"
                        value={comment.message}
                        onChange={handleCommentChange}
                        placeholder="Enter your comment here..."
                    ></textarea>
                    <span>{comment.name}</span>
                    <br />
                    <span>{formatDate(comment?.date)}</span>
                    <div className="flex mt-20">
                        <button type="button" onClick={() => {
                            handleCommentSubmit(isSidebarOpen, comment);
                            toggleSidebar(false);
                        }} className="mt-4 p-5 pt-0 text-xl text-blue-500 hover:underline">
                            Apply
                        </button>
                        <button type="button" onClick={() => toggleSidebar(false)} className="mt-4 p-5 pt-0 text-xl text-blue-500 hover:underline">
                            Close
                        </button>
                    </div>
                </div>
            )
            }
        </>
    );
};

export default TechPackDataTable;
