

"use client";

import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { useWishlist } from "../../_components/context/WishlistContext";

export default function ProductCard({
  product,
  showBadge = false,
  badgeText = "",
}) {
  const router = useRouter();
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleProductClick = () => {
    // Extract original product ID (remove _index suffix if present)
    const rawId = product && product.id != null ? String(product.id) : "";
    const originalId = rawId.includes('_') ? rawId.split('_')[0] : rawId;
    if (!originalId) return;
    console.log("Product clicked:", originalId, product.name);
    router.push(`/products/${originalId}`);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      style={{
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        cursor: "pointer"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      onClick={handleProductClick}
    >
      <div className="relative">
        <div className="aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Wishlist Heart */}
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 sm:p-2 shadow hover:scale-105 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlistItem(product);
          }}
        >
          {wishlisted ? (
            <FaHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
          ) : (
            <CiHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
          )}
        </button>
        {/* Badge */}
        {showBadge && (
          <div className="absolute top-2 left-0 flex items-center shadow-lg">
            <div
              className="text-white px-2 text-xs font-bold flex items-center"
              style={{ backgroundColor:"var(--color-primary)", height: "23px" }}
            >
              {badgeText}
            </div>
            <svg
              width="17"
              height="23"
              viewBox="0 0 17 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z"
                fill="var(--color-primary)"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col h-32">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-2 flex-shrink-0">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 mb-2 sm:mb-3 flex-shrink-0">{product.type || product.category}</p>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-base sm:text-lg font-bold" style={{ color: "var(--color-primary)" }}>
            ₹{product.price?.toLocaleString() || product.price}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 line-through">
            ₹{product.originalPrice?.toLocaleString() || product.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
}
