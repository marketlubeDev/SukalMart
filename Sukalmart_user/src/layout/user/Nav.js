"use client";

import { useState, useRef, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CartSidebar from "../../app/_components/cart/CartSidebar";

// Custom hook to detect bigTablet screen (min-width: 992px and max-width: 1199.98px)
import { useEffect, useState as useReactState } from "react";
import {
  featuredProducts as fp,
  bestSellers as bs,
  catalogProducts,
} from "../../lib/data";

function useBigTablet() {
  const [isBigTablet, setIsBigTablet] = useReactState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setIsBigTablet(width >= 992 && width <= 1199.98);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isBigTablet;
}

function NavContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState("EN");
  const resultsRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isBigTablet = useBigTablet();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    setIsAuthenticated(!!token);
    const savedLang = localStorage.getItem("language");
    if (savedLang === "EN" || savedLang === "AR") {
      setLanguage(savedLang);
    }
  }, []);

  // Handle login navigation
  const handleLogin = () => {
    setIsMobileMenuOpen(false);
    setShowSearchBar(false);
    router.push("/login");
  };

  // Build a simple in-memory product list for search suggestions
  const allProducts = useMemo(() => {
    const fpProducts = (fp || []).map((p) => ({
      id: String(p.id), 
      name: p.name, 
      image: p.image, 
      price: p.price, 
      originalPrice: p.originalPrice, 
      category: p.category,
    }));
    
    const bsProducts = (bs || []).map((p) => ({
      id: String(p.id), 
      name: p.name, 
      image: p.image, 
      price: p.price, 
      originalPrice: p.originalPrice, 
      category: p.category,
    }));
    
    const catalogProductsList = (catalogProducts || []).map((p) => ({
      id: String(p.id), 
      name: p.name, 
      image: p.image, 
      price: p.price ? `₹${p.price}` : undefined, 
      originalPrice: p.originalPrice, 
      category: p.category || p.type,
    }));
    
    return [...fpProducts, ...bsProducts, ...catalogProductsList];
  }, [fp, bs, catalogProducts]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      return;
    }
    
    const nameMatches = allProducts.filter((p) =>
      p.name.toLowerCase().includes(q)
    );
    const results = nameMatches.slice(0, 8);
    
    setSearchResults(results);
  }, [searchQuery, allProducts]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!resultsRef.current) return;
      if (!resultsRef.current.contains(e.target)) {
        setSearchQuery("");
        setSearchResults([]);
      }
    }
    if (showSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showSearchBar]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowSearchBar(false);
  };

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
  };
  }, [isMobileMenuOpen]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "EN" ? "AR" : "EN";
      try { localStorage.setItem("language", next); } catch {}
      return next;
    });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const navigateToTab = (tab) => {
    if (pathname === "/my-account") {
      // If we're already on my-account page, just update the tab parameter
      const params = new URLSearchParams(searchParams);
      params.set("tab", tab);
      router.push(`/my-account?${params.toString()}`);
    } else {
      // If we're on a different page, navigate to my-account with the tab
      router.push(`/my-account?tab=${tab}`);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    // Clear any stored authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedCategory");
    sessionStorage.clear();
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  // Allow global triggers to open the cart
  useEffect(() => {
    const openCart = () => setIsCartOpen(true);
    const handler = () => openCart();
    if (typeof window !== "undefined") {
      window.addEventListener("open-cart", handler);
      // Expose helper for direct calls as well
      window.__openCart = openCart;
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("open-cart", handler);
        delete window.__openCart;
      }
    };
  }, []);

  const navigationItems = [
    {
      label: "Products",
      hasDropdown: false,
      href: "/products",
    },
    {
      label: "Hair Care",
      hasDropdown: true,
      submenu: ["Shampoo", "Conditioner", "Hair Oil", "Hair Serum"],
    },
    {
      label: "Body & Shower",
      hasDropdown: true,
      submenu: [
        "Body Wash",
        "Body Lotion",
        "Body Cream",
        "Body Oil",
        "Body Soap",
      ],
    },
    {
      label: "Soap & Deodorants",
      hasDropdown: true,
      submenu: [
        "Deodorant",
        "Deodorant Stick",
        "Deodorant Spray",
        "Deodorant Roll-On",
      ],
    },
    {
      label: "Skin Care",
      hasDropdown: true,
      submenu: [
        "Face Wash",
        "Face Cream",
        "Face Oil",
        "Face Serum",
        "Face Moisturizer",
      ],
    },
    {
      label: "Oral & Misc",
      hasDropdown: true,
      submenu: ["Toothpaste", "Toothbrush", "Mouthwash", "Mouthwash"],
    },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
     

        {/* Main Header */}
        <div className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center h-3 lg:h-16 justify-between">
            {/* Logo - Leftmost with small padding */}
            <div className="flex-shrink-0 pr-6 hidden lg:block">
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center mr-2">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    Souqalmart
                  </div>
                </div>
              </Link>
            </div>

            {/* Search Bar - Center */}
            <div className="hidden lg:flex lg:items-center flex-1 justify-center">
              {showSearchBar ? (
                <div className="relative">
                  <div className="flex items-center h-10 rounded-lg px-4 w-[350px] md:w-[500px] lg:w-[450px] xl:w-[550px]" style={{ borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.10)', background: 'rgba(0, 0, 0, 0.02)' }}>
                    <img
                      src="/searchicon.svg"
                      alt="search"
                      className="w-4 h-4 mr-2 opacity-60"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Find your next favorite product..."
                      className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                  {searchQuery.trim().length > 0 && (
                    <div
                      ref={resultsRef}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[400px] md:w-[700px] lg:w-[520px] xl:w-[640px] bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-auto"
                    >
                      {searchResults.length > 0 ? (
                        searchResults.map((p) => (
                          <div 
                            key={`${p.id}-${p.name}`} 
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              router.push(`/products/${p.id}`);
                              setSearchQuery("");
                              setSearchResults([]);
                              setShowSearchBar(false);
                            }}
                          >
                            {p.image && (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="text-gray-900 text-sm font-medium truncate">
                                {p.name}
                              </span>
                              {(p.category || p.price) && (
                                <span className="text-xs text-gray-500 truncate">
                                  {p.category ? `${p.category}` : ""}
                                  {p.category && p.price ? " · " : ""}
                                  {p.price ? `${p.price}` : ""}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-6 text-gray-500">
                          <img
                            src="/searchicon.svg"
                            alt="no results"
                            className="w-4 h-4 opacity-60"
                          />
                          <span className="text-sm">No products found</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center h-10 rounded-lg px-4 w-[350px] md:w-[500px] lg:w-[450px] xl:w-[550px]" style={{ borderRadius: '8px', border: '1px solid rgba(0, 0, 0, 0.10)', background: 'rgba(0, 0, 0, 0.02)' }}>
                  <img
                    src="/searchicon.svg"
                    alt="search"
                    className="w-4 h-4 mr-2 opacity-60"
                  />
                  <input
                    type="text"
                    placeholder="Search by product name or category.."
                    className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              )}
            </div>

            {/* Desktop Action Buttons - Rightmost with same padding */}
            <div className="hidden lg:flex lg:items-center flex-shrink-0">
              <div className="flex items-center space-x-2">
                {/* Language Selector */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer">
                    <img src={language === "EN" ? "/english.svg" : "/arabicicon.svg"} alt={language === "EN" ? "English" : "Arabic"} className="w-5 h-5 rounded-full" />
                    <span className="text-sm font-medium text-gray-700">{language}</span>
                    <img
                      src="/dropdownicon.svg"
                      alt="dropdown"
                      className="w-[8px] h-[5px]"
                    />
                  </button>

                  {/* Language Dropdown */}
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <button 
                        onClick={() => setLanguage("EN")}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        <img src="/english.svg" alt="English" className="w-5 h-5 rounded-full mr-3" />
                        <span className={`${language === "EN" ? "text-[var(--color-primary)] font-medium" : "text-gray-400"}`}>EN</span>
                      </button>
                      <button 
                        onClick={() => setLanguage("AR")}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        <img src="/arabicicon.svg" alt="Arabic" className="w-5 h-5 rounded-full mr-3" />
                        <span className={`${language === "AR" ? "text-[var(--color-primary)] font-medium" : "text-gray-400"}`}>AR</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cart */}
                <button
                  onClick={toggleCart}
                  className="relative p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                >
                  <img
                    src="/Carticon.svg"
                    alt="cart"
                    className="w-[44px] h-[44px]"
                  />
                </button>

                {/* User Profile / Login */}
                {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer">
                    <img src="/usericon.svg" alt="user" className="w-6 h-6" />
                    <img
                      src="/dropdownicon.svg"
                      alt="dropdown"
                      className="w-[8px] h-[5px]"
                    />
                  </button>

                {/* User Dropdown */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                      {/* Personal Info */}
                    <button
                      onClick={() => navigateToTab("account")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal info
                    </button>

                      {/* My Orders */}
                    <button
                      onClick={() => router.push("/my-account?tab=my-orders")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        My orders
                    </button>

                      {/* Addresses */}
                      <button
                        onClick={() => router.push("/my-account?tab=saved-address")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Addresses
                      </button>



                      {/* Contact us
                    <button
                        onClick={() => navigateToTab("contact")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Contact us
                      </button> */}

                      {/* Help & Support */}
                    <button
                      onClick={() => router.push("/my-account?tab=help")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM9.75 9a2.25 2.25 0 114.5 0c0 1.5-2.25 1.875-2.25 3.375m0 3.375h.008v.008H12v-.008z" />
                        </svg>
                      Help & Support
                    </button>

                      {/* Privacy Policy */}
                    <button
                      onClick={() => router.push("/my-account?tab=privacy-policy")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Privacy Policy
                    </button>

                    <hr className="my-2" />

                      {/* Logout */}
                    <button
                      onClick={handleSignOut}
                        className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                  </div>
                </div>
              </div>
              ) : (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer">
                    <img src="/usericon.svg" alt="login" className="w-6 h-6" />
                    <img
                      src="/dropdownicon.svg"
                      alt="dropdown"
                      className="w-[8px] h-[5px]"
                    />
                  </button>

                  {/* Login Dropdown */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {/* Personal Info */}
                      <button
                        onClick={() => router.push("/my-account")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        <img src="/icon7.svg" alt="personal info" className="w-5 h-5 mr-3" />
                        Personal info
                      </button>

                      {/* My Orders */}
                      <button
                        onClick={() => router.push("/my-account?tab=my-orders")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        <img src="/icon6.svg" alt="my orders" className="w-5 h-5 mr-3" />
                        My orders
                      </button>

                      {/* Addresses */}
                      <button
                        onClick={() => router.push("/my-account?tab=saved-address")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        <img src="/icon4.svg" alt="addresses" className="w-5 h-5 mr-3" />
                        Addresses
                      </button>

                      <hr className="my-2" />

                   

                      {/* Contact us
                      // <button
                      //   onClick={() => router.push("/contact")}
                      //   className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      // >
                      //   <img src="/icon1.svg" alt="contact us" className="w-5 h-5 mr-3" />
                      //   Contact us
                      // </button> */}

                      {/* Help & Support */}
                      <button
                        onClick={() => router.push("/my-account?tab=help")}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        <img src="/icon3.svg" alt="help support" className="w-5 h-5 mr-3" />
                        Help & Support
                      </button>

                      {/* Privacy Policy */}
                          <button
                            onClick={() => router.push("/my-account?tab=privacy-policy")}
                            className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                          >
                            <img src="/icon8.svg" alt="privacy policy" className="w-5 h-5 mr-3" />
                            Privacy Policy
                          </button>

                      <hr className="my-2" />

                      {/* Logout */}
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                      >
                        <img src="/icon5.svg" alt="logout" className="w-5 h-5 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
              </div>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-[var(--color-primary)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="hidden lg:flex lg:items-center lg:justify-evenly py-0.5">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative group flex-shrink-0">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 text-white hover:text-green-200 font-normal transition-colors duration-200 py-2 cursor-pointer whitespace-nowrap text-sm xl:text-xs tracking-[0.02em]"
                      onClick={() => {
                        // Reset category when Products is clicked
                        if (item.label === "Products") {
                          localStorage.removeItem("selectedCategory");
                        }
                      }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      className="flex items-center space-x-1 text-white hover:text-green-200 font-normal transition-colors duration-200 py-2 cursor-pointer whitespace-nowrap text-sm xl:text-xs tracking-[0.02em]"
                      onClick={() =>
                        item.hasDropdown && toggleDropdown(item.label)
                      }
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <img
                          src="/dropdownicon.svg"
                          alt="dropdown"
                          className={`w-[7px] h-[4px] transition-transform duration-200 filter brightness-0 invert ${
                            activeDropdown === item.label
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>
                  )}

                  {/* Desktop Dropdown Menu */}
                  {item.hasDropdown && (
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer text-sm tracking-[0.02em]"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Three Groups: Left (Hamburger + Logo), Center (Search), Right (Cart) */}
        <div className="lg:hidden flex items-center justify-between w-full h-14 px-3">
          {/* Left Group - Hamburger and Logo */}
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-1.5 rounded-lg text-gray-600 hover:text-green-700 hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>

            {/* Mobile Logo - Hidden on small screens when search is open */}
            {!showSearchBar && (
              <Link href="/" className="flex items-center ml-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center mr-1.5">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    Souqalmart
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* Center Group - Search Bar */}
          {showSearchBar && (
            <div className="flex-1 flex justify-center mx-2">
              <div className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[400px]">
                <div className="relative">
                  <div className="flex items-center h-10 border border-gray-300 rounded-lg px-3 bg-white">
                    <img src="/searchicon.svg" alt="search" className="w-4 h-4 mr-2 opacity-60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                  {searchQuery.trim().length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-auto z-50">
                      {searchResults.length > 0 ? (
                        searchResults.map((p) => (
                          <div 
                            key={`${p.id}-${p.name}`} 
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              router.push(`/products/${p.id}`);
                              setSearchQuery("");
                              setSearchResults([]);
                              setShowSearchBar(false);
                            }}
                          >
                            {p.image && (
                              <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                            )}
                            <div className="flex flex-col min-w-0">
                              <span className="text-gray-900 text-sm font-medium truncate">{p.name}</span>
                              {(p.category || p.price) && (
                                <span className="text-xs text-gray-500 truncate">
                                  {p.category ? `${p.category}` : ''}
                                  {p.category && p.price ? ' · ' : ''}
                                  {p.price ? `${p.price}` : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-6 text-gray-500">
                          <img src="/searchicon.svg" alt="no results" className="w-4 h-4 opacity-60" />
                          <span className="text-sm">No products found</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right Group - Search Icon, Language Selector, and Cart */}
          <div className="flex items-center space-x-1">
            {showSearchBar ? (
              <button 
                onClick={() => setShowSearchBar(false)}
                className="p-1.5 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <button 
                onClick={() => setShowSearchBar(true)}
                className="p-1.5 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
              >
                <img src="/searchicon.svg" alt="search" className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 p-1.5 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer">
                <img src={language === "EN" ? "/english.svg" : "/arabicicon.svg"} alt={language === "EN" ? "English" : "Arabic"} className="w-4 h-4 rounded-full" />
                <span className="text-xs font-medium text-gray-700">{language}</span>
                <img
                  src="/dropdownicon.svg"
                  alt="dropdown"
                  className="w-[6px] h-[4px]"
                />
              </button>

              {/* Mobile Language Dropdown */}
              <div className="absolute right-0 mt-1 w-24 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <button 
                    onClick={() => setLanguage("EN")}
                    className="flex items-center w-full px-3 py-1.5 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                  >
                    <img src="/english.svg" alt="English" className="w-4 h-4 rounded-full mr-2" />
                    <span className={`text-xs ${language === "EN" ? "text-[var(--color-primary)] font-medium" : "text-gray-400"}`}>EN</span>
                  </button>
                  <button 
                    onClick={() => setLanguage("AR")}
                    className="flex items-center w-full px-3 py-1.5 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                  >
                    <img src="/arabicicon.svg" alt="Arabic" className="w-4 h-4 rounded-full mr-2" />
                    <span className={`text-xs ${language === "AR" ? "text-[var(--color-primary)] font-medium" : "text-gray-400"}`}>AR</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Cart */}
            <button
              onClick={toggleCart}
              className="relative p-1.5 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
            >
              <img
                src="/Carticon.svg"
                alt="cart"
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>
      </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "fixed inset-x-0 top-16 bottom-0 bg-white z-[9999] opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-0 pb-6 space-y-2 bg-white border-t border-gray-200">
            {/* Mobile Search - removed per request */}

            {/* Mobile Navigation Items */}
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-b-0"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between w-full py-3 text-left text-gray-700 hover:text-green-700 font-normal transition-colors duration-200 cursor-pointer"
                    onClick={(e) => {
                      // Reset category when Products is clicked
                      if (item.label === "Products") {
                        e.preventDefault();
                        localStorage.removeItem("selectedCategory");
                        // Force page reload to reset state
                        window.location.href = "/products";
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className="flex items-center justify-between w-full py-3 text-left text-gray-700 hover:text-green-700 font-normal transition-colors duration-200 cursor-pointer"
                    onClick={() =>
                      item.hasDropdown && toggleDropdown(item.label)
                    }
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <img
                        src="/dropdownicon.svg"
                        alt="dropdown"
                        className={`w-[7px] h-[4px] transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                )}

                {/* Mobile Submenu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="pl-4 pb-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block py-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile User Section */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="space-y-2">
                {isAuthenticated ? (
                  <>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); router.push("/my-account"); }}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <img src="/icon7.svg" alt="personal info" className="w-5 h-5" />
                  <span>Personal info</span>
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); router.push("/my-account?tab=my-orders"); }}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <img src="/icon6.svg" alt="my orders" className="w-5 h-5" />
                  <span>My orders</span>
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); router.push("/my-account?tab=saved-address"); }}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <img src="/icon4.svg" alt="addresses" className="w-5 h-5" />
                  <span>Addresses</span>
                </button>

                <button
                  onClick={() => navigateToTab("help")}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM9.75 9a2.25 2.25 0 114.5 0c0 1.5-2.25 1.875-2.25 3.375m0 3.375h.008v.008H12v-.008z"
                    />
                  </svg>
                  <span>Help & Support</span>
                </button>

                <button
                  onClick={() => navigateToTab("privacy-policy")}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 12a3 3 0 013 3v3H9v-3a3 3 0 013-3zm0-7a5 5 0 00-5 5v2h10V10a5 5 0 00-5-5z"
                    />
                  </svg>
                  <span>Privacy & Policy</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign Out</span>
                </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigateToTab("account")}
                      className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                    >
                      <img src="/icon7.svg" alt="personal info" className="w-5 h-5" />
                      <span>Personal info</span>
                    </button>

                    <button
                      onClick={() => navigateToTab("my-orders")}
                      className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                    >
                      <img src="/icon6.svg" alt="my orders" className="w-5 h-5" />
                      <span>My orders</span>
                    </button>

                    <button
                      onClick={() => navigateToTab("addresses")}
                      className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                    >
                      <img src="/icon4.svg" alt="addresses" className="w-5 h-5" />
                      <span>Addresses</span>
                    </button>

               

                    <button
                      onClick={() => { setIsMobileMenuOpen(false); router.push("/my-account?tab=help"); }}
                      className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                    >
                      <img src="/icon3.svg" alt="help support" className="w-5 h-5" />
                  <span>Help & Support</span>
                </button>

                <button
                  onClick={() => { setIsMobileMenuOpen(false); router.push("/my-account?tab=privacy-policy"); }}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                    >
                      <img src="/icon8.svg" alt="privacy policy" className="w-5 h-5" />
                      <span>Privacy Policy</span>
                    </button>

                    <hr className="my-2" />

                    <button
                      onClick={handleLogin}
                      className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                    >
                      <img src="/usericon.svg" alt="login" className="w-5 h-5" />
                      <span>Login</span>
                    </button>
                    <button
                      onClick={() => router.push("/register")}
                      className="flex items-center space-x-3 py-2 mb-4 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                      <span>Register</span>
                </button>
                <button
                      onClick={() => router.push("/forgot-password")}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                      <span>Forgot Password?</span>
                </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />

      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
        
        /* Hide scrollbar for lg screens */
        .lg-scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .lg-scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
      `
      }} />
    </>
  );
}

export default function Nav() {
  return (
    <Suspense
      fallback={
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-0.5 sm:px-0.5 lg:px-0.5">
            <div className="flex items-center h-20 justify-between">
              <div className="flex-shrink-0 pr-4 hidden lg:block">
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  Souqalmart
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-primary)]"></div>
              </div>
            </div>
          </div>
        </nav>
      }
    >
      <NavContent />
    </Suspense>
  );
}
