import React from 'react';

const TechPackDataTable = () => {
    return (
        <div className="product-table-container max-w-[2000px] m-auto table">
            <div className="datatable-header">
                <span className="total-items-indicator">
                    Total 10 Tech Packs
                </span>
            </div>
            <table className='techPack-table'>
                <thead>
                    <th></th>
                    <th>Name</th>
                    <th>Last edited</th>
                    <th>Designer Name</th>
                    <th>Status</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Comment</th>
                    <th>Action</th>
                    <th>Download</th>
                </thead>
                <tbody>
                    <td></td>
                </tbody>
            </table>
        </div>
    );
}

export default TechPackDataTable;
