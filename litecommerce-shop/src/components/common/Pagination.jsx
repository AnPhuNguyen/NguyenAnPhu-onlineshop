// src/components/common/Pagination.jsx
export default function Pagination({ page, pageCount, onChange }) {
    if (pageCount <= 1) return null;

    const startPage = Math.max(1, Math.min(page - 2, pageCount - 4));
    const endPage = Math.min(pageCount, startPage + 4);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);

    const btnBase =
        'w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all text-sm';
    const btnActive = 'primary-gradient text-white shadow-lg scale-110 z-10';
    const btnNormal = 'bg-white text-[#191c1e] hover:bg-[#e6e8ea] ambient-shadow';
    const btnDisabled = 'opacity-30 cursor-not-allowed pointer-events-none bg-[#eceef0]';

    return (
        <div className="flex flex-wrap justify-center items-center mt-12 gap-2">
            {/* First */}
            <button
                onClick={() => onChange(1)}
                disabled={page === 1}
                className={`${btnBase} ${page === 1 ? btnDisabled : btnNormal}`}
                title="Trang đầu"
            >
                <span className="material-symbols-outlined text-sm">keyboard_double_arrow_left</span>
            </button>
            {/* Prev */}
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className={`${btnBase} ${page === 1 ? btnDisabled : btnNormal}`}
                title="Trang trước"
            >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>

            {/* Page numbers */}
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`${btnBase} ${p === page ? btnActive : btnNormal}`}
                >
                    {p}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() => onChange(page + 1)}
                disabled={page === pageCount}
                className={`${btnBase} ${page === pageCount ? btnDisabled : btnNormal}`}
                title="Trang tiếp"
            >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
            {/* Last */}
            <button
                onClick={() => onChange(pageCount)}
                disabled={page === pageCount}
                className={`${btnBase} ${page === pageCount ? btnDisabled : btnNormal}`}
                title="Trang cuối"
            >
                <span className="material-symbols-outlined text-sm">keyboard_double_arrow_right</span>
            </button>
        </div>
    );
}
