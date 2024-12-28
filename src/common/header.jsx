import React from 'react'

function header() {
    return (
        <section className='border-b-2 border-black'>
        <article className='flex items-center justify-between py-5 px-10'>
            <div>
                <h1 className='font-bold'>BARISCEANO</h1>
                <h5>Spec. sheet</h5>
            </div>
            <div className='h-[46px] w-[81px]'>
                <img src="/logo192.png" alt="Bariceano" draggable="false" className='select-none w-full h-full object-contain' />
            </div>
            <div className='flex flex-col items-end justify-end'>
                <div>
                    <h5>Pg-02</h5>
                    <h5>BR-00-00</h5>
                </div>
                <div className='flex gap-5 items-center mt-2'>
                    <button className='border text-xs border-black px-3 py-1 rounded-xl'>
                        Preview
                    </button>
                    <div>
                        <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.35" y="0.35" width="11.3" height="11.3" rx="2.65" stroke="black" stroke-width="0.7" />
                            <mask id="path-2-inside-1_2159_1368" fill="white">
                                <path d="M5.25635 8.99561V6.44385H2.72363V5.37744H5.25635V2.84473H6.33545V5.37744H8.86816V6.44385H6.33545V8.99561H5.25635Z" />
                            </mask>
                            <path d="M5.25635 8.99561V6.44385H2.72363V5.37744H5.25635V2.84473H6.33545V5.37744H8.86816V6.44385H6.33545V8.99561H5.25635Z" fill="black" />
                            <path d="M5.25635 8.99561H5.05635V9.19561H5.25635V8.99561ZM5.25635 6.44385H5.45635V6.24385H5.25635V6.44385ZM2.72363 6.44385H2.52363V6.64385H2.72363V6.44385ZM2.72363 5.37744V5.17744H2.52363V5.37744H2.72363ZM5.25635 5.37744V5.57744H5.45635V5.37744H5.25635ZM5.25635 2.84473V2.64473H5.05635V2.84473H5.25635ZM6.33545 2.84473H6.53545V2.64473H6.33545V2.84473ZM6.33545 5.37744H6.13545V5.57744H6.33545V5.37744ZM8.86816 5.37744H9.06816V5.17744H8.86816V5.37744ZM8.86816 6.44385V6.64385H9.06816V6.44385H8.86816ZM6.33545 6.44385V6.24385H6.13545V6.44385H6.33545ZM6.33545 8.99561V9.19561H6.53545V8.99561H6.33545ZM5.45635 8.99561V6.44385H5.05635V8.99561H5.45635ZM5.25635 6.24385H2.72363V6.64385H5.25635V6.24385ZM2.92363 6.44385V5.37744H2.52363V6.44385H2.92363ZM2.72363 5.57744H5.25635V5.17744H2.72363V5.57744ZM5.45635 5.37744V2.84473H5.05635V5.37744H5.45635ZM5.25635 3.04473H6.33545V2.64473H5.25635V3.04473ZM6.13545 2.84473V5.37744H6.53545V2.84473H6.13545ZM6.33545 5.57744H8.86816V5.17744H6.33545V5.57744ZM8.66816 5.37744V6.44385H9.06816V5.37744H8.66816ZM8.86816 6.24385H6.33545V6.64385H8.86816V6.24385ZM6.13545 6.44385V8.99561H6.53545V6.44385H6.13545ZM6.33545 8.79561H5.25635V9.19561H6.33545V8.79561Z" fill="white" mask="url(#path-2-inside-1_2159_1368)" />
                        </svg>

                    </div>
                    <div>
                        <svg width="20" height="24" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.625 3.54541H2.70833H11.375" stroke="black" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528" stroke="black" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.41602 6.5V10.0455" stroke="black" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.58398 6.5V10.0455" stroke="black" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </article>
        </section>
    )
}

export default header