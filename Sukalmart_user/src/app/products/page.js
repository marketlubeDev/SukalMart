"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import ProductCard from "../_components/_homepage/ProductCard";
import ProductSidebar from "./_components/ProductSidebar";
import ProductGrid from "./_components/ProductGrid";
import useProducts from "@/lib/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

function ProductsPageContent() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 12999 });
  const [sortBy, setSortBy] = useState("homepage.productSidebar.featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const searchParams = useSearchParams();

  // Mobile filter UI state
  const [activeFilterTab, setActiveFilterTab] = useState("homepage.productSidebar.categories");
  const [snapshot, setSnapshot] = useState({
    selectedCategory: "",
    selectedDiscount: "",
    priceRange: { min: 0, max: 12999 },
  });
  const [pendingSort, setPendingSort] = useState("homepage.productSidebar.featured");
  const [sortSnapshot, setSortSnapshot] = useState("homepage.productSidebar.featured");
  const [draggingHandle, setDraggingHandle] = useState(null); // 'min' or 'max' or null

  const sortOptions = [
    "homepage.productSidebar.featured",
    "homepage.productSidebar.priceLowToHigh",
    "homepage.productSidebar.priceHighToLow",
    "homepage.productSidebar.newest",
    "homepage.productSidebar.popular",
  ];
  const categories = [
    "Hair Care",
    "Body & Shower",
    "Soap & Deodorants",
    "Skin Care",
    "Oral & Misc",
  ];

  const discountOptions = [
    "homepage.productSidebar.pdiscount10",
    "homepage.productSidebar.discount20",
    "homepage.productSidebar.discount30",
    "homepage.productSidebar.discount40",
    "homepage.productSidebar.discount50",
  ];

  const priceRanges = [
    "homepage.productSidebar.under1000",
    "homepage.productSidebar.range1000to2000",
    "homepage.productSidebar.range2000to3000",
    "homepage.productSidebar.range3000to4000",
    "homepage.productSidebar.over4000",
  ];

  // Fetch products from API
  const sortParam =
    sortBy === "homepage.productSidebar.priceLowToHigh"
      ? "price-low"
      : sortBy === "homepage.productSidebar.priceHighToLow"
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

  // Use only API products
  const allProducts = Array.isArray(products) ? products : [];
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
      const sanitized = label.replaceAll(",", "").replaceAll("AED", "").trim();

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
    setActiveFilterTab("homepage.productSidebar.categories");
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
  // if (categoriesError) {
  //   console.error(categoriesError);
  // }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row max-w-7xl 2xl:max-w-[1920px] mx-auto">
        {/* Sidebar - 30% width */}
        <div className="hidden lg:block lg:w-[20%] 2xl:w-[15%] 2xl:ml-auto">
          <div
            className="sticky top-[6rem] h-[calc(100vh-6rem)] overflow-y-auto sidebar-scroll"
            style={{
              overscrollBehavior: "contain",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              position: "sticky",
              top: "6rem",
              height: "calc(100vh - 6rem)",
              zIndex: 10,
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
            className="px-0 pb-10 sm:px-6 md:px-8 py-8 pb-0 lg:pb-8"
            style={{
              overscrollBehavior: "contain",
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
            <Image
              src="/filtericon.svg"
              alt="Filter"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="font-semibold text-base">{t("common.filter", language)}</span>
          </button>
          <div className="h-6 w-px bg-gray-300" aria-hidden="true" />
          <button
            onClick={openSortSheet}
            className="flex items-center gap-2 text-gray-900"
            aria-label="Sort"
          >
            <Image
              src="/sorticon.svg"
              alt="Sort"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="font-semibold text-base">{t("common.sort", language)}</span>
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
            <h3 className="text-base font-semibold text-gray-900">{t("common.filters", language)}</h3>
            <button
              onClick={clearAllFilters}
              className="text-red-600 text-sm font-medium"
            >
              {t("common.clearAll", language)}
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Tabs */}
            <div className="w-5/12 bg-gray-50 overflow-y-auto">
              {["homepage.productSidebar.categories", "homepage.productSidebar.discount", "homepage.productSidebar.priceRange"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilterTab(tab)}
                  className={`w-full text-left px-4 py-3 ${
                    activeFilterTab === tab
                      ? "bg-white font-semibold text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {t(tab, language)}
                </button>
              ))}
            </div>

            {/* Right Content */}
            <div
              className="w-7/12 px-0 py-0 overflow-y-auto"
              style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.10)" }}
            >
              {activeFilterTab === "homepage.productSidebar.categories" && (
                <div className="space-y-0">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      style={{
                        borderBottom: "0.5px solid rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          localStorage.setItem("selectedCategory", cat);
                        }}
                        className={`w-full text-left px-4 py-3 ${
                          selectedCategory === cat
                            ? "bg-[#f7f3f4] text-[var(--color-primary)] font-semibold"
                            : "hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        {cat}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeFilterTab === "homepage.productSidebar.discount" && (
                <div className="space-y-0">
                  {discountOptions.map((opt) => (
                    <div
                      key={opt}
                      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}
                    >
                      <button
                        onClick={() => setSelectedDiscount(opt)}
                        className={`w-full text-left px-3 py-3 ${
                          selectedDiscount === opt
                            ? "bg-[#f7f3f4] text-[var(--color-primary)] font-semibold"
                            : "hover:bg-gray-50 text-gray-800"
                        }`}
                      >
                        {t(opt, language)}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeFilterTab === "homepage.productSidebar.priceRange" && (
                <div className="py-4">
                  <div className="mb-3 text-[16px] font-semibold text-gray-900 px-4">
                    {t("homepage.productSidebar.selectPriceRange", language)}
                  </div>

                  {/* Price Range Slider (match desktop sidebar) */}
                  <div className="mb-1 px-2">
                    <div className="relative max-w-[160px]">
                      {/* Background track */}
                      <div className="w-[85%] h-1 bg-gray-300 rounded-lg relative mx-auto">
                        {/* Selected portion */}
                        <div
                          className="h-1 bg-[var(--color-primary)] absolute top-0 left-0"
                          style={{
                            width: `${((priceRange.max - priceRange.min) / (20000 - 0)) * 100}%`,
                            left: `${(priceRange.min / 20000) * 100}%`,
                            borderRadius:
                              priceRange.min === 0
                                ? "4px 0 0 4px"
                                : priceRange.max === 20000
                                ? "0 4px 4px 0"
                                : "0",
                          }}
                        />

                        {/* Start circle */}
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
                          style={{ left: `${(priceRange.min / 20000) * 100}%` }}
                        >
                          <Image
                            src="/pricecircle.svg"
                            alt="start"
                            width={12}
                            height={12}
                            className="w-3 h-3"
                          />
                        </div>

                        {/* End circle */}
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
                          style={{ left: `${(priceRange.max / 20000) * 100}%` }}
                        >
                          <Image
                            src="/pricecircle.svg"
                            alt="end"
                            width={12}
                            height={12}
                            className="w-3 h-3"
                          />
                        </div>
                      </div>

                      {/* Dual range inputs */}
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        value={priceRange.min}
                        onChange={(e) => {
                          const newMin = parseInt(e.target.value);
                          if (newMin <= priceRange.max) {
                            setPriceRange((prev) => ({
                              ...prev,
                              min: newMin,
                            }));
                          }
                        }}
                        className="absolute top-0 w-full h-1 opacity-0 cursor-pointer z-20"
                        style={{ pointerEvents: "auto" }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        value={priceRange.max}
                        onChange={(e) => {
                          const newMax = parseInt(e.target.value);
                          if (newMax >= priceRange.min) {
                            setPriceRange((prev) => ({
                              ...prev,
                              max: newMax,
                            }));
                          }
                        }}
                        className="absolute top-0 w-[100%] h-1 opacity-0 cursor-pointer z-30"
                        style={{ pointerEvents: "auto" }}
                      />
                    </div>

                    {/* Value badges */}
                    <div className="flex justify-start items-center gap-2 mt-2">
                      <div
                        style={{
                          display: "flex",
                          padding: "4px 6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                          minWidth: "64px",
                          borderRadius: "4px",
                          background: "rgba(0, 0, 0, 0.06)",
                          color: "rgba(51, 51, 51, 0.70)",
                          leadingTrim: "both",
                          textEdge: "cap",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "normal",
                          letterSpacing: "-0.14px",
                        }}
                      >
                        AED {priceRange.min.toLocaleString()}
                      </div>
                      <Image
                        src="/doublearrow.svg"
                        alt="range"
                        width={20}
                        height={8}
                        className="w-5 h-2 mx-2 flex-shrink-0"
                      />
                      <div
                        style={{
                          display: "flex",
                          padding: "4px 6px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                          minWidth: "64px",
                          borderRadius: "4px",
                          background: "rgba(0, 0, 0, 0.06)",
                          color: "rgba(51, 51, 51, 0.70)",
                          leadingTrim: "both",
                          textEdge: "cap",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "normal",
                          letterSpacing: "-0.14px",
                        }}
                      >
                        AED {priceRange.max.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Predefined Price Ranges (unchanged) */}
                  <div className="space-y-0 px-4 py-2">
                    <div className="max-w-[200px]">
                      {priceRanges.map((range) => (
                        <button
                          key={range}
                          className="w-full text-left px-0 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                          style={{
                            color: "var(--color-gray-800)",
                            leadingTrim: "both",
                            textEdge: "cap",
                            fontSize: "15px",
                            fontStyle: "normal",
                            // fontWeight: "500",
                            lineHeight: "normal",
                            letterSpacing: "-0.16px",
                          }}
                        >
                          {t(range, language)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div
            className="flex items-center"
            style={{ borderTop: "1px solid rgba(0, 0, 0, 0.10)" }}
          >
            <button
              onClick={discardFilters}
              className="flex-1 text-center py-3 text-red-600 font-medium"
            >
              {t("common.discard", language)}
            </button>
            <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 text-center py-3 text-[var(--color-primary)] font-semibold"
            >
              {t("common.apply", language)}
            </button>
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
            <h3 className="text-base font-semibold text-gray-900">{t("common.sortBy", language)}</h3>
            <button
              onClick={() => setPendingSort("homepage.productSidebar.featured")}
              className="text-red-600 text-sm font-medium"
            >
              {t("common.clearAll", language)}
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
                  className={`w-full text-left px-4 py-3 ${
                    pendingSort === option
                      ? "text-[var(--color-primary)] font-semibold"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {t(option, language)}
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
              {t("common.discard", language)}
            </button>
            <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <button
              onClick={() => {
                setSortBy(pendingSort);
                setIsSortOpen(false);
              }}
              className="flex-1 text-center py-3 text-[var(--color-primary)] font-semibold"
            >
              {t("common.apply", language)}
            </button>
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

        /* Range input styles for mobile price slider */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 12px;
          width: 12px;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          height: 12px;
          width: 12px;
          background: transparent;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          Loading products...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
