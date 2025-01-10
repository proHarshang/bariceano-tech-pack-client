import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MainHeader = () => {
    const { user } = useAuth();  // Get user from context
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentSubCategory, setCurrentSubCategory] = useState(null);
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
        setShowCategories(false);
        setCurrentCategory(false);
        setCurrentSubCategory(false);
    };

    const handleApply = () => {
        navigate('/tech-pack', {
            state: {
                selectedLabels,
                currentCategory,
                currentSubCategory
            }
        });
        setShowCategories(false);
        setCurrentCategory(false);
        setCurrentSubCategory(false);
    };

    return (
        <div className="p-5 flex justify-between border-b pl-16 pr-12">
            <div className='flex gap-5 items-center'>
                <button
                    className={`flex gap-3 items-center border-[1px] text-sm font-bold px-3 py-2 rounded-2xl uppercase ${currentPath === "/tech-pack-data"
                        ? "bg-black text-white"
                        : "border text-black"
                        }`}
                >
                    <select
                        name="Collection"
                        id="collectionSelect"
                        className={`${currentPath === "/tech-pack-data"
                            ? "bg-black text-white"
                            : ""
                            }`}
                        onChange={(e) => {
                            if (e.target.value === "Collection 1") {
                                window.location.href = "/tech-pack-data";
                            } else if (e.target.value === "Collection 2") {
                                // Handle Collection 2 link
                            }
                        }}
                    >
                        <option value="">Select Collection</option>
                        <option value="Collection 1">Collection 1</option>
                        <option value="Collection 2">Collection 2</option>
                    </select>
                </button>
                <a href="/setting">
                    <button
                        className={`border-[1px] text-sm font-bold px-3 py-2 rounded-2xl uppercase ${currentPath === "/setting"
                            ? "bg-black text-white"
                            : "border-black"
                            }`}
                    >
                        Setting
                    </button>
                </a>
                <div className="relative">
                    <button
                        className="flex gap-2 invert hover:invert-0 border bg-black text-white items-center text-sm font-bold px-3 py-2 rounded-2xl uppercase"
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
                                        <div key={label} checked={selectedLabels.includes(label)} className="flex px-4 mb-3 w-full justify-between items-center">
                                            <label className='text-[#AEAEAE]'>{label}</label>
                                            <input
                                                type="checkbox"
                                                name="checkbox"
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
            <div className="flex items-center gap-3 pr-10">
                <CgProfile className="size-9" />
                <div>
                    {user ? (
                        <>
                            <h1>{user.Name}</h1>
                            <h5 className="text-xs">{user.Role}</h5>
                        </>
                    ) : (
                        <h1>Guest</h1>
                    )}
                </div>
            </div>
        </div >
    );
};

export default MainHeader;
