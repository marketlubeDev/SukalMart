"use client";

import { useState } from "react";
import Link from "next/link";
import CartSidebar from "../../app/_components/cart/CartSidebar";

// Custom hook to detect bigTablet screen (min-width: 992px and max-width: 1199.98px)
import { useEffect, useState as useReactState } from "react";

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

  const isBigTablet = useBigTablet();

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
          className="max-w-7xl mx-auto px-0.5 sm:px-0.5 lg:px-0.5"
          style={bigTabletPadding}
        >
          <div className="flex items-center h-20">
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
            </div>

            {/* Desktop Action Buttons - Rightmost with same padding */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4 pl-4">
              {/* Search */}
              <button className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer">
                <img src="/searchicon.svg" alt="search" className="w-5 h-5" />
              </button>

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
                    <Link
                      href="/my-account"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/my-account?tab=my-orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Order History
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Wishlist
                    </Link>
                    <Link
                      href="/my-account?tab=help"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Help & Support
                    </Link>

                    <Link
                      href="/my-account?tab=privacy-policy"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Privacy Policy
                    </Link>
                    <hr className="my-2" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - Two Groups: Left (Hamburger + Title) and Right (Search + Cart) */}
            <div className="lg:hidden flex items-center justify-between w-full">
              {/* Left Group - Hamburger and Title */}
              <div className="flex items-center">
                {/* Hamburger Menu Button */}
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

                {/* Mobile Title */}
                <Link href="/" className="flex items-center">
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

              {/* Right Group - Search and Cart */}
              <div className="flex items-center">
                {/* Mobile Search */}
                <button className="p-2 text-gray-600 hover:text-green-700 transition-colors duration-200 cursor-pointer">
                  <img src="/searchicon.svg" alt="search" className="w-5 h-5" />
                </button>

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
                <a
                  href="/my-account"
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer"
                >
                  <img src="/usericon.svg" alt="user" className="w-5 h-5" />
                  <span>My Account</span>
                </a>

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

                <Link
                  href="/my-account?tab=my-orders"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Order History</span>
                </Link>

                <Link
                  href="/my-account?tab=help"
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
                      d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM9.75 9a2.25 2.25 0 114.5 0c0 1.5-2.25 1.875-2.25 3.375m0 3.375h.008v.008H12v-.008z"
                    />
                  </svg>
                  <span>Help & Support</span>
                </Link>

                <Link
                  href="/my-account?tab=privacy-policy"
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
                      d="M12 12a3 3 0 013 3v3H9v-3a3 3 0 013-3zm0-7a5 5 0 00-5 5v2h10V10a5 5 0 00-5-5z"
                    />
                  </svg>
                  <span>Privacy Policy</span>
                </Link>

                <a
                  href="#"
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 cursor-pointer"
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
                </a>
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
