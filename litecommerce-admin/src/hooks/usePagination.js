// src/hooks/usePagination.js
import { useEffect, useMemo, useState } from 'react';

export default function usePagination(items, pageSize = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    useEffect(() => {
        setCurrentPage((prev) => Math.min(prev, totalPages));
    }, [totalPages]);

    const pageItems = useMemo(() => {
        const start = (safePage - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }, [items, safePage, pageSize]);

    return {
        currentPage: safePage,
        totalPages,
        pageItems,
        setCurrentPage,
    };
}
