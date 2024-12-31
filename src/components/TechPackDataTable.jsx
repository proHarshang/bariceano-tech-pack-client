import '../style/TechPackTable.css';
import { useState, useCallback } from 'react';
import { useRef, useEffect } from 'react';
import { handleCommentSubmit } from '../APi/TechPacks';

const TechPackDataTable = ({ data = [] }) => {
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentSubCategory, setCurrentSubCategory] = useState(null);
    const sidebarRef = useRef(null);

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
    const categories = ['T-Shirt', 'Hoodie', 'Sweat-Shirt'];
    const subCategories = ['Men', 'Women'];
    const labels = [
        'Silicon Label',
        'Wash Care Label',
        'Size Label',
        'Main Label',
        'Sewing Thread',
        'Hand Tag',
        'Blank Tag'
    ];

    const handleLabelChange = (label) => {
        setSelectedLabels((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    const handleClear = () => {
        setSelectedLabels([]);
    };

    const handleApply = () => {
        console.log('Selected Labels:', selectedLabels);
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(null); // Use `null` as initial state for clarity
    const [comment, setComment] = useState('');
    const toggleSidebar = useCallback((orderId = null, orderComment = null) => {
        if (orderId) {
            setIsSidebarOpen(orderId); // Store only the orderId to indicate which sidebar is open
            setComment(orderComment || ''); // Update comment state with the selected order's comment
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

    return (
        <>
            <div className='px-20 max-w-[1400px] mx-auto'>
                <div className='flex gap-5 items-center my-7'>
                    <button className='flex gap-3 items-center border-[1px] text-sm font-bold border-black px-3 py-2 rounded-2xl uppercase'>
                        <select name="Collection" id="">
                            <option value="Collection 1">Collection 1</option>
                            <option value="Collection 2">Collection 2</option>
                        </select>
                    </button>
                    <button className='border-[1px] text-sm font-bold border-black px-3 py-2 rounded-2xl uppercase'>
                        Setting
                    </button>
                    <div className="relative">
                        <button
                            className="flex gap-2 bg-black text-white items-center text-sm font-bold px-3 py-2 rounded-2xl uppercase"
                            onClick={() => setShowCategories(!showCategories)}
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M6.5 0V13" stroke="white" strokeWidth="2" />
                                <path d="M0 6.5L13 6.5" stroke="white" strokeWidth="2" />
                            </svg>
                            <span>New</span>
                        </button>

                        {showCategories && (
                            <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded shadow-md z-10">
                                <div className="p-2 space-y-2">
                                    {categories.map((category) => (
                                        <div
                                            key={category}
                                            className={`p-2 cursor-pointer hover:bg-gray-200 ${currentCategory === category && 'bg-gray-300'}`}
                                            onClick={() => setCurrentCategory(category)}
                                        >
                                            {category}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentCategory && (
                            <div className="absolute mt-2 left-52 w-48 bg-white border border-gray-300 rounded shadow-md z-10">
                                <div className="p-2 space-y-2">
                                    {subCategories.map((subCategory) => (
                                        <div
                                            key={subCategory}
                                            className={`p-2 cursor-pointer hover:bg-gray-200 ${currentSubCategory === subCategory && 'bg-gray-300'}`}
                                            onClick={() => setCurrentSubCategory(subCategory)}
                                        >
                                            {subCategory}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {currentSubCategory && (
                            <div className="absolute mt-2 -right-[600px] w-64 bg-white border border-gray-300 rounded shadow-md z-10">
                                <div className="py-4 space-y-2">
                                    {labels.map((label) => (
                                        <>
                                            <div key={label} className="flex px-4 mb-3 w-full justify-between items-center">
                                                <label className='text-[#AEAEAE]'>{label}</label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLabels.includes(label)}
                                                    onChange={() => handleLabelChange(label)}
                                                    className={`mr-2 w-7 h-7 pl-[1px] bg-slate-200 pointer-events-auto`}
                                                />
                                            </div>
                                            <hr className='w-full h-1 !px-0' />
                                        </>
                                    ))}
                                    <div className="flex gap-2 !mt-5 justify-center">
                                        <button
                                            className="px-3 py-[2px] text-sm border-2 border-[#868686] rounded-lg"
                                            onClick={handleClear}
                                        >
                                            Clear
                                        </button>
                                        <button
                                            className="bg-black px-3 py-[2px] text-sm text-white rounded-lg"
                                            onClick={handleApply}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
                <div className="m-auto">
                    <span>
                        Total {data?.length} Tech Packs
                    </span>
                    <table className='techPack-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Last Edited</th>
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
                            {data?.map((item, index) => (
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
                                            <button className="m-auto px-3" onClick={() => toggleSidebar(item._id, item.comment)}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.6666 10C11.6666 10.9205 10.9204 11.6667 9.99992 11.6667C9.07942 11.6667 8.33325 10.9205 8.33325 10C8.33325 9.07954 9.07942 8.33337 9.99992 8.33337C10.9204 8.33337 11.6666 9.07954 11.6666 10Z" fill="black" />
                                                    <path d="M10 16.3167C5.35917 16.3167 1.50109 13.6111 0.366076 10C1.50109 6.38899 5.35917 3.68337 10 3.68337C14.6409 3.68337 18.4989 6.38899 19.6339 10C18.4989 13.6111 14.6409 16.3167 10 16.3167ZM10 13.313C12.0585 13.313 13.6833 11.8635 13.6833 10C13.6833 8.13659 12.0585 6.68708 10 6.68708C7.94146 6.68708 6.31667 8.13658 6.31667 10C6.31667 11.8635 7.94146 13.313 10 13.313Z" stroke="black" stroke-width="0.7" />
                                                </svg>
                                            </button>
                                        ) : <button className="m-auto px-3" title="Add comment" onClick={() => toggleSidebar(item._id, item.comment)}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.7288 4.50667L15.4932 6.27103M14.8632 2.95241L10.0906 7.72504C9.84433 7.97135 9.67641 8.28505 9.60808 8.62658L9.16675 10.8333L11.3735 10.392C11.715 10.3237 12.0287 10.1558 12.275 9.9095L17.0477 5.13686C17.6509 4.53364 17.6509 3.55563 17.0477 2.95242C16.4444 2.3492 15.4664 2.34919 14.8632 2.95241Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.8333 12.5V15C15.8333 15.9205 15.0871 16.6666 14.1666 16.6666H4.99992C4.07944 16.6666 3.33325 15.9205 3.33325 15V5.83329C3.33325 4.91282 4.07944 4.16663 4.99992 4.16663H7.49992" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="copy-button">Copy</button>
                                            <button className="edit-button">Edit</button>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="download-button">Download</button>
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
