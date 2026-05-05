// src/components/common/PaginationControls.jsx
export default function PaginationControls({ currentPage, totalPages, onChangePage, maxVisible = 5 }) {
    if (totalPages <= 1) return null;

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    const visiblePages = [];
    for (let page = start; page <= end; page += 1) {
        visiblePages.push(page);
    }

    return (
        <div className="d-flex justify-content-end p-2 overflow-auto">
            <div className="btn-group btn-group-sm" role="group" aria-label="Pagination navigation">
                <button type="button" className="btn btn-outline-secondary" onClick={() => onChangePage(1)} disabled={currentPage === 1}>
                    {'<<'}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => onChangePage(currentPage - 1)} disabled={currentPage === 1}>
                    {'<'}
                </button>
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => onChangePage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button type="button" className="btn btn-outline-secondary" onClick={() => onChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
                    {'>'}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => onChangePage(totalPages)} disabled={currentPage === totalPages}>
                    {'>>'}
                </button>
            </div>
        </div>
    );
}
