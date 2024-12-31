import React from 'react';
import '../style/TechPackTable.css';

const TechPackDataTable = ({ data = [] }) => {
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

    return (
        <div className="product-table-container max-w-[2000px] m-auto table">
            <div className="datatable-header">
                <span className="total-items-indicator">
                    Total {data?.length} Tech Packs
                </span>
            </div>
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
                                    <span>{item.comment}</span>
                                ) : (
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2966 3.38001L11.6198 4.70327M11.1474 2.21431L7.56787 5.79378C7.38319 5.97851 7.25725 6.21379 7.206 6.46994L6.875 8.125L8.53006 7.794C8.78619 7.74275 9.0215 7.61681 9.20619 7.43213L12.7857 3.85264C13.2381 3.40023 13.2381 2.66673 12.7857 2.21431C12.3332 1.7619 11.5997 1.76189 11.1474 2.21431Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.875 9.375V11.25C11.875 11.9404 11.3154 12.5 10.625 12.5H3.75C3.05964 12.5 2.5 11.9404 2.5 11.25V4.375C2.5 3.68464 3.05964 3.125 3.75 3.125H5.625" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                )}
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
        </div>
    );
};

export default TechPackDataTable;
