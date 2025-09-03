"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from '@/app/_components/common/Button';
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { useWishlist } from "@/app/_components/context/WishlistContext";

export default function FeaturedProductCard({ product }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToCart = () => {
    if (!isClient) return;
    
    try {
      const raw = localStorage.getItem('cartItems');
      const items = raw ? JSON.parse(raw) : [];
      const idx = items.findIndex((it) => String(it.id) === String(product.id));

      // Convert price strings to numbers (remove ₹ symbol and commas)
      const priceNumber = parseInt(product.price.replace(/[₹,]/g, ''));
      const originalPriceNumber = parseInt(product.originalPrice.replace(/[₹,]/g, ''));

      if (idx >= 0) {
        const existing = items[idx];
        items[idx] = { ...existing, quantity: (existing.quantity || 1) + 1 };
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: priceNumber,
          originalPrice: originalPriceNumber,
          image: product.image,
          color: product.category,
          plug: 'Default',
          quantity: 1,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(items));
      window.dispatchEvent(new Event('cart-updated'));

      // Open the cart
      if (window.__openCart) {
        window.__openCart();
      } else {
        window.dispatchEvent(new Event('open-cart'));
      }
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Image
        key={i}
        src={i < Math.floor(product.rating) ? "/filledstar.svg" : "/star.svg"}
        alt="Star"
        width={16}
        height={16}
        className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4"
      />
    ));
  };

  return (
    <div className="flex flex-row gap-2 sm:gap-2 md:gap-3 lg:gap-4 w-full md:w-full lg:w-1/2 bg-white rounded-lg py-1 sm:py-2 md:py-2 lg:p-4 lg:pl-0 md:h-full hover:shadow-md transition-shadow duration-200">
      {/* Product Image - Responsive sizing */}
      <div className="relative w-1/3 md:w-2/5 lg:w-1/2 aspect-[16/9] md:aspect-[4/3] lg:aspect-[4/3] rounded overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 33vw, (max-width: 1024px) 40vw, 50vw"
          priority={false}
        />
        {/* Wishlist Button - matches ProductCard */}
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
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between md:h-full min-w-0">
        <div className="flex flex-col gap-1 sm:gap-1 md:gap-1.5 lg:gap-2 md:flex-1">
          {/* Product Name */}
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 leading-tight tracking-tight line-clamp-2">
            {product.name}
          </h3>
          
          {/* Category */}
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-normal text-gray-600 tracking-tight">
            {product.category}
          </p>

          {/* Rating */}
          <div className="flex flex-row gap-1 md:gap-1.5 lg:gap-2 items-center">
            <div className="flex flex-row gap-0.5 md:gap-0.5 lg:gap-1 items-center">
              {renderStars()}
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-gray-800 tracking-tight">
              {product.rating}
            </span>
          </div>

          {/* Description */}
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-normal text-gray-700 tracking-tight leading-relaxed line-clamp-2 md:flex-1">
            {product.description}
          </p>
        </div>

        {/* Price and Button */}
                  <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 md:mt-auto">
          {/* Price */}
          <div className="flex flex-row gap-1.5 md:gap-2 lg:gap-3 items-center">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[var(--color-primary)] tracking-tight">
              {product.price}
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-normal line-through text-gray-500 tracking-tight">
              {product.originalPrice}
            </span>
          </div>
          
          {/* Add to Cart Button */}
          <Button
            variant="secondary"
            size="large"
            onClick={addToCart}
            disabled={!isClient}
            className="gap-1.5 px-2 py-1.5 md:px-3 md:py-1.5 lg:px-4 lg:py-2 text-xs md:text-sm text-[var(--color-primary)] bg-white border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed self-start rounded"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}