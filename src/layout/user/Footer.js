"use client";

import { navigationLinks } from "../../lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#202020] text-white">
      <div className="flex flex-col items-center px-4 py-16">
        <div className="flex flex-col gap-16 items-center justify-start w-full max-w-6xl">
          {/* Logo */}
          <div className="h-8 w-44">
            <img
              alt="YesJ Logo"
              className="block max-w-none size-full"
              src="http://localhost:3845/assets/447b5d5325bb1e9cd3e1f5aa17d99c22105a61f4.svg"
            />
          </div>

          {/* Navigation and Social Links */}
          <div className="flex flex-col gap-8 items-center justify-start w-full">
            {/* Navigation Links */}
            <div
              className="flex flex-wrap justify-center items-center gap-6 w-full text-white text-[14px] font-medium"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.14px",
              }}
            >
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-gray-300 transition-colors whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Divider Line */}
            <div className="h-0 w-full">
              <img
                alt=""
                className="block max-w-none w-full"
                src="http://localhost:3845/assets/193b018aa521fd64a1a475d02411d4cd670c33ce.svg"
              />
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
                  src="http://localhost:3845/assets/c4c6b28ea3e12f8c0d7d4d0d0598caaa5cad55dd.svg"
                />
              </a>
              <a
                href="#"
                className="w-6 h-[23.95px] hover:opacity-80 transition-opacity"
              >
                <img
                  alt="Facebook"
                  className="block max-w-none size-full"
                  src="http://localhost:3845/assets/e98a8dae219"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
