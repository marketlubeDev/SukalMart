"use client";

import { navigationLinks } from "../../lib/data";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const normalizeSlug = (value) =>
    String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const handleCategoryClick = (categoryName) => {
    router.push(`/category/${normalizeSlug(categoryName)}`);
  };
  return (
    <footer className="bg-[#202020] text-white overflow-hidden">
      <div className="flex flex-col items-center px-4 pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16">
        <div className="flex flex-col gap-4 items-center justify-start w-full max-w-6xl">
          {/* Logo */}
          <div 
            className="h-16 w-56 sm:h-20 sm:w-72 md:h-24 md:w-80 flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/')}
          >
            <img
              src="/souqalmart-logo-white.svg"
              alt="Souqalmart Logo"
              className="h-16 w-auto sm:h-20 md:h-24"
            />
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-col gap-6 sm:gap-8 items-center justify-start w-full">
            {/* Navigation Links */}
            <div
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 w-full text-[14px] sm:text-[16px] md:text-[18px] font-medium leading-normal tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px]"
              style={{
                color: "#f8f1ec",

                fontStyle: "normal",
                leadingTrim: "both",
                textEdge: "cap",
              }}
            >
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                onClick={() => handleCategoryClick("Hair Care")}
              >
                Hair Care
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                onClick={() => handleCategoryClick("Body & Shower")}
              >
                Body & Shower
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                onClick={() => handleCategoryClick("Soap & Deodorants")}
              >
                Soap & Deodorants
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                onClick={() => handleCategoryClick("Skin Care")}
              >
                Skin Care
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                onClick={() => handleCategoryClick("Oral & Misc")}
              >
                Oral & Misc
              </a>
            </div>

            {/* Divider Line */}
            <div className="h-0 w-full">
              <svg width="100%" height="1" viewBox="0 0 100% 1" fill="none">
                <rect width="100%" height="1" fill="rgba(255, 255, 255, 0.2)" />
              </svg>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-6 sm:gap-8 items-center justify-center" style={{ color: "#f8f1ec" }}>
              <a
                href="#"
                className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="X (Twitter)"
                  className="block max-w-none size-full"
                  src="/link1.svg"
                />
              </a>
              <a
                href="#"
                className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="Facebook"
                  className="block max-w-none size-full"
                  src="/link2.svg"
                />
              </a>
              <a
                href="#"
                className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="Instagram"
                  className="block max-w-none size-full"
                  src="/link3.svg"
                />
              </a>
              <a
                href="#"
                className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="YouTube"
                  className="block max-w-none size-full"
                  src="/link4.svg"
                />
              </a>
            </div>

            {/* Copyright and Powered By */}
            <div className="flex flex-row gap-2 sm:gap-3 h-auto sm:h-3.5 items-center justify-center">
              <div className="flex gap-2 items-center opacity-40">
                <p
                  className="whitespace-nowrap text-[10px] sm:text-[12px] md:text-[16px] font-normal"
                  style={{
                    color: "#FFF",

                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    leadingTrim: "both",
                    textEdge: "cap",
                  }}
                >
                  © 2025 Souqalmart All rights reserved
                </p>
              </div>
              <div className="h-full w-0">
                <svg width="1" height="14" viewBox="0 0 1 14" fill="none">
                  <rect width="1" height="14" fill="rgba(255, 255, 255, 0.2)" />
                </svg>
              </div>
              <span
                className="opacity-40 text-center whitespace-nowrap text-[10px] sm:text-[12px] md:text-[16px] font-normal transition-opacity"
                style={{
                  color: "#f8f1ec",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  leadingTrim: "both",
                  textEdge: "cap",
                }}
              >
                Powered by{" "}
                <span
                  className="hover:opacity-50 transition-opacity"
                  style={{ textDecoration: "underline", cursor: "pointer", color: "#f8f1ec" }}
                  onClick={() => window.open("https://www.marketlube.in/", "_blank", "noopener,noreferrer")}
                >
                  Marketlube
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
