"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "../_components/_homepage/ProductCard";
import ProductSidebar from "./_components/ProductSidebar";
import ProductGrid from "./_components/ProductGrid";
import useProducts from "@/lib/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 12999 });
  const [sortBy, setSortBy] = useState("Featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const searchParams = useSearchParams();

  // Mobile filter UI state
  const [activeFilterTab, setActiveFilterTab] = useState("Categories");
  const [snapshot, setSnapshot] = useState({
    selectedCategory: "",
    selectedDiscount: "",
    priceRange: { min: 0, max: 12999 },
  });
  const [pendingSort, setPendingSort] = useState("Featured");
  const [sortSnapshot, setSortSnapshot] = useState("Featured");
  const [draggingHandle, setDraggingHandle] = useState(null); // 'min' or 'max' or null

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

  // Fetch products from API
  const sortParam =
    sortBy === "Price: Low to High"
      ? "price-low"
      : sortBy === "Price: High to Low"
      ? "price-high"
      : undefined;
  const { products, loading, error, pagination } = useProducts({
    page: 1,
    limit: 24,
    ...(sortParam ? { sort: sortParam } : {}),
    ...(priceRange
      ? { minPrice: priceRange.min, maxPrice: priceRange.max }
      : {}),
  });

  // Static product data
  const staticProduct = {
    id: "static-premium-hair-oil",
    name: "Premium Hair Growth Oil",
    type: "Hair Care",
    category: "Hair Care",
    price: 899,
    originalPrice: 1299,
    image: "/haircare1.jpg",
    description: "Advanced hair growth formula with natural ingredients",
    features: [
      "Promotes hair growth",
      "Reduces hair fall",
      "Natural ingredients",
      "Suitable for all hair types"
    ],
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    discount: 31
  };

  // Combine static product with API products
  const allProducts = [staticProduct, ...(Array.isArray(products) ? products : [])];

  console.log(allProducts, "productsewrewrewr");
  // Reset category when page loads (when coming from Products navbar link)
  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory && storedCategory !== "") {
      setSelectedCategory(storedCategory);
    } else {
      setSelectedCategory(""); // Show All Products
    }
  }, []);

  // If navigated with a price range label (?price=...), parse and set priceRange
  useEffect(() => {
    const priceLabel = searchParams?.get("price");
    if (!priceLabel) return;

    const parsePriceRangeLabel = (label) => {
      const sanitized = label
        .replaceAll(",", "")
        .replaceAll("₹", "")
        .trim();

      // Under X
      const underMatch = sanitized.match(/^Under\s+(\d+)$/i);
      if (underMatch) {
        const max = parseInt(underMatch[1], 10);
        return { min: 0, max };
      }

      // Over X
      const overMatch = sanitized.match(/^Over\s+(\d+)$/i);
      if (overMatch) {
        const min = parseInt(overMatch[1], 10);
        return { min, max: 20000 };
      }

      // X - Y
      const rangeMatch = sanitized.match(/^(\d+)\s*-\s*(\d+)$/);
      if (rangeMatch) {
        const min = parseInt(rangeMatch[1], 10);
        const max = parseInt(rangeMatch[2], 10);
        if (!Number.isNaN(min) && !Number.isNaN(max) && min <= max) {
          return { min, max };
        }
      }

      // Fallback: do not change current range
      return null;
    };

    const parsed = parsePriceRangeLabel(priceLabel);
    if (parsed) {
      setPriceRange(parsed);
    }
  }, [searchParams]);

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll when any sheet is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    if (isFilterOpen || isSortOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalBodyOverflow || "";
      document.documentElement.style.overflow = originalHtmlOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalBodyOverflow || "";
      document.documentElement.style.overflow = originalHtmlOverflow || "";
    };
  }, [isFilterOpen, isSortOpen]);

  // Listen for md Filter/Sort open events
  useEffect(() => {
    const onOpenFilter = () => setIsFilterOpen(true);
    const onOpenSort = () => setIsSortOpen(true);
    window.addEventListener("open-filter", onOpenFilter);
    window.addEventListener("open-sort", onOpenSort);
    return () => {
      window.removeEventListener("open-filter", onOpenFilter);
      window.removeEventListener("open-sort", onOpenSort);
    };
  }, []);

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

  // Basic loading and error states for API data
  if (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row max-w-7xl 2xl:max-w-[1920px] mx-auto">
        {/* Sidebar - 30% width */}
        <div className="hidden lg:block lg:w-[20%] 2xl:w-[15%] 2xl:ml-auto">
          <div 
            className="sticky top-[6rem] h-[calc(100vh-6rem)] overflow-y-auto sidebar-scroll"
            style={{ 
              overscrollBehavior: 'contain',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              position: 'sticky',
              top: '6rem',
              height: 'calc(100vh - 6rem)',
              zIndex: 10
            }}
          >
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

        {/* Main Content - 70% width */}
        <div className="lg:w-[80%] 2xl:w-[80%] 2xl:mr-auto">
          <div 
            className="px-0 sm:px-6 md:px-8 py-8 pb-0 lg:pb-8"
            style={{ 
              overscrollBehavior: 'contain'
            }}
          >
            <ProductGrid
              products={allProducts}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ${
          isFilterOpen || isSortOpen
            ? "hidden"
            : isBottomBarVisible
            ? "translate-y-0"
            : "translate-y-full"
        }`}
      >
        <div className="max-w-screen-sm mx-auto px-6 py-4 flex items-center justify-evenly text-gray-900">
          <button
            onClick={openFilterSheet}
            className="flex items-center gap-2 text-gray-900"
            aria-label="Filter"
          >
            <Image src="/filtericon.svg" alt="Filter" width={24} height={24} className="w-6 h-6" />
            <span className="font-semibold text-base">Filter</span>
          </button>
          <div className="h-6 w-px bg-gray-300" aria-hidden="true" />
          <button
            onClick={openSortSheet}
            className="flex items-center gap-2 text-gray-900"
            aria-label="Sort"
          >
            <Image src="/sorticon.svg" alt="Sort" width={24} height={24} className="w-6 h-6" />
            <span className="font-semibold text-base">Sort</span>
          </button>
        </div>
      </div>

      {/* Filter sheet */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}
          >
            <h3 className="text-base font-semibold text-gray-900">Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-red-600 text-sm font-medium"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Tabs */}
            <div className="w-5/12 bg-gray-50 overflow-y-auto">
              {["Categories", "Discount", "Price Range"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`w-full text-left px-4 py-3 ${
                    activeFilterTab === tab
                      ? "bg-white font-semibold text-gray-900"
                      : "text-gray-700"
                  }`}
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
                          className={`w-full text-left px-3 py-3 ${selectedCategory === cat ? 'bg-green-100 text-[var(--color-primary)] font-semibold' : 'hover:bg-gray-50 text-gray-800'}`}
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
                          className={`w-full text-left px-3 py-3 ${selectedDiscount === opt ? 'bg-green-100 text-[var(--color-primary)] font-semibold' : 'hover:bg-gray-50 text-gray-800'}`}
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
                    
                    {/* Price Range Display - Like the image */}
                    <div className="flex justify-center gap-4 mb-6">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                        ₹{priceRange.min.toLocaleString()}
                      </div>
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                        ₹{priceRange.max.toLocaleString()}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="relative">
                        {/* Background track */}
                        <div className="w-full h-2 bg-purple-300 rounded-lg relative">
                          {/* Red selected portion */}
                          <div
                            className="h-2 bg-red-500 rounded-lg absolute top-0 left-0"
                            style={{
                              width: `${((priceRange.max - priceRange.min) / (20000 - 0)) * 100}%`,
                              left: `${(priceRange.min / 20000) * 100}%`,
                            }}
                          />
                        </div>

                        {/* Interactive track for dragging */}
                        <div 
                          className="absolute top-0 w-full h-8 cursor-pointer"
                          style={{ 
                            marginTop: '-12px',
                            zIndex: 50
                          }}
                          onMouseDown={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const percentage = (clickX / rect.width) * 100;
                            const value = Math.round((percentage / 100) * 20000);
                            
                            // Determine which handle to move based on which is closer
                            const minDistance = Math.abs(value - priceRange.min);
                            const maxDistance = Math.abs(value - priceRange.max);
                            
                            if (minDistance <= maxDistance) {
                              setDraggingHandle('min');
                              setPriceRange(prev => ({
                                ...prev,
                                min: Math.min(value, prev.max)
                              }));
                            } else {
                              setDraggingHandle('max');
                              setPriceRange(prev => ({
                                ...prev,
                                max: Math.max(value, prev.min)
                              }));
                            }
                          }}
                          onMouseMove={(e) => {
                            if (!draggingHandle) return;
                            
                            const rect = e.currentTarget.getBoundingClientRect();
                            const moveX = e.clientX - rect.left;
                            const percentage = (moveX / rect.width) * 100;
                            const value = Math.round((percentage / 100) * 20000);
                            
                            if (draggingHandle === 'min') {
                              setPriceRange(prev => ({
                                ...prev,
                                min: Math.min(Math.max(0, value), prev.max)
                              }));
                            } else {
                              setPriceRange(prev => ({
                                ...prev,
                                max: Math.max(Math.min(20000, value), prev.min)
                              }));
                            }
                          }}
                          onMouseUp={() => setDraggingHandle(null)}
                          onMouseLeave={() => setDraggingHandle(null)}
                          onTouchStart={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const touch = e.touches[0];
                            const clickX = touch.clientX - rect.left;
                            const percentage = (clickX / rect.width) * 100;
                            const value = Math.round((percentage / 100) * 20000);
                            
                            const minDistance = Math.abs(value - priceRange.min);
                            const maxDistance = Math.abs(value - priceRange.max);
                            
                            if (minDistance <= maxDistance) {
                              setDraggingHandle('min');
                              setPriceRange(prev => ({
                                ...prev,
                                min: Math.min(value, prev.max)
                              }));
                            } else {
                              setDraggingHandle('max');
                              setPriceRange(prev => ({
                                ...prev,
                                max: Math.max(value, prev.min)
                              }));
                            }
                          }}
                          onTouchMove={(e) => {
                            if (!draggingHandle) return;
                            e.preventDefault();
                            
                            const rect = e.currentTarget.getBoundingClientRect();
                            const touch = e.touches[0];
                            const moveX = touch.clientX - rect.left;
                            const percentage = (moveX / rect.width) * 100;
                            const value = Math.round((percentage / 100) * 20000);
                            
                            if (draggingHandle === 'min') {
                              setPriceRange(prev => ({
                                ...prev,
                                min: Math.min(Math.max(0, value), prev.max)
                              }));
                            } else {
                              setPriceRange(prev => ({
                                ...prev,
                                max: Math.max(Math.min(20000, value), prev.min)
                              }));
                            }
                          }}
                          onTouchEnd={() => setDraggingHandle(null)}
                        />

                        {/* Visual circles positioned based on values */}
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"
                          style={{ 
                            left: `${(priceRange.min / 20000) * 100}%`,
                            zIndex: 40
                          }}
                        >
                          <div className="w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-200"></div>
                          </div>

                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 pointer-events-none"
                          style={{ 
                            left: `${(priceRange.max / 20000) * 100}%`,
                            zIndex: 40
                          }}
                        >
                          <div className="w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-200"></div>
                        </div>
                          </div>
                        </div>

                    {/* Input fields - Like the image */}
                    <div className="flex items-center gap-4 justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <div className="bg-gray-100 px-3 py-2 text-gray-600 font-semibold">₹</div>
                        <input
                          type="number"
                          value={priceRange.min}
                          onChange={(e) => {
                            const newMin = parseInt(e.target.value) || 0;
                            setPriceRange(prev => ({
                              ...prev,
                              min: Math.min(newMin, prev.max)
                            }));
                          }}
                          className="w-20 px-3 py-2 text-center focus:outline-none"
                          min="0"
                          max="20000"
                        />
                      </div>
                      <div className="text-gray-400">to</div>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <div className="bg-gray-100 px-3 py-2 text-gray-600 font-semibold">₹</div>
                        <input
                          type="number"
                          value={priceRange.max}
                          onChange={(e) => {
                            const newMax = parseInt(e.target.value) || 20000;
                            setPriceRange(prev => ({
                              ...prev,
                              max: Math.max(newMax, prev.min)
                            }));
                          }}
                          className="w-20 px-3 py-2 text-center focus:outline-none"
                          min="0"
                          max="20000"
                        />
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
              <button onClick={() => setIsFilterOpen(false)} className="flex-1 text-center py-3 text-[var(--color-primary)] font-semibold">Apply</button>
            </div>
        </div>
      )}

      {/* Sort sheet */}
      {isSortOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}
          >
            <h3 className="text-base font-semibold text-gray-900">Sort by</h3>
            <button
              onClick={() => setPendingSort("Featured")}
              className="text-red-600 text-sm font-medium"
            >
              Clear all
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {sortOptions.map((option) => (
              <div
                key={option}
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
                  marginLeft: 16,
                  marginRight: 16,
                }}
              >
                <button
                  onClick={() => setPendingSort(option)}
                  className={`w-full text-left px-4 py-3 ${pendingSort === option ? 'text-[var(--color-primary)] font-semibold' : 'text-gray-800 hover:bg-gray-50'}`}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
          <div
            className="flex items-center"
            style={{ borderTop: "1px solid rgba(0, 0, 0, 0.10)" }}
          >
            <button
              onClick={() => {
                setSortBy(sortSnapshot);
                setIsSortOpen(false);
              }}
              className="flex-1 text-center py-3 text-red-600 font-medium"
            >
              Discard
            </button>
            <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <button onClick={() => { setSortBy(pendingSort); setIsSortOpen(false); }} className="flex-1 text-center py-3 text-[var(--color-primary)] font-semibold">Apply</button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Hide scrollbar for sidebar */
        .sidebar-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .sidebar-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
