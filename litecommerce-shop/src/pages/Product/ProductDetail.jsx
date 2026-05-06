// src/pages/ProductDetail.jsx
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/mockData';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

export default function ProductDetail() {
    const { id } = useParams();
    const product = PRODUCTS.find((p) => p.id === Number(id));
    const [qty, setQty] = useState(1);
    const [addState, setAddState] = useState('idle'); // idle | loading | success
    const [activePhoto, setActivePhoto] = useState(0);
    const addItem = useCartStore((s) => s.addItem);
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    if (!product) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-20 text-center">
                <p className="text-[#737686] text-lg">Không tìm thấy sản phẩm.</p>
                <Link to="/products" className="text-[#004ac6] font-bold hover:underline mt-4 inline-block">
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    const visiblePhotos = product.photos.filter((p) => !p.isHidden).sort((a, b) => a.order - b.order);
    const mainPhoto =
        visiblePhotos.length > 0
            ? visiblePhotos[activePhoto]?.photo || product.photo
            : product.photo;

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/products/detail/${id}` } });
            return;
        }
        setAddState('loading');
        setTimeout(() => {
            addItem(product, qty);
            setAddState('success');
            setTimeout(() => setAddState('idle'), 2000);
        }, 400);
    };

    const changeQty = (delta) => setQty((q) => Math.max(1, q + delta));

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-[#737686] mb-8 flex gap-2 items-center">
                <Link to="/products" className="hover:text-[#004ac6] transition-colors">Sản phẩm</Link>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-[#191c1e] font-medium truncate max-w-xs">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                {/* Photo gallery */}
                <div className="space-y-4">
                    <div className="bg-[#eceef0] rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
                        {mainPhoto ? (
                            <img
                                src={mainPhoto}
                                alt={product.name}
                                className="object-contain w-full h-full p-8"
                            />
                        ) : (
                            <span className="material-symbols-outlined text-8xl text-[#737686]">inventory_2</span>
                        )}
                    </div>
                    {visiblePhotos.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {visiblePhotos.slice(0, 5).map((photo, idx) => (
                                <button
                                    key={photo.id}
                                    onClick={() => setActivePhoto(idx)}
                                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#eceef0] border-2 transition-all ${idx === activePhoto ? 'border-[#004ac6]' : 'border-[#c3c6d7] hover:border-[#004ac6]'
                                        }`}
                                >
                                    <img src={photo.photo} alt={photo.description} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product info */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1
                            className="text-3xl font-extrabold text-[#191c1e] mb-2"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                            {product.name}
                        </h1>
                        <p className="text-sm text-[#737686]">
                            Đơn vị tính: <strong className="text-[#191c1e]">{product.unit}</strong>
                        </p>
                    </div>

                    <div className="text-4xl font-black text-[#004ac6]">{formatPrice(product.price)}</div>

                    {/* Add to cart */}
                    {product.isSelling ? (
                        <div className="flex gap-4 items-center">
                            <div className="flex items-center border border-[#c3c6d7] rounded-xl overflow-hidden">
                                <button
                                    onClick={() => changeQty(-1)}
                                    className="px-4 py-3 text-[#191c1e] hover:bg-[#f2f4f6] transition-colors font-bold"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={qty}
                                    min="1"
                                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                                    className="w-16 text-center border-none bg-transparent font-bold text-[#191c1e] focus:ring-0 outline-none"
                                />
                                <button
                                    onClick={() => changeQty(1)}
                                    className="px-4 py-3 text-[#191c1e] hover:bg-[#f2f4f6] transition-colors font-bold"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={addState === 'loading'}
                                className={`flex-grow py-4 rounded-xl font-bold text-lg ambient-shadow hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 ${addState === 'success'
                                    ? 'bg-green-500 text-white'
                                    : 'primary-gradient text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">
                                    {addState === 'success' ? 'check' : 'shopping_cart'}
                                </span>
                                {addState === 'loading'
                                    ? 'Đang thêm...'
                                    : addState === 'success'
                                        ? 'Đã thêm vào giỏ!'
                                        : 'Thêm vào giỏ'}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl text-red-500 font-bold">block</span>
                            <div>
                                <span className="font-bold text-lg block">Sản phẩm hiện đang ngừng bán</span>
                                <span className="text-xs opacity-75">
                                    Sản phẩm này tạm thời không thể cho vào giỏ hàng.
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            Mô tả
                        </h2>
                        {product.description ? (
                            <div className="border-t border-[#c3c6d7] pt-4 text-[#434655] leading-relaxed text-sm">
                                <p>{product.description}</p>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
                                Hiện sản phẩm chưa có mô tả
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Attributes */}
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Thuộc tính sản phẩm
            </h2>
            {product.attributes.length > 0 ? (
                <section className="bg-[#f2f4f6] rounded-2xl p-8">
                    <div className="divide-y divide-[#c3c6d7]">
                        {product.attributes
                            .sort((a, b) => a.order - b.order)
                            .map((attr, i) => (
                                <div key={i} className="flex items-start gap-6 py-4">
                                    <span className="text-sm font-bold text-[#737686] w-48 flex-shrink-0">{attr.name}</span>
                                    <span className="text-sm text-[#191c1e] flex-grow">{attr.value}</span>
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
