"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "../_components/_homepage/ProductCard";
import ProductSidebar from "./_components/ProductSidebar";
import ProductGrid from "./_components/ProductGrid";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 1000, max: 12999 });
  const [sortBy, setSortBy] = useState("Featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Mobile filter UI state
  const [activeFilterTab, setActiveFilterTab] = useState("Categories");
  const [snapshot, setSnapshot] = useState({
    selectedCategory: "",
    selectedDiscount: "",
    priceRange: { min: 1000, max: 12999 },
  });
  const [pendingSort, setPendingSort] = useState("Featured");
  const [sortSnapshot, setSortSnapshot] = useState("Featured");

  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Popular",
  ];

  // Filter data (replicated for mobile sheet)
  const categories = [
    "Hair Care",
    "Body & Shower",
    "Soap & Deodorants",
    "Skin Care",
    "Oral & Misc",
  ];

  const discountOptions = [
    "10% off & more",
    "20% off & more",
    "30% off & more",
    "40% off & more",
    "50% off & more",
  ];

  // Reset category when page loads (when coming from Products navbar link)
  useEffect(() => {
    const storedCategory = localStorage.getItem('selectedCategory');
    if (storedCategory && storedCategory !== "") {
      setSelectedCategory(storedCategory);
    } else {
      setSelectedCategory(""); // Show All Products
    }
  }, []);

  // Hide bottom bar on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop;
      if (currentY > lastScrollY.current && currentY > 80) {
        setIsBottomBarVisible(false);
      } else {
        setIsBottomBarVisible(true);
      }
      lastScrollY.current = currentY <= 0 ? 0 : currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll when any sheet is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    if (isFilterOpen || isSortOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalBodyOverflow || '';
      document.documentElement.style.overflow = originalHtmlOverflow || '';
    }
    return () => {
      document.body.style.overflow = originalBodyOverflow || '';
      document.documentElement.style.overflow = originalHtmlOverflow || '';
    };
  }, [isFilterOpen, isSortOpen]);

  // Handlers for mobile filter sheet
  const openFilterSheet = () => {
    setSnapshot({
      selectedCategory,
      selectedDiscount,
      priceRange: { ...priceRange },
    });
    setActiveFilterTab("Categories");
    setIsFilterOpen(true);
  };

  const openSortSheet = () => {
    setSortSnapshot(sortBy);
    setPendingSort(sortBy);
    setIsSortOpen(true);
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedDiscount("");
    setPriceRange({ min: 0, max: 20000 });
  };

  const discardFilters = () => {
    setSelectedCategory(snapshot.selectedCategory);
    setSelectedDiscount(snapshot.selectedDiscount);
    setPriceRange({ ...snapshot.priceRange });
    setIsFilterOpen(false);
  };

  // Sample product data - you can replace this with your actual data
  const products = [
    {
      id: "1",
      name: "Glow & Hydrate Face Serum",
      type: "Skincare",
      price: 899,
      originalPrice: 1099,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Skincare",
      discount: 18,
    },
    {
      id: "2",
      name: "Luxury Beauty Collection Set",
      type: "Beauty Essentials",
      price: 2499,
      originalPrice: 3199,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Beauty Essentials",
      discount: 22,
    },
    {
      id: "3",
      name: "Anti-Aging Night Cream",
      type: "Anti-Aging",
      price: 1299,
      originalPrice: 1599,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Anti-Aging",
      discount: 19,
    },
    {
      id: "4",
      name: "Vitamin C Brightening Serum",
      type: "Skincare",
      price: 799,
      originalPrice: 999,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Skincare",
      discount: 20,
    },
    {
      id: "5",
      name: "Hyaluronic Acid Moisturizer",
      type: "Skincare",
      price: 699,
      originalPrice: 899,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Skincare",
      discount: 22,
    },
    {
      id: "6",
      name: "Retinol Eye Cream",
      type: "Anti-Aging",
      price: 999,
      originalPrice: 1299,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Anti-Aging",
      discount: 23,
    },
    {
      id: "7",
      name: "Gentle Facial Cleanser",
      type: "Skincare",
      price: 599,
      originalPrice: 799,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Skincare",
      discount: 25,
    },
    {
      id: "8",
      name: "SPF 50 Sunscreen",
      type: "Skincare",
      price: 899,
      originalPrice: 1199,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Skincare",
      discount: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-0 sm:px-4 py-8 pb-0 lg:pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/5">
            <div className="sticky top-20">
            <ProductSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDiscount={selectedDiscount}
              setSelectedDiscount={setSelectedDiscount}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-4/5">
            <ProductGrid
              products={products}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ${isBottomBarVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-screen-sm mx-auto px-6 py-4 flex items-center justify-evenly text-gray-900">
          <button
            onClick={openFilterSheet}
            className="flex items-center gap-2 text-gray-900"
            aria-label="Filter"
          >
            <img src="/filtericon.svg" alt="Filter" className="w-6 h-6" />
            <span className="font-semibold text-base">Filter</span>
          </button>
          <div className="h-6 w-px bg-gray-300" aria-hidden="true" />
          <button
            onClick={openSortSheet}
            className="flex items-center gap-2 text-gray-900"
            aria-label="Sort"
          >
            <img src="/sorticon.svg" alt="Sort" className="w-6 h-6" />
            <span className="font-semibold text-base">Sort</span>
          </button>
        </div>
      </div>

      {/* Filter sheet */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}>
              <h3 className="text-base font-semibold text-gray-900">Filters</h3>
              <button onClick={clearAllFilters} className="text-red-600 text-sm font-medium">Clear all</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left Tabs */}
              <div className="w-5/12 bg-gray-50 overflow-y-auto">
                {['Categories','Discount','Price Range'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilterTab(tab)}
                    className={`w-full text-left px-4 py-3 ${activeFilterTab === tab ? 'bg-white font-semibold text-gray-900' : 'text-gray-700'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Right Content */}
              <div className="w-7/12 p-4 overflow-y-auto" style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.10)" }}>
                {activeFilterTab === 'Categories' && (
                  <div className="space-y-0">
                    {categories.map((cat) => (
                      <div key={cat} style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.10)" }}>
                        <button
                          onClick={() => { setSelectedCategory(cat); localStorage.setItem('selectedCategory', cat); }}
                          className={`w-full text-left px-3 py-3 ${selectedCategory === cat ? 'bg-green-100 text-[#035F0F] font-semibold' : 'hover:bg-gray-50 text-gray-800'}`}
                        >
                          {cat}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeFilterTab === 'Discount' && (
                  <div className="space-y-0">
                    {discountOptions.map((opt) => (
                      <div key={opt} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}>
                        <button
                          onClick={() => setSelectedDiscount(opt)}
                          className={`w-full text-left px-3 py-3 ${selectedDiscount === opt ? 'bg-green-100 text-[#035F0F] font-semibold' : 'hover:bg-gray-50 text-gray-800'}`}
                        >
                          {opt}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeFilterTab === 'Price Range' && (
                  <div>
                    <div className="mb-3 text-sm font-semibold text-gray-900">Select Price range</div>
                    <div className="mb-4">
                      <div className="relative">
                        {/* Background track */}
                        <div className="w-full h-1 bg-gray-300 rounded-lg relative">
                          {/* Green selected portion */}
                          <div
                            className="h-1 bg-[#035F0F] rounded-lg absolute top-0 left-0"
                            style={{
                              width: `${((priceRange.max - priceRange.min) / (20000 - 0)) * 100}%`,
                              left: `${(priceRange.min / 20000) * 100}%`,
                            }}
                          />

                          {/* Start circle */}
                          <div
                            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                            style={{ left: `${(priceRange.min / 20000) * 100}%` }}
                          >
                            <img src="/pricecircle.svg" alt="start" className="w-3 h-3" />
                          </div>

                          {/* End circle */}
                          <div
                            className="absolute top-1/2 transform -translate-y-1/2 translate-x-1/2"
                            style={{ left: `${(priceRange.max / 20000) * 100}%` }}
                          >
                            <img src="/pricecircle.svg" alt="end" className="w-3 h-3" />
                          </div>
                        </div>

                        {/* Hidden range inputs for interaction */}
                        <input
                          type="range"
                          min="0"
                          max="20000"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              min: parseInt(e.target.value),
                            }))
                          }
                          className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max="20000"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              max: parseInt(e.target.value),
                            }))
                          }
                          className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <div
                          className="flex justify-center items-center gap-2 min-w-[80px] rounded bg-black/5 text-gray-700 px-2 py-1 text-sm font-semibold"
                        >
                          ₹ {priceRange.min.toLocaleString()}
                        </div>
                        <img src="/doublearrow.svg" alt="range" className="w-5 h-2 mx-2 flex-shrink-0" />
                        <div
                          className="flex justify-center items-center gap-2 min-w-[80px] rounded bg-black/5 text-gray-700 px-2 py-1 text-sm font-semibold"
                        >
                          ₹ {priceRange.max.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.10)" }}>
              <button onClick={discardFilters} className="flex-1 text-center py-3 text-red-600 font-medium">Discard</button>
              <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
              <button onClick={() => setIsFilterOpen(false)} className="flex-1 text-center py-3 text-[#035F0F] font-semibold">Apply</button>
            </div>
        </div>
      )}

      {/* Sort sheet */}
      {isSortOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}>
            <h3 className="text-base font-semibold text-gray-900">Sort by</h3>
            <button onClick={() => setPendingSort("Featured")} className="text-red-600 text-sm font-medium">Clear all</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {sortOptions.map((option) => (
              <div key={option} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)", marginLeft: 16, marginRight: 16 }}>
                <button
                  onClick={() => setPendingSort(option)}
                  className={`w-full text-left px-4 py-3 ${pendingSort === option ? 'text-[#035F0F] font-semibold' : 'text-gray-800 hover:bg-gray-50'}`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.10)" }}>
            <button onClick={() => { setSortBy(sortSnapshot); setIsSortOpen(false); }} className="flex-1 text-center py-3 text-red-600 font-medium">Discard</button>
            <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <button onClick={() => { setSortBy(pendingSort); setIsSortOpen(false); }} className="flex-1 text-center py-3 text-[#035F0F] font-semibold">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}
