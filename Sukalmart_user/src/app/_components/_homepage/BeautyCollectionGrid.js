'use client';

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const products = [
  {
    id: "17",
    name: "Glow & Hydrate Face Serum",
    category: "Skincare",
    price: 899,
    originalPrice: 1099,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
  },
  {
    id: "18",
    name: "Luxury Beauty Collection Set",
    category: "Beauty Essentials",
    price: 2499,
    originalPrice: 3199,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
  },
  {
    id: "19",
    name: "Anti-Aging Night Cream",
    category: "Anti-Aging",
    price: 1299,
    originalPrice: 1599,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
  }
];

export default function BeautyCollectionGrid() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  // Auto-advance carousel for mobile
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const nextSlide = (prev + 1) % products.length;
        const cardWidth = carousel.children[0]?.offsetWidth || 0;
        const gap = 8; // 8px gap between cards
        carousel.scrollTo({
          left: nextSlide * (cardWidth + gap),
          behavior: 'smooth'
        });
        return nextSlide;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 w-full">
      <div 
        ref={carouselRef} 
        className="flex overflow-x-auto scrollbar-hide lg:overflow-visible snap-x snap-mandatory gap-2 lg:gap-0"
      >
        {products.map((product, index) => (
          <div 
            key={product.id}
            className="flex-shrink-0 w-1/2 lg:w-1/3 snap-start"
          >
            <div 
              className="bg-white rounded-lg p-0 lg:p-4 h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-3 sm:p-4 mb-3 sm:mb-4 rounded-lg">
                {product.image?.includes('marketlube') ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
                    }}
                  />
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1024px) 33vw, 33vw"
                    className="object-contain"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
                    }}
                  />
                )}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 tracking-[-0.32px] px-2 lg:px-0">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 tracking-[-0.28px] px-2 lg:px-0">
                {product.category}
              </p>
              <div className="flex items-center gap-2 mt-auto px-2 lg:px-0 pb-2 lg:pb-0">
                <span className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
                  ₹{product.price}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="lg:hidden w-full mt-4">
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-1 bg-[var(--color-primary)] rounded-full transition-all duration-500"
              style={{ width: `${((currentSlide + 1) * (100 / products.length))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 