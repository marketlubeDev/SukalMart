"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "../_components/context/WishlistContext";
import Image from "next/image";
import { useLanguage } from "../_components/context/LanguageContext";
import { t } from "../../lib/translations";

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Popular",
];

function WishlistCard({ product, onRemove }) {
  const router = useRouter();

  const handleCardClick = () => {
    // Extract original product ID (remove _index suffix if present)
    const rawId = product && product.id != null ? String(product.id) : "";
    const originalId = rawId.includes('_') ? rawId.split('_')[0] : rawId;
    if (!originalId) return;
    console.log("Wishlist card clicked:", originalId, product.name);
    router.push(`/products/${originalId}`);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="aspect-square flex items-center justify-center">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover" 
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
            }}
            unoptimized={product.image?.includes('amazonaws.com')}
          />
        </div>
        {/* Heart overlay */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(product.id);
          }}
          aria-label="Remove from wishlist"
          className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow hover:scale-105 transition-transform cursor-pointer"
        >
          <Image src="/like-black.svg" alt="Remove from wishlist" width={16} height={16} className="w-4 h-4" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-600 mb-3">{product.type}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>
            ₹{(product.price ?? 0).toLocaleString()}
          </span>
          {product.originalPrice ? (
            <span className="text-sm text-gray-500 line-through">
              ₹{(product.originalPrice ?? 0).toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const [sortBy, setSortBy] = useState("Featured");
  const { items, remove } = useWishlist();
  const { language } = useLanguage();

  const products = useMemo(() => {
    const list = [...items];
    if (sortBy === "Price: Low to High") return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortBy === "Price: High to Low") return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return list; // Featured/Newest/Popular fall back to stored order
  }, [items, sortBy]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-white mx-auto w-full max-w-screen-xl px-4 md:px-10 py-6 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-800">{t("nav.wishlist", language)}</h1>
          </div>

          <div className="flex items-center gap-1 relative">
            <span className="text-sm text-gray-600">{t("homepage.productSidebar.sortBy", language)}</span>
            <div className="relative flex items-center" style={{ marginRight: "12px" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-0 pr-6 py-0 text-sm bg-white appearance-none focus:outline-none font-semibold text-gray-800"
                style={{
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  paddingLeft: "0rem",
                  paddingRight: "1.5rem",
                  height: "24px",
                  lineHeight: "24px",
                  minWidth: "80px",
                  cursor: "pointer",
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="font-normal">
                    {t(`homepage.productSidebar.${option === "Featured" ? "featured" : option === "Price: Low to High" ? "priceLowToHigh" : option === "Price: High to Low" ? "priceHighToLow" : option === "Newest" ? "newest" : "popular"}`, language)}
                  </option>
                ))}
              </select>
              <Image
                src="/dropdownicon.svg"
                alt="dropdown"
                width={12}
                height={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                style={{ minWidth: "12px", minHeight: "12px" }}
              />
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-600 py-16">{t("wishlist.empty", language)}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product) => (
              <WishlistCard key={product.id} product={product} onRemove={remove} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 