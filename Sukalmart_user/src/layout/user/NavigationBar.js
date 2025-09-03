"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NavigationBar = ({ navigationItems }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="bg-[var(--color-primary)]">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="hidden lg:flex lg:items-center lg:justify-evenly py-0.5">
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className="relative group flex-shrink-0"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center space-x-1 text-white font-normal transition-colors duration-200 py-2 cursor-pointer whitespace-nowrap text-sm xl:text-xs tracking-[0.02em]"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "white")}
                onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                onClick={() => {
                  // Reset category when Products is clicked
                  if (item.label === "Products") {
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

              {/* Desktop Dropdown Menu */}
              {item.hasDropdown && (
                <div className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                  activeDropdown === item.label ? "opacity-100 visible" : "opacity-0 invisible"
                }`}>
                  <div className="py-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/products?category=${encodeURIComponent(
                          subItem
                        )}`}
                        className="block px-4 py-2 text-gray-700 transition-colors duration-200 cursor-pointer text-sm tracking-[0.02em]"
                        style={{ cursor: "pointer" }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(109, 13, 38, 0.1)";
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
