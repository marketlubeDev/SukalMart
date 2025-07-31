"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const navigationItems = [
    {
      label: "In-Ear Monitors",
      hasDropdown: true,
      submenu: [
        "Professional IEMs",
        "Consumer IEMs",
        "Custom IEMs",
        "Budget IEMs",
        "Flagship IEMs",
      ],
    },
    {
      label: "Headphones",
      hasDropdown: true,
      submenu: [
        "Over-Ear",
        "On-Ear",
        "Gaming Headsets",
        "Studio Monitors",
        "Wireless",
      ],
    },
    {
      label: "Speakers",
      hasDropdown: true,
      submenu: [
        "Bluetooth Speakers",
        "Bookshelf Speakers",
        "Studio Monitors",
        "Portable Speakers",
      ],
    },
    {
      label: "Audio Gear",
      hasDropdown: true,
      submenu: ["DACs & Amps", "Audio Cables", "Accessories", "Cases & Tips"],
    },
    {
      label: "Brands",
      hasDropdown: false,
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-0.5 sm:px-0.5 lg:px-0.5">
        <div className="flex items-center h-20">
          {/* Logo - Leftmost with small padding */}
          <div className="flex-shrink-0 pr-4">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-green-700">SukalMart</div>
            </Link>
          </div>

          {/* Desktop Navigation - Center with more gap */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8 flex-1 justify-center">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-700 font-normal transition-colors duration-200 py-2"
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

                {/* Desktop Dropdown Menu */}
                {item.hasDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-700 transition-colors"
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

          {/* Right side - Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <img
                  src="/searchicon.svg"
                  alt="Search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                />
              </div>
            </div>

            {/* Cart */}
            <button className="relative p-2 text-gray-700 hover:text-green-700 transition-colors">
              <img src="/Carticon.svg" alt="Cart" className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* User */}
            <button className="p-2 text-gray-700 hover:text-green-700 transition-colors">
              <img src="/usericon.svg" alt="User" className="w-6 h-6" />
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-green-700 transition-colors"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <img
                    src="/searchicon.svg"
                    alt="Search"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              {navigationItems.map((item, index) => (
                <div key={index}>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-700 transition-colors flex items-center justify-between"
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

                  {/* Mobile Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="bg-gray-50">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-green-700 transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
