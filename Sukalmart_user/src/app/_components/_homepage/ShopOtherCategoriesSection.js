"use client";

import { categories } from "../../../lib/data";
import { useRouter } from "next/navigation";

export default function ShopOtherCategoriesSection({ currentCategory }) {
  const router = useRouter();
  
  // Normalize strings to consistent slugs (e.g., "Body & Shower" -> "body-shower")
  const normalizeSlug = (value) =>
    String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const currentSlug = normalizeSlug(currentCategory);

  // Filter out the current category and get remaining categories
  const otherCategories = categories.filter((category) =>
    normalizeSlug(category.name) !== currentSlug
  );

  const handleCategoryClick = (categoryName) => {
    // Navigate to category-specific page using normalized slug
    router.push(`/category/${normalizeSlug(categoryName)}`);
  };

  return (
    <div className="py-8 container mx-auto px-4 sm:px-0 md:px-8 xl:px-10">
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[28px] font-bold text-gray-800 mb-4">
            Shop other categories
          </h2>
        </div>
        
        {/* Mobile Layout - Only show on mobile */}
        <div className="w-full sm:hidden">
          {/* First row - 3 categories */}
          <div
            className="flex w-full mb-2"
            style={{
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            {otherCategories.slice(0, 3).map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start cursor-pointer"
                style={{
                  flex: "0 0 32%",
                  maxWidth: "120px",
                }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[100px] h-[100px]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[#000000] font-medium text-center mt-2 text-[10px] font-medium leading-normal tracking-[-0.28px]">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
          {/* Second row - remaining categories centered */}
          {otherCategories.length > 3 && (
            <div
              className="flex w-full"
              style={{
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {otherCategories.slice(3).map((category, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start cursor-pointer"
                  style={{
                    flex: "0 0 32%",
                    maxWidth: "120px",
                  }}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[100px] h-[100px]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[#000000] font-medium text-center mt-2 text-[10px] font-medium leading-normal tracking-[-0.28px]">
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Desktop/Tablet Layout - Only show on sm and above */}
        <div className="hidden sm:flex sm:flex-nowrap sm:justify-center sm:items-center sm:gap-3 md:gap-4 lg:gap-3 xl:gap-6 w-full">
          {otherCategories.map((category, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-start cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[200px] h-[200px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[#000000] font-medium text-center mt-2 text-[12px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-medium leading-normal tracking-[-0.28px]">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 