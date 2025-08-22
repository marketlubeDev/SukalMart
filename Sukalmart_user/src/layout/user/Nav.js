"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CartSidebar from "../../app/_components/cart/CartSidebar";

// Custom hook to detect bigTablet screen (min-width: 992px and max-width: 1199.98px)
import { useEffect, useState as useReactState } from "react";
import { featuredProducts as fp, bestSellers as bs, catalogProducts } from "../../lib/data";

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

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const resultsRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isBigTablet = useBigTablet();

  // Build a simple in-memory product list for search suggestions
  const allProducts = useMemo(() => {
    const fpProducts = (fp || []).map(p => ({ 
      id: String(p.id), 
      name: p.name, 
      image: p.image, 
      price: p.price, 
      originalPrice: p.originalPrice, 
      category: p.category 
    }));
    
    const bsProducts = (bs || []).map(p => ({ 
      id: String(p.id), 
      name: p.name, 
      image: p.image, 
      price: p.price, 
      originalPrice: p.originalPrice, 
      category: p.category 
    }));
    
    const catalogProductsList = (catalogProducts || []).map(p => ({ 
      id: String(p.id), 
      name: p.name, 
      image: p.image, 
      price: p.price ? `₹${p.price}` : undefined, 
      originalPrice: p.originalPrice, 
      category: p.category || p.type 
    }));
    
    return [...fpProducts, ...bsProducts, ...catalogProductsList];
  }, [fp, bs, catalogProducts]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      return;
    }
    
    const nameMatches = allProducts.filter(p => p.name.toLowerCase().includes(q));
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
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showSearchBar]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const navigateToTab = (tab) => {
    if (pathname === '/my-account') {
      // If we're already on my-account page, just update the tab parameter
      const params = new URLSearchParams(searchParams);
      params.set('tab', tab);
      router.push(`/my-account?${params.toString()}`);
    } else {
      // If we're on a different page, navigate to my-account with the tab
      router.push(`/my-account?tab=${tab}`);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedCategory');
    sessionStorage.clear();
    setIsMobileMenuOpen(false);
    router.push('/login');
  };

  // Allow global triggers to open the cart
  useEffect(() => {
    const openCart = () => setIsCartOpen(true);
    const handler = () => openCart();
    if (typeof window !== 'undefined') {
      window.addEventListener('open-cart', handler);
      // Expose helper for direct calls as well
      window.__openCart = openCart;
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('open-cart', handler);
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

  // Add extra left/right padding for bigTablet screens
  // We'll use inline style for the wrapper div
  const bigTabletPadding = isBigTablet
    ? { paddingLeft: "32px", paddingRight: "32px" }
    : {};

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div
          className="container mx-auto px-0.5 sm:px-0.5 lg:px-0.5 xl:px-10 2xl:px-10"
          style={bigTabletPadding}
        >
          <div className="flex items-center h-20 justify-between">
            {/* Logo - Leftmost with small padding */}
            <div className="flex-shrink-0 pr-4 hidden lg:block">
              <Link href="/" className="flex items-center">
                <div className="text-3xl font-bold text-[#035F0F]">
                  Souqalmart
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center with more gap */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8 flex-1 justify-center">
              {showSearchBar ? (
                <div className="relative">
                  <div className="flex items-center h-10 border border-gray-300 rounded-lg px-4 w-[520px] xl:w-[640px] bg-white">
                    <img src="/searchicon.svg" alt="search" className="w-4 h-4 mr-2 opacity-60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Find your next favorite product..."
                      className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                  {searchQuery.trim().length > 0 && (
                    <div ref={resultsRef} className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[520px] xl:w-[640px] bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-auto">
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
              ) : (
                <>
                  {navigationItems.map((item, index) => (
                    <div key={index} className="relative group">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="flex items-center space-x-1 text-gray-700 hover:text-green-700 font-normal transition-colors duration-200 py-2 cursor-pointer"
                          onClick={(e) => {
                            // Reset category when Products is clicked
                            if (item.label === "Products") {
                              e.preventDefault();
                              // Clear any stored category selection
                              localStorage.removeItem('selectedCategory');
                              // Force page reload to reset state
                              window.location.href = '/products';
                            }
                          }}
                        >
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <button
                          className="flex items-center space-x-1 text-gray-700 hover:text-green-700 font-normal transition-colors duration-200 py-2 cursor-pointer"
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

                      {/* Desktop Dropdown Menu */}
                      {item.hasDropdown && (
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="py-2">
                            {item.submenu.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                              >
                                {subItem}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Desktop Action Buttons - Rightmost with same padding */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {/* Search / Close icon area */}
              {showSearchBar ? (
                <button
                  className="p-2 text-gray-800 transition-colors duration-200 cursor-pointer"
                  onClick={() => setShowSearchBar(false)}
                  aria-label="Close search"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <button
                  className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => setShowSearchBar(true)}
                  aria-label="Open search"
                >
                  <img src="/searchicon.svg" alt="search" className="w-5 h-5" />
                </button>
              )}

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

              {/* User Profile */}
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => navigateToTab('account')}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      My Account
                    </button>
                    <button
                      onClick={() => navigateToTab('my-orders')}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      My Orders
                    </button>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={() => navigateToTab('help')}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Help & Support
                    </button>

                    <button
                      onClick={() => navigateToTab('privacy-policy')}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Privacy & Policy
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

                        {/* Mobile Layout - Three Groups: Left (Hamburger + Logo), Center (Search), Right (Cart) */}
            <div className="lg:hidden flex items-center justify-between w-full">
              {/* Left Group - Hamburger and Logo */}
              <div className="flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-green-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isMobileMenuOpen ? (
                    <svg
                      className="w-6 h-6"
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
                      className="w-6 h-6"
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

                {/* Mobile Logo - Always visible */}
                <Link href="/" className="flex items-center ml-2">
                  <img
                    src="/logo1.svg"
                    alt="Souqalmart Logo"
                    className="h-6 w-6 mr-2"
                  />
                  <div className="text-xl font-bold text-green-700">
                    Souqalmart
                  </div>
                </Link>
              </div>

              {/* Center Group - Search Bar */}
              {showSearchBar && (
                <div className="flex-1 flex justify-center mx-4">
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <div className="flex items-center h-10 border border-gray-300 rounded-lg px-4 bg-white">
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

              {/* Right Group - Search Icon, Close Icon, or Cart */}
              <div className="flex items-center">
                {showSearchBar ? (
                  <button 
                    onClick={() => setShowSearchBar(false)}
                    className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowSearchBar(true)}
                    className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                  >
                  <img src="/searchicon.svg" alt="search" className="w-5 h-5" />
                </button>
                )}

                {/* Mobile Cart */}
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
              </div>
            </div>
          </div>
        </div>



        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white border-t border-gray-200">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
              <img
                src="/searchicon.svg"
                alt="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
            </div>

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
                        localStorage.removeItem('selectedCategory');
                        // Force page reload to reset state
                        window.location.href = '/products';
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className="flex items-center justify-between w-full py-3 text-left text-gray-700 hover:text-green-700 font-normal transition-colors duration-200 cursor-pointer"
                    onClick={() => item.hasDropdown && toggleDropdown(item.label)}
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
                <button
                  onClick={() => navigateToTab('account')}
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer w-full text-left"
                >
                  <img src="/usericon.svg" alt="user" className="w-5 h-5" />
                  <span>My Account</span>
                </button>

                <Link
                  href="/wishlist"
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>Wishlist</span>
                </Link>

                <button
                  onClick={() => navigateToTab('my-orders')}
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>My Orders</span>
                </button>

                <button
                  onClick={() => navigateToTab('help')}
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
                  onClick={() => navigateToTab('privacy-policy')}
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
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
