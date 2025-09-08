

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
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
      className="group bg-white rounded-lg overflow-hidden cursor-pointer shadow-none flex flex-col min-w-0"
      onClick={handleProductClick}
    >
      <div className="relative">
        <div className="">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={180}
            className="w-full h-36 md:h-40 lg:h-56 xl:h-44 object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
            }}
            unoptimized={product.image?.includes('amazonaws.com')}
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
      <div className="pt-4 px-1 flex-1 flex flex-col">
        <h3 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 mb-1 lg:mb-2 line-clamp-2" style={{ lineHeight: "1.1" }}>
          {product.name}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-2 md:mb-3 lg:mb-4">
          {product.type || product.category}
        </p>
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 whitespace-nowrap mt-auto">
          <span
            className="text-xs md:text-sm lg:text-base font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            <span className="align-baseline text-[9px] md:text-[10px] lg:text-xs">AED</span>
            <span className="ml-1">{String(product.price ?? '').replace(/AED\s*/, '')}</span>
          </span>
          {product.originalPrice ? (
            <span className="relative inline-flex items-center text-gray-500">
              <span className="align-baseline text-[9px] md:text-[10px] lg:text-xs">AED</span>
              <span className="text-[10px] md:text-xs lg:text-sm ml-1">{String(product.originalPrice ?? '').replace(/AED\s*/, '')}</span>
              <span aria-hidden="true" className="absolute left-0 right-0 top-1/2 -translate-y-1/2 transform h-px bg-gray-700"></span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
