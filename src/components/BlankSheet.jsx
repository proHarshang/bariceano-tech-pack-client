import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const BlankSheet = () => {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="w-full h-[461px] p-10">
      {image ? (
        <div className="flex flex-col items-center w-full h-full">
          <img
            src={image}
            alt="Preview"
            className="mb-4 w-full h-full object-contain cursor-pointer"
            onClick={open}
          />
          <input {...getInputProps()} />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="border-2 border-dashed bg-[#F3F3F3] border-gray-300 w-full h-full flex justify-center items-center cursor-pointer"
          onClick={open}
        >
          <input {...getInputProps()} />
          <p>Drop an Image here or click to select</p>
        </div>
      )}
    </div>
  );
};

export default BlankSheet;
