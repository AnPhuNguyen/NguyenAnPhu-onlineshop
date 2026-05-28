// src/components/common/ProductCard.jsx
// Thẻ sản phẩm hiển thị trong lưới – dùng trường từ backend API
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formatPrice(price) {
    return Number(price).toLocaleString('vi-VN') + '₫';
}

export default function ProductCard({ product }) {
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);
    const addItem = useCartStore((s) => s.addItem);
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    // Hỗ trợ cả field name từ mockdata cũ (id/name) và backend (productId/productName)
    const id = product.productId ?? product.id;
    const name = product.productName ?? product.name;
    const photo = product.photo;
    const price = Number(product.price);
    const isSelling = product.isSelling;

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (!isSelling) return;
        setLoading(true);
        await addItem(id, 1);
        setLoading(false);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Link
            to={`/products/detail/${id}`}
            className="block bg-white rounded-xl p-4 ambient-shadow group hover:bg-surface-container-low transition-all duration-300 h-full flex flex-col"
        >
            {/* Ảnh sản phẩm */}
            <div className="aspect-square bg-surface-container rounded-lg mb-4 overflow-hidden relative flex items-center justify-center shrink-0">
                {photo ? (
                    <img
                        src={photo}
                        alt={name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <span
                    className="material-symbols-outlined text-5xl text-outline"
                    style={{ display: photo ? 'none' : 'flex' }}
                >
                    inventory_2
                </span>
                {!isSelling && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                        <span className="bg-white text-error text-xs font-black px-3 py-1 rounded-full">
                            Ngừng bán
                        </span>
                    </div>
                )}
            </div>

            {/* Tên sản phẩm */}
            <h3 className="font-bold text-[#191c1e] mb-1 line-clamp-2 min-h-10 text-sm leading-tight">
                {name}
            </h3>

            {/* Giá + nút thêm giỏ */}
            <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-base font-black text-primary">{formatPrice(price)}</span>
                {isSelling && (
                    <button
                        onClick={handleAddToCart}
                        disabled={loading}
                        className={`p-2 rounded-full transition-all active:scale-90 disabled:opacity-60 ${added
                                ? 'bg-green-500 text-white'
                                : 'bg-[#b4c5ff] text-primary hover:bg-primary hover:text-white'
                            }`}
                        title="Thêm vào giỏ"
                    >
                        <span className="material-symbols-outlined text-sm">
                            {added ? 'check' : loading ? 'progress_activity' : 'add_shopping_cart'}
                        </span>
                    </button>
                )}
            </div>
        </Link>
    );
}
