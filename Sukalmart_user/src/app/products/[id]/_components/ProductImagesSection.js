"use client";

import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";

export default function ProductImagesSection({
  product,
  selectedImage,
  setSelectedImage,
  toggleWishlistItem,
  isInWishlist,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnail Images - Left Side */}
      <div className="hidden md:flex flex-col gap-2">
        {product?.images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
              selectedImage === index
                ? "border-[var(--color-primary)]"
                : "border-gray-200"
            }`}
          >
            <Image
              src={image}
              alt={`${product?.name} ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80x80?text=Image";
              }}
              unoptimized={image?.includes("amazonaws.com")}
            />
          </button>
        ))}
      </div>

      {/* Main Image - Right Side */}
      <div className="flex-1">
        <div className="aspect-square rounded-lg overflow-hidden relative">
          <Image
            src={product?.images[selectedImage]}
            alt={product?.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x500?text=Product+Image";
            }}
            unoptimized={product?.images[selectedImage]?.includes(
              "amazonaws.com"
            )}
          />
          {/* Like Button - Only render when mounted */}
          {mounted && (
            <button
              onClick={() => toggleWishlistItem(product)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
            >
              {isInWishlist(product?.id) ? (
                <FaHeart className="w-5 h-5 text-red-600" />
              ) : (
                <CiHeart className="w-5 h-5 text-gray-800" />
              )}
            </button>
          )}
        </div>
        {/* Mobile Thumbnails Row */}
        <div className="md:hidden mt-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {product?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-[var(--color-primary)]"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product?.name} ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/64x64?text=Image";
                  }}
                  unoptimized={image?.includes("amazonaws.com")}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
