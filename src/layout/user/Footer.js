"use client";

import { navigationLinks } from "../../lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#202020] text-white overflow-hidden">
      <div className="flex flex-col items-center px-4 py-16">
        <div className="flex flex-col gap-16 items-center justify-start w-full max-w-6xl">
          {/* Logo */}
          <div className="h-8 w-44 flex items-center">
            <img src="/logo1.svg" alt="Souqalmart Logo" className="h-7 w-7 mr-2" />
            <span className="text-white text-3xl font-bold" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              souqalmart
            </span>
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-col gap-8 items-center justify-start w-full">
            {/* Navigation Links */}
            <div
              className="flex flex-wrap justify-center items-center gap-6 w-full"
              style={{
                color: "#FFF",
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "-0.18px",
                leadingTrim: "both",
                textEdge: "cap",
              }}
            >
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                In-Ears
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Headphones
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                True Wireless
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Amps & DACs
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Hi-Res Players
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Accessories
              </a>
            </div>

            {/* Divider Line */}
            <div className="h-0 w-full">
              <svg width="100%" height="1" viewBox="0 0 100% 1" fill="none">
                <rect width="100%" height="1" fill="rgba(255, 255, 255, 0.2)"/>
              </svg>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-8 items-center justify-center">
              <a
                href="#"
                className="w-6 h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="X (Twitter)"
                  className="block max-w-none size-full"
                  src="/link1.svg"
                />
              </a>
              <a
                href="#"
                className="w-6 h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="Facebook"
                  className="block max-w-none size-full"
                  src="/link2.svg"
                />
              </a>
              <a
                href="#"
                className="w-6 h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="Instagram"
                  className="block max-w-none size-full"
                  src="/link3.svg"
                />
              </a>
              <a
                href="#"
                className="w-6 h-6 hover:opacity-80 transition-opacity"
              >
                <img
                  alt="YouTube"
                  className="block max-w-none size-full"
                  src="/link4.svg"
                />
              </a>
            </div>

            {/* Copyright and Powered By */}
            <div className="flex gap-3 h-3.5 items-center justify-center">
              <div className="flex gap-2 items-center opacity-40">
                <p
                  className="whitespace-nowrap text-[12px] font-normal"
                  style={{
                    color: "#FFF",
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    // leading-trim and text-edge are not standard CSS properties yet,
                    // but if you want to add them for future support or custom implementation:
                    leadingTrim: "both",
                    textEdge: "cap",
                  }}
                >
                  © 2025 Logoipsum All rights reserved
                </p>
              </div>
              <div className="h-full w-0">
                <svg width="1" height="14" viewBox="0 0 1 14" fill="none">
                  <rect width="1" height="14" fill="rgba(255, 255, 255, 0.2)"/>
                </svg>
              </div>
              <p
                className="opacity-40 text-center whitespace-nowrap text-[12px] font-normal"
                style={{
                  color: "#FFF",
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                  leadingTrim: "both",
                  textEdge: "cap",
                }}
              >
                Powered by Marketlube
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
