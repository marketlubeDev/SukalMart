"use client";

import useCategories from "../../../../lib/hooks/useCategories";
import { useRouter } from "next/navigation";

export default function CategorySection() {
  const router = useRouter();
  const { categories, loading, error } = useCategories();

  
  // Get first 3 categories for first row and remaining 2 for second row
  const firstRowCategories = categories.slice(0, 3);
  const secondRowCategories = categories.slice(3, 5);

  const normalizeSlug = (value) =>
    String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const handleCategoryClick = (categoryName) => {
    // Navigate to category-specific page using normalized slug
    router.push(`/category/${normalizeSlug(categoryName)}`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full overflow-hidden container mx-auto py-10 px-4 md:px-10">
        <div className="text-[#333333] text-center text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-normal tracking-[-0.28px] mb-6">
          Shop by category
        </div>
        <div className="flex justify-center items-center w-full h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full overflow-hidden container mx-auto py-10 px-4 md:px-10">
        <div className="text-[#333333] text-center text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-normal tracking-[-0.28px] mb-6">
          Shop by category
        </div>
        <div className="text-red-500 text-center">
          Failed to load categories. Please try again later.
        </div>
      </div>
    );
  }

  // Don't render if no categories
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full overflow-hidden container mx-auto py-10 px-4 md:px-10"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          alignSelf: "stretch",
          background: "#FFF",
        }}
      >
        <div
          className="text-[#333333] text-center text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-normal tracking-[-0.28px]"
          style={{
            fontStyle: "normal",
            alignSelf: "stretch",
          }}
        >
          Shop by category
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
            {firstRowCategories.map((category, index) => (
            <div
                key={category.id || index}
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
          {/* Second row - 2 categories centered */}
          <div
            className="flex w-full"
              style={{
                justifyContent: "center",
                gap: "8px",
              }}
            >
            {secondRowCategories.map((category, index) => (
                <div
                  key={category.id || index}
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
        </div>
        
        {/* Tablet Layout - Show on sm and md */}
        <div className="hidden sm:flex lg:hidden sm:flex-wrap sm:justify-center sm:items-center sm:gap-2 md:gap-3 w-full">
          {categories.map((category, index) => (
            <div 
              key={category.id || index} 
              className="flex flex-col items-center justify-start cursor-pointer mb-4"
              style={{ flex: "0 0 calc(33.333% - 8px)" }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[160px] h-[160px] md:w-[180px] md:h-[180px]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[#000000] font-medium text-center mt-2 text-[12px] md:text-[13px] font-medium leading-normal tracking-[-0.28px]">
                {category.name}
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop Layout - Show on lg and above */}
        <div className="hidden lg:flex lg:flex-nowrap lg:justify-center lg:items-center lg:gap-3 xl:gap-6 w-full">
          {categories.map((category, index) => (
            <div 
              key={category.id || index} 
              className="flex flex-col items-center justify-start cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[200px] h-[200px] xl:w-[220px] xl:h-[220px]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[#000000] font-medium text-center mt-2 text-[12px] xl:text-[14px] font-medium leading-normal tracking-[-0.28px]">
                {category.name}
              </div>
            </div>
          ))}
        </div>
        <div className="border-b border-black/10 w-full mt-6"></div>
      </div>
    </>
  );
}
