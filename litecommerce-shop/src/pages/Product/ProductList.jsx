// src/pages/Product/ProductList.jsx
// Trang danh sách sản phẩm – lấy dữ liệu thực từ backend API
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductsApi, getCategoriesApi } from '../../lib/productApi';
import ProductCard from '../../components/common/ProductCard';
import Pagination from '../../components/common/Pagination';

const PAGE_SIZE = 8;

export default function ProductList() {
    const [inputQuery, setInputQuery] = useState('');
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [page, setPage] = useState(1);

    // ─── Lấy danh mục ─────────────────────────────────────────────────────────
    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesApi,
        staleTime: 1000 * 60 * 10, // 10 phút (danh mục ít thay đổi)
    });

    // Đảm bảo categories luôn là mảng để tránh lỗi .map()
    const categories = Array.isArray(categoriesData)
        ? categoriesData
        : (categoriesData?.categories && Array.isArray(categoriesData.categories) ? categoriesData.categories : []);

    // ─── Lấy sản phẩm theo bộ lọc ─────────────────────────────────────────────
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', { search, categoryId, minPrice, maxPrice, page }],
        queryFn: () =>
            getProductsApi({
                search: search || undefined,
                categoryId: categoryId || undefined,
                minPrice: minPrice || undefined,
                maxPrice: maxPrice || undefined,
                page,
                limit: PAGE_SIZE,
            }),
        keepPreviousData: true,
    });

    const products = data?.products ?? [];
    const pagination = data?.pagination ?? { page: 1, totalPages: 1, total: 0 };

    // ─── Handlers ──────────────────────────────────────────────────────────────
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(inputQuery);
        setPage(1);
    };

    const handleReset = () => {
        setInputQuery('');
        setSearch('');
        setCategoryId('');
        setMinPrice('');
        setMaxPrice('');
        setPage(1);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold text-[#191c1e] mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Sản phẩm
                </h1>
                {/* Thanh tìm kiếm */}
                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-2xl bg-white rounded-xl p-2 flex items-center ambient-shadow ghost-border focus-within:border-[#004ac6] transition-all duration-300"
                >
                    <span className="material-symbols-outlined ml-4 text-[#737686]">search</span>
                    <input
                        name="query"
                        value={inputQuery}
                        onChange={(e) => setInputQuery(e.target.value)}
                        className="w-full bg-transparent border-none outline-none focus:ring-0 px-4 py-3 text-sm font-medium text-[#191c1e] placeholder:text-[#737686]"
                        placeholder="Tìm kiếm sản phẩm..."
                        type="text"
                    />
                    <button type="submit" className="primary-gradient text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95">
                        Tìm kiếm
                    </button>
                </form>
            </header>

            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Sidebar bộ lọc */}
                <aside className="w-full md:w-72 flex-shrink-0">
                    <div className="bg-[#f2f4f6] rounded-xl p-8 sticky top-28">
                        <div className="flex items-center gap-2 mb-8">
                            <span className="material-symbols-outlined text-[#004ac6]">filter_list</span>
                            <h2 className="text-xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>Bộ lọc</h2>
                        </div>

                        {/* Danh mục */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[#737686] mb-4">Danh mục</h3>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={categoryId === ''}
                                        onChange={() => { setCategoryId(''); setPage(1); }}
                                        className="w-5 h-5 text-[#004ac6] cursor-pointer"
                                    />
                                    <span className="text-sm font-medium text-[#434655] group-hover:text-[#004ac6] transition-colors">Tất cả</span>
                                </label>
                                {categories.map((cat) => (
                                    <label key={cat.categoryId ?? cat.id} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={categoryId === String(cat.categoryId ?? cat.id)}
                                            onChange={() => { setCategoryId(String(cat.categoryId ?? cat.id)); setPage(1); }}
                                            className="w-5 h-5 text-[#004ac6] cursor-pointer"
                                        />
                                        <span className="text-sm font-medium text-[#434655] group-hover:text-[#004ac6] transition-colors">
                                            {cat.categoryName ?? cat.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Khoảng giá */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[#737686] mb-4">Khoảng giá (VNĐ)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-[#737686] block mb-1">Từ</label>
                                    <div className="bg-white rounded-lg p-3 ghost-border focus-within:border-[#004ac6] transition-all">
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className="w-full bg-transparent border-none outline-none p-0 focus:ring-0 text-sm font-semibold"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#737686] block mb-1">Đến</label>
                                    <div className="bg-white rounded-lg p-3 ghost-border focus-within:border-[#004ac6] transition-all">
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full bg-transparent border-none outline-none p-0 focus:ring-0 text-sm font-semibold"
                                            placeholder="50000000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nút lọc */}
                        <div className="space-y-3 pt-4">
                            <button
                                onClick={() => setPage(1)}
                                className="w-full primary-gradient text-white py-3 rounded-lg font-bold ambient-shadow hover:opacity-90 transition-all active:scale-95"
                            >
                                Áp dụng
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="block w-full text-[#004ac6] font-bold py-3 hover:bg-[#e6e8ea] rounded-lg transition-colors text-center"
                            >
                                Thiết lập lại
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Lưới sản phẩm */}
                <section className="flex-grow w-full">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center min-h-64 text-[#737686] gap-4">
                            <span className="material-symbols-outlined text-5xl animate-spin">progress_activity</span>
                            <p className="font-medium">Đang tải sản phẩm...</p>
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center justify-center min-h-64 text-[#ba1a1a] gap-4">
                            <span className="material-symbols-outlined text-5xl">error</span>
                            <p className="font-medium">Không thể tải sản phẩm. Vui lòng thử lại.</p>
                            <button onClick={handleReset} className="text-[#004ac6] font-bold hover:underline">Thử lại</button>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-64 text-[#737686] gap-4">
                            <span className="material-symbols-outlined text-6xl">search_off</span>
                            <p className="text-lg font-medium">Không tìm thấy sản phẩm phù hợp.</p>
                            <button onClick={handleReset} className="text-[#004ac6] font-bold hover:underline">
                                Xem tất cả sản phẩm
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-[#737686] mb-6">Tìm thấy {pagination.total} sản phẩm</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start items-start">
                                {products.map((p) => (
                                    <ProductCard key={p.productId ?? p.id} product={p} />
                                ))}
                            </div>
                            <Pagination
                                page={pagination.page}
                                pageCount={pagination.totalPages}
                                onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            />
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
