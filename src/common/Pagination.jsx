const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxButtons = 5;

    let startPage, endPage;
    if (totalPages <= maxButtons) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const halfMaxButtons = Math.floor(maxButtons / 2);
        if (currentPage <= halfMaxButtons) {
            startPage = 1;
            endPage = maxButtons;
        } else if (currentPage + halfMaxButtons >= totalPages) {
            startPage = totalPages - maxButtons + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfMaxButtons;
            endPage = currentPage + halfMaxButtons;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className='flex items-center gap-2'
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-2.18557e-07 5L7.5 0.669872L7.5 9.33013L-2.18557e-07 5Z" fill="#868686" />
                        </svg>
                        <span className='text-lg text-[#868686]'> Prev</span>
                    </button>
                    <ul className="page-numbers">
                        {startPage > 1 && (
                            <li>
                                <button onClick={() => paginate(1)}>
                                    1,
                                </button>
                            </li>
                        )}
                        {startPage > 2 && (
                            <li>
                                <span>...</span>
                            </li>
                        )}
                        {pageNumbers.map((number) => (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number)}
                                    className={currentPage === number ? 'active' : ''}
                                >
                                    {number},
                                </button>
                            </li>
                        ))}
                        {endPage < totalPages - 1 && (
                            <li>
                                <span>......</span>
                            </li>
                        )}
                        {endPage < totalPages && (
                            <li>
                                <button onClick={() => paginate(totalPages)}>
                                    {totalPages},
                                </button>
                            </li>
                        )}
                    </ul>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 flex-row-reverse text-lg"
                    >
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5L0.5 0.669872L0.5 9.33013L8 5Z" fill="black" />
                        </svg>
                        <span>Next</span>
                    </button>
                </div>
            )}
        </>
    );
}

export default Pagination;
