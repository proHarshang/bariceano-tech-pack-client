import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewPdfGenerator from '../NewPDF';



const PreviewPage = () => {
    const { id } = useParams();
    const [previewData, setPreviewData] = useState(null);
    const [slides, setSlides] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTechPack = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/design/techpacks/fetch/${id}`);
                if (response.data.status) {
                    setPreviewData(response.data.data);
                    setData(response.data.data);
                    setSlides(response.data.data.slides || []);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching tech pack:", error);
            }
        };

        fetchTechPack();
    }, [id]);

    const informationSlide = slides.find(slide => slide.type === "Information");
    const nonLastRows = informationSlide?.data.info.filter((row) => row.position !== "Last" && row.position !== "LINK") || [];
    const lastRows = informationSlide?.data.info.filter((row) => row.position === "Last") || [];
    const Link = informationSlide?.data.info.find(row => row.position === "LINK");
    // Ensure even number of rows in nonLastRows for alignment
    if (nonLastRows.length % 2 !== 0) {
        nonLastRows.push({ name: "", value: "", position: "" });
    }

    // Split nonLastRows into two columns
    const midIndex = Math.ceil(nonLastRows.length / 2);
    const firstHalf = nonLastRows.slice(0, midIndex);
    const secondHalf = nonLastRows.slice(midIndex);

    const artworkData = slides.find(slide => slide.type === "ArtworkPlacementSheet");


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="flex justify-center items-center bg-black text-white w-[100px] py-2 hover:bg-green-300  fixed z-10 top-[90%] left-[90%] rounded-2xl">
                <NewPdfGenerator data={data} />
            </div>
            {Link ? (
                <div>
                    <a href={Link.value.startsWith('http') ? Link.value : `http://${Link.value}`} target="_blank" rel="noopener noreferrer" className="w-[100px] py-2 text-center fixed z-10 top-[80%] left-[90%] bg-yellow-400 rounded-2xl">
                        AI File
                    </a>
                </div>
            ) : ""}

            {slides.length > 0 ? (
                slides.map((slide, index) => (
                    <div key={index} className="max-w-[10.5in]  bg-white shadow-lg rounded-lg p-6 py-0 px-0 mb-6 flex flex-col justify-between">
                        {/* Header */}
                        <section className='border-b-2 border-black relative'>
                            <article className='relative flex items-center justify-between py-5 px-10 pr-24'>
                                <div>
                                    <h4>{previewData.modifiedAt ? new Date(previewData.createdAt).toLocaleString() : null}</h4>
                                    <h4>{slide.name}</h4>
                                </div>
                                <div className='h-[70px] absolute right-0 w-full'>
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
                        <div className="py-2">
                            {slide.type === "Layout1" ? (
                                <div className="flex w-[95%] mx-auto py-10">
                                    <div className="w-[30%] flex flex-col justify-between">
                                        <div className="flex flex-col items-center mb-10">
                                            <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.fabricColorImages[0].src}`} alt="" className="w-[150px] h-[150px]" />
                                            <h5 className="font-bold">{slide.data.fabricColorTitle}</h5>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.threadColorImages[0].src}`} alt="" className="w-[150px] h-[150px]" />
                                            <h5 className="font-bold ">{slide.data.threadColorTitle}</h5>
                                        </div>
                                    </div>
                                    <div className="w-[70%] flex justify-between gap-5">
                                        <div className="w-1/2 h-full">
                                            <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`} alt="" className="w-full h-full" />
                                        </div>
                                        <div className="w-1/2 h-full">
                                            <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[1].src}`} alt="" className="w-full h-full" />
                                        </div>
                                    </div>
                                </div>
                            ) : slide.type === "Layout2" ? (
                                <div className="flex flex-col justify-between gap-10 w-[95%] h-[604] mx-auto py-10">
                                    <div className="h-[50%] flex mx-auto">
                                        {slide.data.images[0]?.src ?
                                            <div className="w-[330px] h-[330px]">
                                                <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0]?.src}`} className="w-full h-full" alt="" />
                                            </div> : null
                                        }
                                        {slide.data.images[1]?.src ?
                                            <div className="w-[330px] h-[330px]">
                                                <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[1]?.src}`} className="w-full h-full" alt="" />
                                            </div> : null
                                        }
                                        {slide.data.images[2]?.src ?
                                            <div className="w-[330px] h-[330px]">
                                                <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[2]?.src}`} className="w-full h-full" alt="" />
                                            </div> : null
                                        }
                                    </div>
                                    <div className="h-[40%] flex justify-center gap-32">
                                        <div>
                                            {slide.data.threadColorImages[0].src || slide.data.threadColorImages[1].src ?
                                                <h5 className="font-bold ml-5">{slide.data.threadColorTitle}</h5> : null
                                            }
                                            <div className="flex">
                                                {slide.data.threadColorImages[0].src ?
                                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.threadColorImages[0].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                }
                                                {slide.data.threadColorImages[1].src ?
                                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.threadColorImages[1].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {slide.data.fabricColorImages[0].src || slide.data.fabricColorImages[1].src ?
                                                <h5 className="font-bold ml-5">{slide.data.fabricColorTitle}</h5> : null
                                            }
                                            <div className="flex">
                                                {slide.data.fabricColorImages[0].src ?
                                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.fabricColorImages[0].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                }
                                                {slide.data.fabricColorImages[1].src ?
                                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.fabricColorImages[1].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) :
                                slide.type === "Layout3" ? (
                                    <div className="flex flex-col justify-between gap-10 w-[95%] h-[604] mx-auto py-10">
                                        <div className="h-[50%] flex justify-evenly w-full mx-auto">
                                            {slide.data.images[0]?.src ?
                                                <div className="w-[330px] h-[330px]">
                                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0]?.src}`} className="w-full h-full" alt="" />
                                                </div> : null
                                            }
                                            {slide.data.images[1]?.src ?
                                                <div className="w-[330px] h-[330px]">
                                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[1]?.src}`} className="w-full h-full" alt="" />
                                                </div> : null
                                            }
                                        </div>
                                        <div className="h-[40%] flex justify-center gap-32">
                                            <div>
                                                {slide.data.threadColorImages[0].src || slide.data.threadColorImages[1].src ?
                                                    <h5 className="font-bold ml-5">{slide.data.threadColorTitle}</h5> : null
                                                }
                                                <div className="flex">
                                                    {slide.data.threadColorImages[0].src ?
                                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.threadColorImages[0].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                    }
                                                    {slide.data.threadColorImages[1].src ?
                                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.threadColorImages[1].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                    }
                                                    {slide.data.threadColorImages[2].src ?
                                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.threadColorImages[2].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                {slide.data.fabricColorImages[0].src || slide.data.fabricColorImages[1].src ?
                                                    <h5 className="font-bold ml-5">{slide.data.fabricColorTitle}</h5> : null
                                                }
                                                <div className="flex">
                                                    {slide.data.fabricColorImages[0].src ?
                                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.fabricColorImages[0].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                    }
                                                    {slide.data.fabricColorImages[1].src ?
                                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.fabricColorImages[1].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                    }
                                                    {slide.data.fabricColorImages[2].src ?
                                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.fabricColorImages[2].src}`} alt="" className="w-[150px] h-[150px]" /> : null
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ) :
                                    slide.type === "Layout0" ? (
                                        <div className="flex justify-center">
                                            <div className="w-[805px] h-[604px]">
                                                <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`} alt="" className="w-full h-full" />
                                            </div>
                                        </div>
                                    ) :
                                        slide.type === "Information" ? (
                                            <div className="flex justify-center p-0 py-10">
                                                <table className="border-collapse border border-gray-700 w-[90%] h-full">
                                                    <tbody>
                                                        {firstHalf.map((row, index) => (
                                                            <tr key={index} className="border border-gray-700">
                                                                <td className="px-5 py-3 font-bold text-left uppercase w-1/4 border border-gray-700">
                                                                    {row.name}
                                                                </td>
                                                                <td className="px-5 py-3 uppercase w-1/4 border border-gray-700">{row.value}</td>
                                                                <td className="px-5 py-3 font-bold text-left uppercase w-1/4 border border-gray-700">
                                                                    {secondHalf[index]?.name || ""}
                                                                </td>
                                                                <td className="px-5 py-3 uppercase w-1/4 border border-gray-700">
                                                                    {secondHalf[index]?.value || ""}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {lastRows.map((row, index) => (
                                                            <tr key={`last-${index}`} className="border border-gray-700">
                                                                <td className="px-5 py-3 font-bold text-left uppercase border border-gray-700" colSpan={1}>
                                                                    {row.name}
                                                                </td>
                                                                <td className="px-5 py-3 uppercase border border-gray-700" colSpan={3}>
                                                                    {row.value.length > 70 ? row.value.match(/.{1,70}/g).join(" ") : row.value}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>) :
                                            slide.type === "ArtworkPlacementSheet" ? (
                                                <div className="flex justify-between p-0 py-10">
                                                    <table className="border-collapse border border-gray-700 w-[90%] mx-auto">
                                                        <thead>
                                                            <tr className="bg-black text-white">
                                                                <th className="border border-gray-700 px-2 py-1 w-[5%]">#</th>
                                                                <th className="border border-gray-700 px-2 py-1 w-[19%]">Placement</th>
                                                                <th className="border border-gray-700 px-2 py-1 w-[19%]">Artwork</th>
                                                                <th className="border border-gray-700 px-2 py-1 w-[19%]">Technique</th>
                                                                <th className="border border-gray-700 px-2 py-1 w-[19%]">Colour Placement</th>
                                                                <th className="border border-gray-700 px-2 py-1 w-[19%]">Placement</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {artworkData.data.artworkPlacementSheet.map((row, index) => (
                                                                <tr key={index} className="border border-gray-700">
                                                                    <td className="border border-gray-700 h-50 px-2 py-1 text-center break-words">{row.sNo}</td>
                                                                    <td className="border border-gray-700 h-50 px-2 py-1 break-words">{row.placement}</td>
                                                                    <td className="border border-gray-700 h-50 px-2 py-1 break-words">
                                                                        {row.artworkimage.map((img, imgIndex) => (
                                                                            <img key={imgIndex} src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${img.src}`} alt="Artwork" className="h-50 w-50 w-auto" />
                                                                        ))}
                                                                    </td>
                                                                    <td className="border border-gray-700 h-50 px-2 py-1 break-words">{row.technique}</td>
                                                                    <td className="border border-gray-700 h-50 px-2 py-1 break-words">{row.color}</td>
                                                                    <td className="border border-gray-700 h-50 px-2 py-1 break-words">
                                                                        {row.placementimage.map((img, imgIndex) => (
                                                                            <img key={imgIndex} src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${img.src}`} alt="Placement" className="h-50 w-50 w-auto" />
                                                                        ))}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) :
                                                slide.type === "ArtWork" ? (
                                                    <div className="flex justify-center">
                                                        <div className="w-[805px] h-[604px]">
                                                            <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`} alt="" />
                                                        </div>
                                                    </div>
                                                ) :
                                                    slide.type === "Page" ? (
                                                        <div className="flex justify-center">
                                                            <div className="w-[805px] h-[604px]">
                                                                <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`} alt="" />
                                                            </div>
                                                        </div>
                                                    ) :
                                                        slide.type === "Silicon Label" ? (
                                                            <div className="flex flex-col justify-center relative">
                                                                <h1 className="font-bold uppercase text-center absolute left-[30%] top-2">Placement : {`${slide.data.title}`}</h1>
                                                                <div className="w-[805px] h-[604px] mx-auto">
                                                                    <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`} alt="" />
                                                                </div>
                                                            </div>
                                                        ) :
                                                            (
                                                                <div className="flex justify-center">
                                                                    <div className="w-[805px] h-[604px]">
                                                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/techpack/${slide.data.images[0].src}`} alt="" />
                                                                    </div>
                                                                </div>
                                                            )}
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
