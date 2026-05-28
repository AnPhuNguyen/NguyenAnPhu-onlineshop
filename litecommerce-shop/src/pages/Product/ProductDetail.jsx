// src/pages/Product/ProductDetail.jsx
// Trang chi tiết sản phẩm – lấy dữ liệu từ backend API
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductDetailApi } from '../../lib/productApi';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN') + '₫';
}

export default function ProductDetail() {
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [addState, setAddState] = useState('idle'); // idle | loading | success | error
    const [activePhoto, setActivePhoto] = useState(0);
    const addItem = useCartStore((s) => s.addItem);
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    // ─── Lấy chi tiết sản phẩm từ API ───────────────────────────────────────
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductDetailApi(id),
        enabled: !!id,
    });

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/products/detail/${id}` } });
            return;
        }
        setAddState('loading');
        try {
            await addItem(product.productId, qty);
            setAddState('success');
            setTimeout(() => setAddState('idle'), 2000);
        } catch {
            setAddState('error');
            setTimeout(() => setAddState('idle'), 2000);
        }
    };

    const changeQty = (delta) => setQty((q) => Math.max(1, q + delta));

    // ─── Loading / Not Found ─────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center gap-4 text-outline">
                <span className="material-symbols-outlined text-6xl animate-spin">progress_activity</span>
                <p className="font-medium">Đang tải sản phẩm...</p>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                <p className="text-outline text-lg">Không tìm thấy sản phẩm.</p>
                <Link to="/products" className="text-primary font-bold hover:underline mt-4 inline-block">
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    // Lấy ảnh gallery (chưa bị ẩn), sắp xếp theo displayOrder
    const visiblePhotos = (product.photos ?? [])
        .filter((p) => !p.isHidden)
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

    const mainPhoto =
        visiblePhotos.length > 0
            ? visiblePhotos[activePhoto]?.photo || product.photo
            : product.photo;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-outline mb-8 flex gap-2 items-center">
                <Link to="/products" className="hover:text-primary transition-colors">Sản phẩm</Link>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-[#191c1e] font-medium truncate max-w-xs">{product.productName}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                {/* Gallery ảnh */}
                <div className="space-y-4">
                    <div className="bg-surface-container rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                        {mainPhoto ? (
                            <img
                                src={mainPhoto}
                                alt={product.productName}
                                className="object-contain w-full h-full p-8"
                            />
                        ) : (
                            <span className="material-symbols-outlined text-8xl text-outline">inventory_2</span>
                        )}
                    </div>
                    {visiblePhotos.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {visiblePhotos.slice(0, 5).map((photo, idx) => (
                                <button
                                    key={photo.photoId ?? idx}
                                    onClick={() => setActivePhoto(idx)}
                                    className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-surface-container border-2 transition-all ${idx === activePhoto ? 'border-primary' : 'border-outline-variant hover:border-primary'
                                        }`}
                                >
                                    <img src={photo.photo} alt={photo.description} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#191c1e] mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            {product.productName}
                        </h1>
                        <p className="text-sm text-outline">
                            Đơn vị tính: <strong className="text-[#191c1e]">{product.unit}</strong>
                        </p>
                        {product.category && (
                            <p className="text-sm text-outline mt-1">
                                Danh mục: <strong className="text-[#191c1e]">{product.category.categoryName}</strong>
                            </p>
                        )}
                    </div>

                    <div className="text-4xl font-black text-primary">{formatPrice(product.price)}</div>

                    {/* Nút thêm vào giỏ */}
                    {product.isSelling ? (
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center border border-outline-variant rounded-xl overflow-hidden">
                                <button onClick={() => changeQty(-1)} className="px-4 py-3 text-[#191c1e] hover:bg-surface-container-low transition-colors font-bold">−</button>
                                <input
                                    type="number"
                                    value={qty}
                                    min="1"
                                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                                    className="w-16 text-center border-none bg-transparent font-bold text-[#191c1e] focus:ring-0 outline-none"
                                />
                                <button onClick={() => changeQty(1)} className="px-4 py-3 text-[#191c1e] hover:bg-surface-container-low transition-colors font-bold">+</button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={addState === 'loading'}
                                className={`grow py-4 rounded-xl font-bold text-lg ambient-shadow hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60 ${addState === 'success' ? 'bg-green-500 text-white' :
                                        addState === 'error' ? 'bg-red-500 text-white' :
                                            'primary-gradient text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">
                                    {addState === 'success' ? 'check' : addState === 'error' ? 'error' : 'shopping_cart'}
                                </span>
                                {addState === 'loading' ? 'Đang thêm...' :
                                    addState === 'success' ? 'Đã thêm vào giỏ!' :
                                        addState === 'error' ? 'Sản phẩm không sẵn có' :
                                            'Thêm vào giỏ'}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl text-red-500 font-bold">block</span>
                            <div>
                                <span className="font-bold text-lg block">Sản phẩm hiện đang ngừng bán</span>
                                <span className="text-xs opacity-75">Sản phẩm này tạm thời không thể cho vào giỏ hàng.</span>
                            </div>
                        </div>
                    )}

                    {/* Mô tả */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Mô tả</h2>
                        {product.productDescription ? (
                            <div className="border-t border-outline-variant pt-4 text-on-surface-variant leading-relaxed text-sm">
                                <p>{product.productDescription}</p>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
                                Hiện sản phẩm chưa có mô tả
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Thuộc tính sản phẩm */}
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>Thuộc tính sản phẩm</h2>
            {product.attributes?.length > 0 ? (
                <section className="bg-surface-container-low rounded-2xl p-8">
                    <div className="divide-y divide-outline-variant">
                        {product.attributes
                            .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
                            .map((attr, i) => (
                                <div key={attr.attributeId ?? i} className="flex items-start gap-6 py-4">
                                    <span className="text-sm font-bold text-outline w-48 shrink-0">{attr.attributeName}</span>
                                    <span className="text-sm text-[#191c1e] grow">{attr.attributeValue}</span>
                                </div>
                            ))}
                    </div>
                </section>
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
                    Hiện sản phẩm chưa có thuộc tính
                </div>
            )}
        </div>
    );
}
