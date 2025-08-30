"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from '@/app/_components/common/Button';

export default function FeaturedProductCard({ product }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

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
    <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full md:w-full lg:w-1/2 bg-white rounded-lg py-2 sm:py-3 md:py-4 lg:p-6 lg:pl-0 md:h-full hover:shadow-md transition-shadow duration-200">
      {/* Product Image - Responsive sizing */}
      <div className="relative w-1/3 md:w-2/5 lg:w-1/2 aspect-[4/3] md:aspect-[3/2] lg:aspect-square rounded overflow-hidden flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 33vw, (max-width: 1024px) 40vw, 50vw"
          priority={false}
        />
        {/* Wishlist Button */}
        <button 
          className="absolute top-2 md:top-2 lg:top-3 left-2 md:left-2 lg:left-3 w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <Image 
            src="/like.svg" 
            alt="Wishlist" 
            width={20}
            height={20}
            className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" 
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between md:h-full min-w-0">
        <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 md:flex-1">
          {/* Product Name */}
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 leading-tight tracking-tight line-clamp-2">
            {product.name}
          </h3>
          
          {/* Category */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal text-gray-600 tracking-tight">
            {product.category}
          </p>

          {/* Rating */}
          <div className="flex flex-row gap-1 md:gap-1.5 lg:gap-2 items-center">
            <div className="flex flex-row gap-0.5 md:gap-0.5 lg:gap-1 items-center">
              {renderStars()}
            </div>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-800 tracking-tight">
              {product.rating}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal text-gray-700 tracking-tight leading-relaxed line-clamp-2 md:flex-1">
            {product.description}
          </p>
        </div>

        {/* Price and Button */}
        <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 md:mt-auto">
          {/* Price */}
          <div className="flex flex-row gap-1.5 md:gap-2 lg:gap-3 items-center">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--color-primary)] tracking-tight">
              {product.price}
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-normal line-through text-gray-500 tracking-tight">
              {product.originalPrice}
            </span>
          </div>
          
          {/* Add to Cart Button */}
          <Button
            variant="secondary"
            size="large"
            onClick={addToCart}
            disabled={!isClient}
            className="gap-2 px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 text-sm md:text-base text-[var(--color-primary)] bg-white border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed self-start rounded"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}