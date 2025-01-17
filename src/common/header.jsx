function Header({ name, index, onDelete }) {

    return (
        <section className='border-b-2 border-black'>
            <article className='relative flex items-start justify-between py-5 px-10'>
                <div>
                    <h1 className='font-bold'>BARISCEANO</h1>
                    <h5>{name}</h5>
                </div>
                <div className='h-[46px] absolute right-0 w-full'>
                    <img src="/logo192.png" alt="Bariceano" draggable="false" className='select-none w-full h-full object-contain' />
                </div>
                <div className='flex flex-col items-end justify-end'>
                    <div>
                        <h5>Pg - 0{index}</h5>
                        <h5>BR-00-00</h5>
                    </div>
                    <div className='flex gap-5 absolute top-12 pr-2 right-0 items-center mt-2'>
                        <div
                            onClick={() => {
                                const isConfirmed = window.confirm(
                                    'Are you sure you want to delete this page?'
                                );
                                if (isConfirmed) {
                                    onDelete();
                                }
                            }}
                            style={{ cursor: "pointer" }} // Optional: Add pointer cursor for better UX
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
                                    stroke-width="0.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M10.2923 3.54528V11.818C10.2923 12.1314 10.1782 12.432 9.97502 12.6537C9.77185 12.8753 9.4963 12.9998 9.20898 12.9998H3.79232C3.505 12.9998 3.22945 12.8753 3.02629 12.6537C2.82312 12.432 2.70898 12.1314 2.70898 11.818V3.54528M4.33398 3.54528V2.36346C4.33398 2.05002 4.44812 1.74942 4.65129 1.52779C4.85445 1.30615 5.13 1.18164 5.41732 1.18164H7.58398C7.8713 1.18164 8.14685 1.30615 8.35002 1.52779C8.55318 1.74942 8.66732 2.05002 8.66732 2.36346V3.54528"
                                    stroke="black"
                                    stroke-width="0.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M5.41602 6.5V10.0455"
                                    stroke="black"
                                    stroke-width="0.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M7.58398 6.5V10.0455"
                                    stroke="black"
                                    stroke-width="0.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>

                    </div>
                </div>
            </article>
        </section>
    )
}

export default Header