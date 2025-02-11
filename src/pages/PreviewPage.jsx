import { useLocation } from "react-router-dom";

const PreviewPage = () => {
    const location = useLocation();
    const previewData = location.state?.data;
    const slides = location.state?.data?.slides || [];

    console.log("previewData", previewData);
    console.log("slides", slides);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {slides.length > 0 ? (
                slides.map((slide, index) => (
                    <div key={index} className="w-[11.7in] h-[8.3in] bg-white shadow-lg rounded-lg p-6 py-0 px-0 mb-6 flex flex-col justify-between">
                        {/* Header */}
                        <section className='border-b-2 border-black relative'>
                            <article className='relative flex items-start justify-between py-5 px-10 pr-24'>
                                <div>
                                    <h4>{previewData.designer}</h4>
                                    <h4>{slide.name}</h4>
                                </div>
                                <div className='h-[50px] absolute right-0 w-full'>
                                    <img src="/logo2.png" alt="Bariceano" draggable="false" className='select-none w-full h-full object-contain' />
                                </div>
                                <div className='flex flex-col items-end justify-end'>
                                    <div className='relative'>
                                        <h5>Page - {index + 1}
                                        </h5>
                                        <h5 className='whitespace-nowrap'>{previewData.styleNo}</h5>
                                    </div>
                                </div>
                            </article>
                        </section>

                        {/* Slide Content */}
                        <div className="flex-1 flex items-center justify-center text-center p-4">
                            <p>{JSON.stringify(slide, null, 2)}</p>
                        </div>

                        {/* Footer */}
                        <footer className="pt-2 border-t-2 border-black">
                            <div className='py-3 px-7 flex justify-evenly gap-4'>
                                <div>
                                    <h3 className="text-sm text-nowrap">IMPORTANT NOTE :</h3>
                                </div>
                                <div>
                                    <p className="text-xs">
                                        This tech pack is confidential and is the sole property of BARISCEANO, to be utilised only for the purpose which it has been sent and intended only for the information of the individual/entity to whom it is addressed. All artwork appearing in this bundle are trademark, owned by BARISCEANO and cannot be used, distributed or copied.
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </div>
                ))
            ) : (
                <div className="w-[11.7in] h-[8.3in] bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
                    {/* Header */}
                    <header className="text-center font-bold text-lg border-b pb-2">
                        Common Header
                    </header>

                    {/* No Data */}
                    <div className="flex-1 flex items-center justify-center text-center p-4">
                        <p className="text-gray-500">No slides available</p>
                    </div>

                    {/* Footer */}
                    <footer className="text-center text-sm text-gray-500 border-t pt-2">
                        Common Footer - Page 1
                    </footer>
                </div>
            )}
        </div>
    );
};

export default PreviewPage;
