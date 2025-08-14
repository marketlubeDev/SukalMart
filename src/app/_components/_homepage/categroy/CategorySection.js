"use client";

import { categories } from "../../../../lib/data";
import { useRouter } from "next/navigation";

export default function     CategorySection() {
  const router = useRouter();
  
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

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full overflow-hidden container mx-auto py-10 sm:px-0"
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
        </div>
        
        {/* Desktop/Tablet Layout - Only show on sm and above */}
        <div className="hidden sm:flex sm:flex-nowrap sm:justify-center sm:items-center sm:gap-3 md:gap-4 lg:gap-3 xl:gap-6 w-full">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-start cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[#000000] font-medium text-center mt-2 text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] font-medium leading-normal tracking-[-0.28px]">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-black/10 w-[80%] mt-6 mx-auto"></div>
    </>
  );
}
