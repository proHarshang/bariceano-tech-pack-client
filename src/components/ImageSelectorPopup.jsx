import React from 'react';

const ImageSelectorPopup = ({ isOpen, closeModal, onImageSelect }) => {
    if (!isOpen) {
        return null; // Don't render the popup if not open
    }

    const imageNames = ['HangTag.jpg', 'image2.png', 'image3.gif', 'image4.jpg'];

    const handleImageSelect = (imageName) => {
        onImageSelect(imageName);
        closeModal();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Select an Image</h2>
                <ul className="image-list">
                    {imageNames.map((imageName, index) => (
                        <li key={index}>
                            <button onClick={() => handleImageSelect(imageName)}>{imageName}</button>
                        </li>
                    ))}
                </ul>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default ImageSelectorPopup;
