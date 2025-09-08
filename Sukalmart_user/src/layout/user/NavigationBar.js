"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "../../lib/hooks/useTranslation";

const NavigationBar = ({ navigationItems }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const { t, isRTL } = useTranslation();
  const navRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleMouseEnter = (item, event) => {
    if (item.hasDropdown) {
      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      setActiveDropdown(item.label);
      // Calculate position for dropdown
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: isRTL ? rect.right - 224 : rect.left, // 224px is w-56 (14rem)
      });
    }
  };

  const handleMouseLeave = (item) => {
    if (item.hasDropdown) {
      // Add a small delay before hiding to allow moving to dropdown
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 150);
    }
  };

  const handleDropdownMouseEnter = () => {
    // Clear timeout when entering dropdown
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    // Hide dropdown when leaving
    setActiveDropdown(null);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[var(--color-primary)] relative" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-x-hidden">
        <div className="hidden lg:flex lg:items-center lg:justify-evenly py-0.5" ref={navRef}>
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="relative group flex-shrink-0"
              onMouseEnter={(e) => handleMouseEnter(item, e)}
              onMouseLeave={() => handleMouseLeave(item)}
            >
              <Link
                href={item.href}
                className="flex items-center space-x-1 text-white font-normal transition-colors duration-200 py-2 cursor-pointer whitespace-nowrap text-sm xl:text-xs tracking-[0.02em]"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                onClick={() => {
                  // Reset category when Products is clicked
                  if (item.label === t("nav.products")) {
                    localStorage.removeItem("selectedCategory");
                  }
                  // Do not persist dropdown on click; hover controls visibility
                }}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <Image
                    src="/dropdownicon.svg"
                    alt="dropdown"
                    width={7}
                    height={4}
                    className={`w-[7px] h-[4px] transition-transform duration-200 group-hover:rotate-180 filter brightness-0 invert ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dropdown Portal - Outside the overflow container */}
      {activeDropdown && (
        <div 
          className="fixed w-56 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-[9999]"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="py-2">
            {navigationItems
              .find(item => item.label === activeDropdown)
              ?.submenu?.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={`/products?category=${encodeURIComponent(subItem)}`}
                  className="block px-4 py-2 text-gray-700 transition-colors duration-200 cursor-pointer text-sm tracking-[0.02em] hover:bg-red-50 hover:text-[#6D0D26]"
                  style={{ cursor: "pointer" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(109, 13, 38, 0.1)";
                    e.currentTarget.style.color = "#6D0D26";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#374151";
                  }}
                >
                  {subItem}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
