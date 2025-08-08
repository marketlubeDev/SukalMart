import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../layout/user/Nav";
import Footer from "../layout/user/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
