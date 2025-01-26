import { useTechPack } from '../context/TechPackContext';
import { LuSquareArrowUp, LuSquareArrowDown } from "react-icons/lu";

function Header({ name, page }) {
    const { techPackData, getSlideByPage, updateSlideByPage, duplicateSlide, deleteSlideByPage, moveSlideUp, moveSlideDown, classesArray } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <section className='border-b-2 border-black relative'>
            <div className='absolute top-0 left-0 -translate-y-full px-2 py-1 text-xs border border-black border-b-0'>
                <select value={slide.class} onChange={(e) => updateSlideByPage(page, "class", e.target.value)} className='focus:border-0 focus-visible:border-0 focus:outline-none focus-visible:outline-none' required>
                    <option value="" disabled>--select--</option>
                    {classesArray.map((classItem) => (
                        <option value={classItem} key={classItem}>{classItem}</option>
                    ))}
                </select>
            </div>
            <article className='relative flex items-start justify-between py-5 pb-12 px-10 pr-24'>
                <div>
                    <h1 className='font-bold'>BARISCEANO</h1>
                    <div className='absolute z-50'>
                        <input
                            type="text"
                            placeholder={name}
                            value={name}
                            onChange={(e) => updateSlideByPage(page, "name", e.target.value)}
                            className='mt-2 w-full border'
                        />
                    </div>
                </div>
                <div className='h-[46px] absolute right-0 w-full'>
                    <img src="/logo192.png" alt="Bariceano" draggable="false" className='select-none w-full h-full object-contain' onClick={() => console.log("📁 TechPackData : ", techPackData)} />
                </div>
                <div className='flex flex-col items-end justify-end'>
                    <div className='relative'>
                        <h5>Pg - {page}
                        </h5>
                        <h5 className='absolute mt-2 whitespace-nowrap'>{techPackData.styleNo}</h5>
                    </div>
                    <div className='flex flex-col gap-5 absolute top-14 pl-2 left-full items-center mt-2'>
                        <div
                            onClick={() => {
                                const isConfirmed = window.confirm(
                                    'Are you sure you want to delete this page?'
                                );
                                if (isConfirmed) {
                                    deleteSlideByPage(page)
                                }
                            }}
                            title='Delete'
                            style={{ cursor: "pointer" }}
                            className='hover:scale-125 transition-all active:scale-90' // Optional: Add pointer cursor for better UX
                        >
                            <svg
                                width="20"
                                height="24"
                                viewBox="0 0 13 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.625 3.54541H2.70833H11.375"
                                    stroke="black"
                                    strokeWidth="0.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                    stroke="black"
                                    strokeWidth="0.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5.41602 6.5V10.0455"
                                    stroke="black"
                                    strokeWidth="0.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.58398 6.5V10.0455"
                                    stroke="black"
                                    strokeWidth="0.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div
                            onClick={() => {
                                const isConfirmed = window.confirm(
                                    'Duplicate this page?'
                                );
                                if (isConfirmed) {
                                    duplicateSlide(page)
                                }
                            }}
                            title='Duplicate'
                            style={{ cursor: "pointer" }}
                            className='hover:scale-125 transition-all active:scale-90'
                        >
                            <svg width="18"
                                height="18"
                                viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div
                            onClick={() => moveSlideUp(page)}
                            title='Move Up'
                            style={{ cursor: "pointer" }}
                            className='hover:scale-125 transition-all active:scale-90'
                        >
                            <LuSquareArrowUp />
                        </div>
                        <div
                            onClick={() => moveSlideDown(page)}
                            title='Move Down'
                            style={{ cursor: "pointer" }}
                            className='hover:scale-125 transition-all active:scale-90'
                        >
                            <LuSquareArrowDown />
                        </div>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default Header