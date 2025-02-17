import { useState } from 'react';
import { AiOutlineLoading } from "react-icons/ai";
import generatePdf from './utility/generatePDF';

const TechPackPDFGenrate = ({ data }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    
    return (
        <button
            type='button'
            onClick={() => generatePdf(data, setIsDownloading)}
            className={`text-center flex items-center justify-center mx-auto ${isDownloading ? 'animate-spin cursor-not-allowed' : ''}`}
            disabled={isDownloading}
        >
            {isDownloading ? <AiOutlineLoading className='text-black font-bold h-5' /> : 'Download'}
        </button>)
}

export default TechPackPDFGenrate