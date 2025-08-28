"use client";
import ProductCard from "../ProductCard";
import { bestSellers } from "../../../../lib/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function BestSellersSection() {
  const router = useRouter();
  const scrollerRef = useRef(null);
  
  const addToCart = (product) => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cartItems') : null;
      const items = raw ? JSON.parse(raw) : [];
      const index = items.findIndex((it) => String(it.id) === String(product.id));
      if (index >= 0) {
        const existing = items[index];
        items[index] = { ...existing, quantity: (existing.quantity || 1) + (product.quantity || 1) };
      } else {
        items.push({ ...product, quantity: product.quantity || 1 });
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cartItems', JSON.stringify(items));
        window.dispatchEvent(new Event('cart-updated'));
        if (window.__openCart) {
          window.__openCart();
        } else {
          window.dispatchEvent(new Event('open-cart'));
        }
      }
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = scrollerRef.current;
    if (!el) return;
    const isMd = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
    const isLg = window.matchMedia('(min-width: 1024px) and (max-width: 1279px)').matches;
    if (!isMd && !isLg) return;

    let timerId;
    const handleScroll = () => {
      el.classList.add('scrolling');
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        el.classList.remove('scrolling');
      }, 700);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (timerId) clearTimeout(timerId);
    };
  }, []);
  return (
    <div className="bg-white container mx-auto px-2 md:px-8 lg:px-10 2xl:px-10 py-0 md:py-4 xl:pb-8 overflow-hidden mb-6 md:mb-6">
      <div className="px-2 md:px-0">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2
            className="font-bold"
            style={{
              color: "#333",
              // fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "clamp(18px, 4vw, 28px)",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "-0.24px",
            }}
          >
            Best Sellers
          </h2>
          <button
            className="flex items-center gap-1 md:gap-2 font-medium transition-colors cursor-pointer"
            style={{ color: "var(--color-primary)", cursor: 'pointer' }}
            onClick={() => router.push("/products")}
          >
            <span className="text-sm md:text-base">View all</span>
            <img
              src="/nextarrow.svg"
              alt="Next arrow"
              className="w-5 h-5 md:w-7 md:h-7"
            />
          </button>
        </div>

        {/* Best Sellers Grid */}
        <div ref={scrollerRef} className="grid grid-flow-col auto-cols-[45%] overflow-x-auto scrollbar-primary gap-5 pb-0 md:pb-6 sm:gap-2 md:gap-4 md:grid-flow-col md:auto-cols-[25%] md:overflow-x-auto md:scrollbar-primary md:scrollbar-thin md:scrollbar-h-2 md-scrollbar-auto-hide lg:grid-flow-col lg:auto-cols-[20%] lg:overflow-x-auto lg:scrollbar-primary lg:scrollbar-thin lg-scrollbar-auto-hide xl:grid xl:grid-cols-6 xl:overflow-visible">
          {/* Product 1 - A1 Badge */}
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[300px] xl:h-[340px]" onClick={() => router.push("/products/1")} style={{ cursor: "pointer" }}>
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-[140px] md:h-[160px] xl:h-[180px] object-cover"
              />
              {/* A1 Badge */}
              <div className="absolute top-1 md:top-2 left-[-16px]">
                <div className="relative">
                  <img
                    src="/badge.svg"
                    alt="Badge"
                    className="w-12 h-8 md:w-16 md:h-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-[10px] md:text-xs font-bold">
                      #1
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 md:p-4 flex-1 flex flex-col">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Dove Nutritive Soap
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">Hair Care</p>
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
                </span>
              </div>
              <div className="flex justify-start mt-0 md:mt-auto">
                <button onClick={(e) => { e.stopPropagation(); addToCart({ id: 1, name: 'Dove Nutritive Solutions', price: 1099, originalPrice: 1299, image: 'https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg', color: 'Hair Care', plug: 'Default' }); }}
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm cursor-pointer"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid var(--color-primary)",
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 - #2 Badge */}
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[300px] xl:h-[340px]" onClick={() => router.push("/products/2")} style={{ cursor: "pointer" }}>
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-[140px] md:h-[160px] xl:h-[180px] object-cover"
              />
              {/* #2 Badge */}
              <div className="absolute top-1 md:top-2 left-[-16px]">
                <div className="relative">
                  <img
                    src="/badge.svg"
                    alt="Badge"
                    className="w-12 h-8 md:w-16 md:h-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-[10px] md:text-xs font-bold">
                      #2
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 md:p-4 flex-1 flex flex-col">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Lux Body Wash
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                Body & Shower
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
                </span>
              </div>
              <div className="flex justify-start mt-0 md:mt-auto">
                <button onClick={(e) => { e.stopPropagation(); addToCart({ id: 2, name: 'Lux Body Wash', price: 1099, originalPrice: 1299, image: 'https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp', color: 'Body & Shower', plug: 'Default' }); }}
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm cursor-pointer"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid var(--color-primary)",
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 3 - #3 Badge */}
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[300px] xl:h-[340px]" onClick={() => router.push("/products/3")} style={{ cursor: "pointer" }}>
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-[140px] md:h-[160px] xl:h-[180px] object-cover"
              />
              {/* #3 Badge */}
              <div className="absolute top-1 md:top-2 left-[-16px]">
                <div className="relative">
                  <img
                    src="/badge.svg"
                    alt="Badge"
                    className="w-12 h-8 md:w-16 md:h-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-[10px] md:text-xs font-bold">
                      #3
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 md:p-4 flex-1 flex flex-col">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Rexona / Sure 
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                Soap & Deodorants
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  ₹1,899
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹2,099
                </span>
              </div>
              <div className="flex justify-start mt-0 md:mt-auto">
                <button onClick={(e) => { e.stopPropagation(); addToCart({ id: 3, name: 'Rexona / Sure Deo', price: 1899, originalPrice: 2099, image: 'https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp', color: 'Soap & Deodorants', plug: 'Default' }); }}
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm cursor-pointer"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid var(--color-primary)",
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 4 - No Badge */}
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[300px] xl:h-[340px]" onClick={() => router.push("/products/4")} style={{ cursor: "pointer" }}>
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-[140px] md:h-[160px] xl:h-[180px] object-cover"
              />
            </div>
            <div className="p-2 md:p-4 flex-1 flex flex-col">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Vaseline Body Lotion
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">Skin Care</p>
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "var(--color-primary)" }}
                >
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
                </span>
              </div>
              <div className="flex justify-start mt-0 md:mt-auto">
                <button onClick={(e) => { e.stopPropagation(); addToCart({ id: 4, name: 'Vaseline Body Lotion', price: 1099, originalPrice: 1299, image: 'https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg', color: 'Skin Care', plug: 'Default' }); }}
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm cursor-pointer"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid var(--color-primary)",
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 5 - Extra */}
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[300px] xl:h-[340px]" onClick={() => router.push("/products/5")} style={{ cursor: "pointer" }}>
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                alt="Extra Best Seller 1"
                className="w-full h-[140px] md:h-[160px] xl:h-[180px] object-cover"
              />
            </div>
            <div className="p-2 md:p-4 flex-1 flex flex-col">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">Sunsilk Pro Repair</h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">Hair Care</p>
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                <span className="text-sm md:text-lg font-bold" style={{ color: "var(--color-primary)" }}>
                  ₹999
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">₹1,199</span>
              </div>
              <div className="flex justify-start mt-0 md:mt-auto">
                <button onClick={(e) => { e.stopPropagation(); addToCart({ id: 5, name: 'Sunsilk Pro Repair', price: 999, originalPrice: 1199, image: 'https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg', color: 'Hair Care', plug: 'Default' }); }}
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm cursor-pointer"
                  style={{ display: "flex", height: "32px", padding: "8px 12px", justifyContent: "center", alignItems: "center", gap: "4px", borderRadius: "4px", border: "1px solid var(--color-primary)" }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 6 - Extra */}
          <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[300px] xl:h-[340px]" onClick={() => router.push("/products/6")} style={{ cursor: "pointer" }}>
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                alt="Extra Best Seller 2"
                className="w-full h-[140px] md:h-[160px] xl:h-[180px] object-cover"
              />
            </div>
            <div className="p-2 md:p-4 flex-1 flex flex-col">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">Lux Soft Touch</h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">Body & Shower</p>
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                <span className="text-sm md:text-lg font-bold" style={{ color: "var(--color-primary)" }}>
                  ₹899
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">₹1,099</span>
              </div>
              <div className="flex justify-start mt-0 md:mt-auto">
                <button onClick={(e) => { e.stopPropagation(); addToCart({ id: 6, name: 'Lux Soft Touch', price: 899, originalPrice: 1099, image: 'https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp', color: 'Body & Shower', plug: 'Default' }); }}
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm cursor-pointer"
                  style={{ display: "flex", height: "32px", padding: "8px 12px", justifyContent: "center", alignItems: "center", gap: "4px", borderRadius: "4px", border: "1px solid var(--color-primary)" }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      <div className="border-b border-black/10 w-full mt-6"></div>
      </div>
    </div>
    
  );
}
