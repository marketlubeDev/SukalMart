"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../layout/user/Nav";
import Footer from "../layout/user/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname.startsWith("/login/");

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Nav />
       
        {children}
        {!isLoginPage && <Footer />}
      </body>
    </html>
  );
}
