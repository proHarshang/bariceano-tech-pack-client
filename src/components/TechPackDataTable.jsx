import { useState, useCallback } from 'react';
import { useRef, useEffect } from 'react';
import { handleCommentSubmit } from '../API/TechPacks';
import TechPackPdfGenerator from '../TechPackPdfGenerator';
import { useForm } from "react-hook-form";

const TechPackDataTable = ({ data = [] }) => {
    const sidebarRef = useRef(null);
    const { register, watch } = useForm();
    const isCommentChecked = watch("Comment"); // Watch the checkbox state

    data = isCommentChecked
        ? data.filter(item => item.comment) // Filter data with a comment
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

    const [isSidebarOpen, setIsSidebarOpen] = useState(null); // Use `null` as initial state for clarity
    const [comment, setComment] = useState('');

    const toggleSidebar = useCallback((techPachId = null, comment = null) => {
        if (techPachId) {
            setIsSidebarOpen(techPachId); // Store only the orderId to indicate which sidebar is open
            setComment(comment || ''); // Update comment state with the selected order's comment
        } else {
            setIsSidebarOpen(null); // Close sidebar
            setComment(''); // Clear the comment when the sidebar is closed
        }
    })

    const handleCommentChange = (e) => {
        setComment(e.target.value); // Update comment state with user input
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

    // search logic 
    const [searchTerm, setSearchTerm] = useState('');
    const filteredBySearch = data.filter(techpack =>
        techpack.style_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        techpack.designerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        techpack.poNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // shorting logic
    const [isAscending, setIsAscending] = useState(true);
    const handleSort = () => {
        setIsAscending(!isAscending); // Toggle sorting order
    };
    const sortedData = [...filteredBySearch].sort((a, b) => {
        if (isAscending) {
            return new Date(a.modifiedAt) - new Date(b.modifiedAt); // Oldest to newest
        } else {
            return new Date(b.modifiedAt) - new Date(a.modifiedAt); // Newest to oldest
        }
    });

    // filter logic
    const [selectedDesigner, setSelectedDesigner] = useState([]); // Array to hold selected designers
    const [selectedGender, setSelectedGender] = useState(""); // State for gender filter
    const [showDesignerOptions, setShowDesignerOptions] = useState(false); // State to control visibility of designer options
    const [showGenderOptions, setShowGenderOptions] = useState(false); // State to control visibility of designer options

    const uniqueDesigners = Array.from(new Set(sortedData.map(item => item.designerName)));
    const uniqueGenders = Array.from(new Set(sortedData.map(item => item.gender)));

    // Filter data based on selected designer and gender
    const filteredData = sortedData.filter(item => {
        const isDesignerSelected = selectedDesigner.length === 0 || selectedDesigner.includes(item.designerName);
        const isGenderSelected = selectedGender.length === 0  ||  selectedGender.includes(item.gender);
        return isDesignerSelected && isGenderSelected;
    });


    return (
        <>
            <div className='px-20 py-10 max-w-[1400px] mx-auto flex flex-col gap-10'>
                <div className='w-full flex justify-between gap-10'>
                    <div className="flex flex-col w-full gap-2">
                        <span>Search</span>
                        <div className="border bg-white border-black px-1 w-full md:px-[7px] h-8 md:h-8 flex justify-start">
                            <input
                                type="text"
                                placeholder="Enter Techpack Id or Name"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)} // Ensure state update
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <span>Designer</span>
                        <div className="border bg-white border-black px-2 w-[200px] h-auto flex flex-col">
                            <button
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
                    <div className='flex flex-col gap-2 w-full'>
                        <span>Gender</span>
                        <div className="border bg-white border-black px-2 w-[200px] h-auto flex flex-col">
                            <button
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
                        {/* <div className='border bg-white border-black px-2 w-[200px] h-8 flex items-center'>
                            <select
                                id="designer-filter"
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="w-full h-full"
                            >
                                <option value="">All Genders</option>
                                {uniqueGenders.map((gender, index) => (
                                    <option key={index} value={gender}>{gender}</option>
                                ))}
                            </select>
                        </div> */}
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
                                        <path d="M10 16.3167C5.35917 16.3167 1.50109 13.6111 0.366076 10C1.50109 6.38899 5.35917 3.68337 10 3.68337C14.6409 3.68337 18.4989 6.38899 19.6339 10C18.4989 13.6111 14.6409 16.3167 10 16.3167ZM10 13.313C12.0585 13.313 13.6833 11.8635 13.6833 10C13.6833 8.13659 12.0585 6.68708 10 6.68708C7.94146 6.68708 6.31667 8.13658 6.31667 10C6.31667 11.8635 7.94146 13.313 10 13.313Z" stroke="white" stroke-width="0.7" />
                                    </svg>
                                </span>
                            ) : (
                                <span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.7288 4.50667L15.4932 6.27103M14.8632 2.95241L10.0906 7.72504C9.84433 7.97135 9.67641 8.28505 9.60808 8.62658L9.16675 10.8333L11.3735 10.392C11.715 10.3237 12.0287 10.1558 12.275 9.9095L17.0477 5.13686C17.6509 4.53364 17.6509 3.55563 17.0477 2.95242C16.4444 2.3492 15.4664 2.34919 14.8632 2.95241Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.8333 12.5V15C15.8333 15.9205 15.0871 16.6666 14.1666 16.6666H4.99992C4.07944 16.6666 3.33325 15.9205 3.33325 15V5.83329C3.33325 4.91282 4.07944 4.16663 4.99992 4.16663H7.49992" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </label>
                    </div>

                </div>
                <div className='w-full'>
                    <span>
                        Total {filteredData?.length} Tech Packs
                    </span>
                    <table className='techPack-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th onClick={handleSort}>Last Edited {isAscending ? '▼' : '▲'}</th>
                                <th>Designer Name</th>
                                <th>Status</th>
                                <th>Gender</th>
                                <th>Category</th>
                                <th>Comment</th>
                                <th>Actions</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.style_Name}</td>
                                    <td>{formatDate(item.modifiedAt)}</td>
                                    <td>{item.designerName}</td>
                                    <td>{item.state}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        {item.comment ? (
                                            <button className="m-auto px-3" onClick={() => toggleSidebar(item.techPachId, item.comment)}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.6666 10C11.6666 10.9205 10.9204 11.6667 9.99992 11.6667C9.07942 11.6667 8.33325 10.9205 8.33325 10C8.33325 9.07954 9.07942 8.33337 9.99992 8.33337C10.9204 8.33337 11.6666 9.07954 11.6666 10Z" fill="black" />
                                                    <path d="M10 16.3167C5.35917 16.3167 1.50109 13.6111 0.366076 10C1.50109 6.38899 5.35917 3.68337 10 3.68337C14.6409 3.68337 18.4989 6.38899 19.6339 10C18.4989 13.6111 14.6409 16.3167 10 16.3167ZM10 13.313C12.0585 13.313 13.6833 11.8635 13.6833 10C13.6833 8.13659 12.0585 6.68708 10 6.68708C7.94146 6.68708 6.31667 8.13658 6.31667 10C6.31667 11.8635 7.94146 13.313 10 13.313Z" stroke="black" stroke-width="0.7" />
                                                </svg>
                                            </button>
                                        ) : <button className="m-auto px-3" title="Add comment" onClick={() => toggleSidebar(item.techPachId, item.comment)}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.7288 4.50667L15.4932 6.27103M14.8632 2.95241L10.0906 7.72504C9.84433 7.97135 9.67641 8.28505 9.60808 8.62658L9.16675 10.8333L11.3735 10.392C11.715 10.3237 12.0287 10.1558 12.275 9.9095L17.0477 5.13686C17.6509 4.53364 17.6509 3.55563 17.0477 2.95242C16.4444 2.3492 15.4664 2.34919 14.8632 2.95241Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.8333 12.5V15C15.8333 15.9205 15.0871 16.6666 14.1666 16.6666H4.99992C4.07944 16.6666 3.33325 15.9205 3.33325 15V5.83329C3.33325 4.91282 4.07944 4.16663 4.99992 4.16663H7.49992" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="copy-button hover:bg-gray-300">Copy</button>
                                            <button className="edit-button hover:bg-slate-300">Edit</button>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="download-button hover:bg-slate-300">
                                            <TechPackPdfGenerator data={filteredData[index]} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isSidebarOpen && (
                        <div ref={sidebarRef} className="fixed top-0 right-0 h-full w-1/4 max-w-sm bg-white shadow-lg z-50 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">Add Comment</h2>
                            </div>
                            <textarea
                                className="w-full h-40 p-2 border rounded"
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Enter your comment here..."
                            ></textarea>
                            <div className="flex mt-20">
                                <button onClick={() => { handleCommentSubmit(isSidebarOpen, comment); toggleSidebar(false) }} className="mt-4 p-5 pt-0 text-xl text-blue-500 hover:underline">
                                    Apply
                                </button>
                                <button onClick={() => toggleSidebar(false)} className="mt-4 p-5 pt-0 text-xl text-blue-500 hover:underline">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TechPackDataTable;
