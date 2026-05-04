// src/components/common/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function formatPrice(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

export default function ProductCard({ product }) {
    const [added, setAdded] = useState(false);
    const addItem = useCartStore((s) => s.addItem);
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (!product.isSelling) return;
        addItem(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Link
            to={`/products/detail/${product.id}`}
            className="block bg-white rounded-xl p-4 ambient-shadow group hover:bg-[#f2f4f6] transition-all duration-300 h-full flex flex-col"
        >
            {/* Product image */}
            <div className="aspect-square bg-[#eceef0] rounded-lg mb-4 overflow-hidden relative flex items-center justify-center flex-shrink-0">
                {product.photo ? (
                    <img
                        src={product.photo}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <span
                    className="material-symbols-outlined text-5xl text-[#737686]"
                    style={{ display: product.photo ? 'none' : 'flex' }}
                >
                    inventory_2
                </span>
                {!product.isSelling && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                        <span className="bg-white text-[#ba1a1a] text-xs font-black px-3 py-1 rounded-full">
                            Ngừng bán
                        </span>
                    </div>
                )}
            </div>

            {/* Product name */}
            <h3 className="font-bold text-[#191c1e] mb-1 line-clamp-2 min-h-[2.5rem] text-sm leading-tight">
                {product.name}
            </h3>

            {/* Price + Add button */}
            <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-base font-black text-[#004ac6]">{formatPrice(product.price)}</span>
                {product.isSelling && (
                    <button
                        onClick={handleAddToCart}
                        className={`p-2 rounded-full transition-all active:scale-90 ${added
                            ? 'bg-green-500 text-white'
                            : 'bg-[#b4c5ff] text-[#004ac6] hover:bg-[#004ac6] hover:text-white'
                            }`}
                        title="Thêm vào giỏ"
                    >
                        <span className="material-symbols-outlined text-sm">
                            {added ? 'check' : 'add_shopping_cart'}
                        </span>
                    </button>
                )}
            </div>
        </Link>
    );
}
