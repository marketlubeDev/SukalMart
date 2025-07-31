"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const source = new EventSource("http://127.0.0.1:3845/sse");

    source.addEventListener("endpoint", (event) => {
      console.log("SSE Event [endpoint]:", event.data);
      // You can parse JSON here if needed
      // const data = JSON.parse(event.data);
    });

    source.onerror = (err) => {
      console.error("SSE connection error:", err);
      // Optionally close the connection on error
      // source.close();
    };

    return () => {
      source.close(); // Clean up on unmount
    };
  }, []);

  const categories = [
    {
      name: "In-Ears",
      image:
        "http://localhost:3845/assets/35419d552beadb0a62b9ff2b641e11a23ff933aa.png",
    },
    {
      name: "Headphones",
      image:
        "http://localhost:3845/assets/7496bc2bb3bacd2cc802bff639593704a0cee868.png",
    },
    {
      name: "True Wireless",
      image:
        "http://localhost:3845/assets/17c65358b988e0030206ba7b11ec0d3014462203.png",
    },
    {
      name: "Amps & DACs",
      image:
        "http://localhost:3845/assets/b318b55c51823db7d85e261231f3756e1102fcf0.png",
    },
    {
      name: "Hi-Res Players",
      image:
        "http://localhost:3845/assets/59cb7669f7c85bb909cd6cdaa4be08fd3ed5b43f.png",
    },
    {
      name: "Accessories",
      image:
        "http://localhost:3845/assets/5c683fde9b5148a17519807c7aa869a4e5628e00.png",
    },
  ];

  const products = [
    {
      id: 1,
      name: "7hz Salnotes Zero 2 Wired IEM(type c)",
      category: "In-ear monitors",
      price: "₹1,899",
      originalPrice: "₹2,099",
      image: "/placeholder-iem-1.jpg",
      bestSeller: true,
    },
    {
      id: 2,
      name: "7hz Salnotes Zero 2 Wired IEM(type c)",
      category: "In-ear monitors",
      price: "₹1,899",
      originalPrice: "₹2,099",
      image: "/placeholder-iem-2.jpg",
      bestSeller: false,
    },
    {
      id: 3,
      name: "7hz Salnotes Zero 2 Wired IEM(type c)",
      category: "In-ear monitors",
      price: "₹1,899",
      originalPrice: "₹2,099",
      image: "/placeholder-iem-3.jpg",
      bestSeller: false,
    },
    {
      id: 4,
      name: "7hz Salnotes Zero 2 Wired IEM(type c)",
      category: "In-ear monitors",
      price: "₹1,899",
      originalPrice: "₹2,099",
      image: "/placeholder-iem-4.jpg",
      bestSeller: false,
    },
  ];

  const newLaunches = [
    {
      id: 1,
      brand: "FatFrequency",
      subtitle: "Starting @ ₹59,599",
      image: "/placeholder-fatfrequency.jpg",
    },
    {
      id: 2,
      brand: "64 Audio",
      subtitle: "Starting @ ₹1,09,999",
      image: "/placeholder-64audio.jpg",
    },
    {
      id: 3,
      brand: "Noble Audio - Kublai Khan",
      subtitle: "Limited Edition - @ ₹1,79,999",
      image: "/placeholder-noble.jpg",
    },
    {
      id: 4,
      brand: "Dita Audio- Project M",
      subtitle: "In-Ears With 1 DD + 1 BA Drivers",
      image: "/placeholder-dita.jpg",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Jabar x Crinacle - ZERO: RED",
      category: "In-ear monitors",
      rating: 4.5,
      description:
        "Expertly tuned dual dynamic driver IEMs with balanced, engaging sound and bold RED design. Crafted for audiophiles, by Crinacle.",
      price: "₹1,899",
      originalPrice: "₹2,099",
      image: "/placeholder-zero-red.jpg",
    },
    {
      id: 2,
      name: "DITA Audio - Project M",
      category: "In-Ears with 1 DD + 1 BA drivers",
      rating: 4.5,
      description:
        "1 Dynamic + 1 BA driver deliver a balanced, detailed sound with rich lows and crisp highs.",
      price: "₹29,999",
      originalPrice: "₹34,999",
      image: "/placeholder-project-m.jpg",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          className="w-5 h-5 text-gray-300 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-5 h-5 text-gray-300 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden">
        {/* Desktop Version */}
        <div className="hidden lg:block relative h-[640px] bg-white">
          {/* Background with banner image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/banner1.png')",
            }}
          >
          </div>

          {/* Content - Bottom Left with Previous Button */}
          <div className="relative z-10 h-full flex items-end">
            <div className="container mx-auto px-8 pb-16">
              <div className="max-w-2xl">
                {/* Row 1: Previous Button */}
                <div className="mb-6">
                  <button className="text-gray-800 hover:text-gray-600 transition-colors">
                    <img
                      src="/previousicon.svg"
                      alt="Previous"
                      className="w-4 h-7"
                    />
                  </button>
                </div>
                
                {/* Row 2: Heading */}
                <h1 className="text-[2.8rem] font-semibold text-gray-800 mb-6 leading-none whitespace-nowrap">
                  Silence the World, Hear Every Detail
                </h1>
                
                {/* Row 3: Paragraph 1 */}
                <p className="text-[1.3rem] text-gray-600 mb-0 leading-relaxed">
                  Active Noise Cancellation, Superior Comfort, Unmatched Finish
                </p>
                
                {/* Row 4: Paragraph 2 */}
                <p className="text-[1.3rem] text-gray-600 mb-8 leading-relaxed">
                  Upgrade Your Audio Game Today
                </p>
                
                {/* Row 5: Shop Now Button */}
                <button className="bg-[#035F0F] hover:bg-[#035F0F]/90 text-white font-medium px-6 py-4 rounded transition-colors duration-200 flex items-center justify-center gap-2">
                  Shop now
                </button>
              </div>
            </div>
          </div>

          {/* Next Button Only */}
          <div className="absolute right-50 top-1/2 transform -translate-y-1/2">
            <button className="text-gray-800 hover:text-gray-600 transition-colors p-2">
              <img
                src="/nexticon.svg"
                alt="Next"
                className="w-4 h-7"
              />
          </button>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className="w-20 h-1 bg-green-700 rounded-full opacity-70"></div>
              <div className="w-20 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Mobile Version - Clean Layout */}
        <div className="lg:hidden relative h-[570px] w-full">
          {/* Background */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/banner1.png')",
            }}
          >
          </div>

          {/* Content positioned at bottom */}
          <div className="absolute bottom-10 left-4 right-4">
            <div className="flex flex-col gap-10">
              {/* Text Content */}
              <div className="flex flex-col gap-5">
                <h1
                  className="text-[28px] font-semibold text-[#333333] leading-normal"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    letterSpacing: "-1.12px",
                  }}
                >
                  Silence the World, Hear Every Detail
                </h1>
                <p
                  className="text-[14px] font-normal text-[#565656] leading-normal"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    letterSpacing: "-0.42px",
                  }}
                >
                  Active Noise Cancellation, Superior Comfort, Unmatched Finish
                  <br />
                  Upgrade Your Audio Game Today
                </p>
              </div>

              {/* Shop Now Button */}
              <button className="bg-[#035f0f] text-white px-6 py-4 rounded flex items-center justify-center self-start">
                <span
                  className="text-[14px] font-medium"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    letterSpacing: "-0.42px",
                  }}
                >
                  Shop now
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center px-8 z-10">
            <button className="text-[#333333] hover:text-[#565656] transition-colors">
              <img
                src="/previousicon.svg"
                alt="Previous"
                className="w-4 h-7"
              />
          </button>
            <button className="text-[#333333] hover:text-[#565656] transition-colors">
              <img
                src="/nexticon.svg"
                alt="Next"
                className="w-4 h-7"
              />
          </button>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-[15.68px] left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2 w-[106px]">
              <div className="flex-1 h-0.5 bg-[rgba(51,51,51,0.2)] rounded-2xl relative overflow-hidden">
                <div className="absolute left-0 top-0 w-full h-[3px] bg-[rgba(3,95,15,0.7)] rounded-2xl" />
              </div>
              <div className="flex-1 h-0.5 bg-[rgba(51,51,51,0.2)] rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category Section - Updated Layout */}
      <div 
        className="flex flex-col items-center justify-center w-full"
        style={{
          display: "flex",
          padding: "80px 0 40px 0",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          alignSelf: "stretch",
          background: "#FFF"
        }}
      >
        <div
          className="text-[#333333] text-[22px] font-bold text-center"
          style={{
            fontFamily: '"Nunito Sans", sans-serif',
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-0.28px",
            lineHeight: "normal",
            fontStyle: "normal",
            alignSelf: "stretch",
          }}
        >
          Shop by category
        </div>
        <div 
          className="flex items-start justify-center w-full"
          style={{
            display: "flex",
            padding: "0 200px",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch"
          }}
        >
          {/* In-Ears */}
              <div
            className="flex flex-col items-center justify-start"
                style={{
              display: "flex",
              height: "274.593px",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              aspectRatio: "233.33/274.59"
            }}
          >
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full h-full">
              <img
                src="/shop1.png"
                alt="In-Ears"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[#000000] text-[14px] font-medium text-left whitespace-nowrap"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              In-Ears
            </div>
          </div>

          {/* Headphones */}
              <div
            className="flex flex-col items-center justify-start"
                style={{
              display: "flex",
              height: "274.593px",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              aspectRatio: "233.33/274.59"
            }}
          >
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full h-full">
              <img
                src="/shop2.png"
                alt="Headphones"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[#000000] text-[14px] font-medium text-left whitespace-nowrap"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              Headphones
            </div>
          </div>

          {/* True Wireless */}
              <div
            className="flex flex-col items-center justify-start"
                style={{
              display: "flex",
              height: "274.593px",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              aspectRatio: "233.33/274.59"
            }}
          >
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full h-full">
              <img
                src="/shop3.png"
                alt="True Wireless"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[#000000] text-[14px] font-medium text-left whitespace-nowrap"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              True Wireless
            </div>
          </div>

          {/* Amps & DACs */}
              <div
            className="flex flex-col items-center justify-start"
                style={{
              display: "flex",
              height: "274.593px",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              aspectRatio: "233.33/274.59"
            }}
          >
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full h-full">
              <img
                src="/shop4.png"
                alt="Amps & DACs"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[#000000] text-[14px] font-medium text-left whitespace-nowrap"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              Amps & DACs
            </div>
          </div>

          {/* Hi-Res Players */}
              <div
            className="flex flex-col items-center justify-start"
                style={{
              display: "flex",
              height: "274.593px",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              aspectRatio: "233.33/274.59"
            }}
          >
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full h-full">
              <img
                src="/shop5.png"
                alt="Hi-Res Players"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[#000000] text-[14px] font-medium text-left whitespace-nowrap"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              Hi-Res Players
            </div>
          </div>

          {/* Accessories */}
              <div
            className="flex flex-col items-center justify-start"
                style={{
              display: "flex",
              height: "274.593px",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              aspectRatio: "233.33/274.59"
            }}
          >
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full h-full">
              <img
                src="/shop6.png"
                alt="Accessories"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[#000000] text-[14px] font-medium text-left whitespace-nowrap"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              Accessories
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-white py-16">
        <div className="px-4 sm:px-6 md:px-12 lg:px-[200px]">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-[24px] font-bold"
              style={{
                color: "#333",
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 700,
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "-0.24px",
              }}
            >
              Best Sellers
            </h2>
            <button className="flex items-center gap-2 font-medium transition-colors" style={{ color: "#035F0F" }}>
              <span>View all</span>
              <img
                src="/nextarrow.svg"
                alt="Next arrow"
                className="w-7 h-7"
              />
            </button>
          </div>

          {/* Best Sellers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 - A1 Badge */}
            <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
              <div className="relative">
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src="/best1.png"
                    alt="7hz Salnotes Zero 2 Wired IEM"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* A1 Badge */}
                <div className="absolute top-2 left-0 flex items-center shadow-lg">
                  <div className="text-white px-2 text-xs font-bold flex items-center" style={{ backgroundColor: "#035F0F", height: "23px" }}>
                    A1
                  </div>
                  <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z" fill="#035F0F"/>
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  7hz Salnotes Zero 2 Wired IEM(type c)
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  In-ear monitors
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold" style={{ color: "#035F0F" }}>
                    ₹1,899
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹2,099
                  </span>
                </div>
                <div className="flex justify-start">
                  <button 
                    className="bg-white text-black font-medium transition-colors"
                    style={{
                      display: "flex",
                      height: "40px",
                      padding: "14px 24px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      border: "1px solid #035F0F"
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product 2 - #2 Badge */}
            <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
              <div className="relative">
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src="/best2.png"
                    alt="7hz Salnotes Zero 2 Wired IEM"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* #2 Badge */}
                <div className="absolute top-2 left-0 flex items-center shadow-lg">
                  <div className="text-white px-2 text-xs font-bold flex items-center" style={{ backgroundColor: "#035F0F", height: "23px" }}>
                    #2
                  </div>
                  <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z" fill="#035F0F"/>
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  7hz Salnotes Zero 2 Wired IEM(type c)
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  In-ear monitors
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold" style={{ color: "#035F0F" }}>
                    ₹1,899
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹2,099
                  </span>
                </div>
                <div className="flex justify-start">
                  <button 
                    className="bg-white text-black font-medium transition-colors"
                    style={{
                      display: "flex",
                      height: "40px",
                      padding: "14px 24px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      border: "1px solid #035F0F"
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product 3 - #3 Badge */}
            <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
              <div className="relative">
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src="/best3.png"
                    alt="7hz Salnotes Zero 2 Wired IEM"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* #3 Badge */}
                <div className="absolute top-2 left-0 flex items-center shadow-lg">
                  <div className="text-white px-2 text-xs font-bold flex items-center" style={{ backgroundColor: "#035F0F", height: "23px" }}>
                    #3
                  </div>
                  <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z" fill="#035F0F"/>
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  7hz Salnotes Zero 2 Wired IEM(type c)
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  In-ear monitors
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold" style={{ color: "#035F0F" }}>
                    ₹1,899
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹2,099
                  </span>
                </div>
                <div className="flex justify-start">
                  <button 
                    className="bg-white text-black font-medium transition-colors"
                    style={{
                      display: "flex",
                      height: "40px",
                      padding: "14px 24px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      border: "1px solid #035F0F"
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product 4 - No Badge */}
            <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
              <div className="relative">
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src="/best4.png"
                    alt="7hz Salnotes Zero 2 Wired IEM"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  7hz Salnotes Zero 2 Wired IEM(type c)
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  In-ear monitors
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold" style={{ color: "#035F0F" }}>
                    ₹1,899
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹2,099
                  </span>
                </div>
                <div className="flex justify-start">
                  <button 
                    className="bg-white text-black font-medium transition-colors"
                    style={{
                      display: "flex",
                      height: "40px",
                      padding: "14px 24px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      border: "1px solid #035F0F"
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits Section */}
      <div className="py-12" style={{ background: "rgba(3, 95, 15, 0.05)" }}>
        <div className="px-8 sm:px-12 md:px-16 lg:px-[300px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            {/* Secured Payment */}
            <div className="flex flex-col items-center gap-3">
              <img
                src="/cash1.svg"
                alt="Secured Payment"
                className="w-16 h-16"
              />
              <span 
                className="text-center"
                style={{
                  color: "#333",
                  fontFamily: '"Nunito Sans"',
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.36px",
                  width: "180px"
                }}
              >
                Secured payment
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block" style={{ width: "0", height: "120px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="120" viewBox="0 0 2 120" fill="none">
                <path d="M1 0.59375V120.594" stroke="rgba(0, 0, 0, 0.16)" strokeWidth="1"/>
              </svg>
            </div>

            {/* Delivery */}
            <div className="flex flex-col items-center gap-3">
              <img
                src="/cash2.svg"
                alt="Delivery"
                className="w-16 h-16"
              />
              <span 
                className="text-center"
                style={{
                  color: "#333",
                  fontFamily: '"Nunito Sans"',
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.36px",
                  width: "180px"
                }}
              >
                Delivery in 3-4 working days
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block" style={{ width: "0", height: "120px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="120" viewBox="0 0 2 120" fill="none">
                <path d="M1 0.59375V120.594" stroke="rgba(0, 0, 0, 0.16)" strokeWidth="1"/>
              </svg>
            </div>

            {/* 24x7 Support */}
            <div className="flex flex-col items-center gap-3">
              <img
                src="/cash3.svg"
                alt="24x7 Support"
                className="w-16 h-16"
              />
              <span 
                className="text-center"
                style={{
                  color: "#333",
                  fontFamily: '"Nunito Sans"',
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.36px",
                  width: "180px"
                }}
              >
                24x7 support
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block" style={{ width: "0", height: "120px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="120" viewBox="0 0 2 120" fill="none">
                <path d="M1 0.59375V120.594" stroke="rgba(0, 0, 0, 0.16)" strokeWidth="1"/>
              </svg>
            </div>

            {/* Pay on Delivery */}
            <div className="flex flex-col items-center gap-3">
              <img
                src="/cash4.svg"
                alt="Pay on Delivery"
                className="w-16 h-16"
              />
              <span 
                className="text-center"
                style={{
                  color: "#333",
                  fontFamily: '"Nunito Sans"',
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.36px",
                  width: "180px"
                }}
              >
                Pay on delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left Section - Crystal Clear Audio */}
          <div 
            className="flex-1 relative overflow-hidden rounded-l-lg"
            style={{
              height: "240px",
              flex: "1 0 0",
              borderRadius: "4px 0 0 4px",
              background: "linear-gradient(90deg, #E3EBFF, #ECF1FF)"
            }}
          >
            {/* Product Image - Right Side */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <img
                src="/left.png"
                alt="SOUNDPEATS Headphones"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
              />
            </div>

            {/* Content - Left Side */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
              <h3 
                className="text-xl sm:text-2xl font-bold mb-3"
                style={{ color: "#333333" }}
              >
                Crystal Clear Audio, Now at 15% OFF!
              </h3>
              <p 
                className="text-sm sm:text-base mb-4 text-gray-600"
                style={{ color: "#333333" }}
              >
                Crisp sound. Comfortable fit. Limited time offer
              </p>
              <button 
                className="text-gray-800 font-medium px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
                style={{ 
                  color: "#333333",
                  border: "1px solid #333"
                }}
              >
                Shop now
              </button>
            </div>
          </div>

          {/* Right Section - Pro Sound, Pro Price */}
          <div 
            className="flex-1 relative overflow-hidden rounded-r-lg"
            style={{
              height: "240px",
              flex: "1 0 0",
              borderRadius: "0 4px 4px 0",
              background: "#F4FFAA"
            }}
          >
            {/* Product Image - Right Side */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <img
                src="/right.png"
                alt="Professional IEMs"
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
              />
            </div>

            {/* Content - Left Side */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
              <h3 
                className="text-xl sm:text-2xl font-bold mb-3"
                style={{ color: "#333333" }}
              >
                Pro Sound, Pro Price
              </h3>
              <p 
                className="text-sm sm:text-base mb-4 text-gray-600"
                style={{ color: "#333333" }}
              >
                Get pro-quality IEMs at unbeatable prices. Limited time only
              </p>
              <button 
                className="text-gray-800 font-medium px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
                style={{ 
                  color: "#333333",
                  border: "1px solid #333"
                }}
              >
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured IEM's Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <h2
              className="text-[22px] font-bold"
              style={{
                color: "#333333",
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.22px",
              }}
            >
              Featured IEM's
            </h2>
            <button className="flex items-center gap-2 font-medium transition-colors" style={{ color: "#035F0F" }}>
              <span>View all</span>
              <img
                src="/nextarrow.svg"
                alt="Next arrow"
                className="w-7 h-7"
              />
            </button>
          </div>

          {/* Product Cards - 50:50 Layout */}
          <div className="flex flex-row gap-6 w-full">
            {/* Product Card 1 - 50% width */}
            <div className="flex flex-row gap-6 w-1/2 bg-white rounded-lg p-6 pl-0">
              {/* Product Image - 50% of card */}
              <div className="relative w-1/2 aspect-square rounded overflow-hidden flex-shrink-0">
                <img
                  src="/iem1.jpg"
                  alt="Jabar x Crinacle - ZERO: RED"
                  className="w-full h-full object-cover"
                />
                {/* Wishlist Button */}
                <button className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center">
                  <img
                    src="/like.svg"
                    alt="Wishlist"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {/* Product Info - 50% of card */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-[18px] font-semibold"
                    style={{
                      color: "#333333",
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.36px",
                    }}
                  >
                    Jabar x Crinacle - ZERO: RED
                  </h3>
                  <p
                    className="text-[14px] font-normal"
                    style={{
                      color: "rgba(51,51,51,0.7)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                    }}
                  >
                    In-ear monitors
                  </p>
                  
                  {/* Rating */}
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-1 items-center">
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/star.svg" alt="Star" className="w-4 h-4" />
                    </div>
                    <span
                      className="text-[16px] font-medium"
                      style={{
                        color: "#333333",
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                      }}
                    >
                      4.5
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[16px] font-normal"
                    style={{
                      color: "rgba(51,51,51,0.8)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.32px",
                      lineHeight: "1.4",
                    }}
                  >
                    Expertly tuned dual dynamic driver IEMs with balanced, engaging sound and bold RED design. Crafted for audiophiles, by Crinacle.
                  </p>
                </div>

                {/* Price and Button */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-3 items-center">
                    <span
                      className="text-[20px] font-bold"
                      style={{
                        color: "#035F0F",
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.4px",
                      }}
                    >
                      ₹1,899
                    </span>
                    <span
                      className="text-[16px] font-normal line-through"
                      style={{
                        color: "rgba(51,51,51,0.6)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                      }}
                    >
                      ₹2,099
                    </span>
                  </div>
                  <button 
                    className="bg-white text-[#035F0F] font-medium transition-colors self-start"
                    style={{
                      display: "flex",
                      height: "48px",
                      padding: "16px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      border: "1px solid #035F0F"
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 - 50% width */}
            <div className="flex flex-row gap-6 w-1/2 bg-white rounded-lg p-6 pl-0">
              {/* Product Image - 50% of card */}
              <div className="relative w-1/2 aspect-square rounded overflow-hidden flex-shrink-0">
                <img
                  src="/iem1.jpg"
                  alt="Jabar x Crinacle - ZERO: RED"
                  className="w-full h-full object-cover"
                />
                {/* Wishlist Button */}
                <button className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center">
                  <img
                    src="/like.svg"
                    alt="Wishlist"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              {/* Product Info - 50% of card */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-[18px] font-semibold"
                    style={{
                      color: "#333333",
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.36px",
                    }}
                  >
                    Jabar x Crinacle - ZERO: RED
                  </h3>
                  <p
                    className="text-[14px] font-normal"
                    style={{
                      color: "rgba(51,51,51,0.7)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                    }}
                  >
                    In-ear monitors
                  </p>
                  
                  {/* Rating */}
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-1 items-center">
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/filledstar.svg" alt="Star" className="w-4 h-4" />
                      <img src="/star.svg" alt="Star" className="w-4 h-4" />
                    </div>
                    <span
                      className="text-[16px] font-medium"
                      style={{
                        color: "#333333",
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                      }}
                    >
                      4.5
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-[16px] font-normal"
                    style={{
                      color: "rgba(51,51,51,0.8)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.32px",
                      lineHeight: "1.4",
                    }}
                  >
                    Expertly tuned dual dynamic driver IEMs with balanced, engaging sound and bold RED design. Crafted for audiophiles, by Crinacle.
                  </p>
                </div>

                {/* Price and Button */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-3 items-center">
                    <span
                      className="text-[20px] font-bold"
                      style={{
                        color: "#035F0F",
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.4px",
                      }}
                    >
                      ₹1,899
                    </span>
                    <span
                      className="text-[16px] font-normal line-through"
                      style={{
                        color: "rgba(51,51,51,0.6)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                      }}
                    >
                      ₹2,099
                    </span>
                  </div>
                  <button 
                    className="bg-white text-[#035F0F] font-medium transition-colors self-start"
                    style={{
                      display: "flex",
                      height: "48px",
                      padding: "16px 32px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      border: "1px solid #035F0F"
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Crystal Clear Audio Banner Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg">
          {/* Background with crystal image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/crystal.jpg')",
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="ml-4 sm:ml-6 lg:ml-10 max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]">
                              <div className="mb-6 lg:mb-8">
                  <h2
                    className="mb-4 sm:mb-5 lg:mb-6"
                    style={{
                      color: "#FFF",
                      textAlign: "left",
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: "32px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "135%", // 43.2px
                      letterSpacing: "-0.64px",
                    }}
                  >
                    Crystal Clear Audio, Now at 15% OFF!
                  </h2>
                  <p
                    style={{
                      color: "#FFF",
                      textAlign: "left",
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "135%", // 24.3px
                      letterSpacing: "-0.36px",
                    }}
                    className="mb-6 sm:mb-8"
                  >
                    Crisp sound. Comfortable fit. Limited time offer
                  </p>
                </div>

              <button
                className="bg-transparent text-white font-medium px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-[4px] text-base sm:text-lg hover:bg-gray-700 transition-colors duration-200"
                style={{ border: "1px solid #FFF" }}
              >
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>

      

      {/* Promotional Banner Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[507px] w-full overflow-hidden rounded-lg">
          {/* Background with gradient and product image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.4) 27.517%, rgba(0, 0, 0, 0) 52.434%), linear-gradient(148.443deg, rgb(59, 130, 246) 0.36646%, rgb(37, 99, 235) 44.792%)",
            }}
          >
            {/* Product image area - right side */}
            <div className="absolute right-0 top-0 h-full w-1/2 md:w-1/2 flex items-center justify-center">
              {/* Placeholder for Astell&Kern Volcano IEM image */}
              <div className="relative">
                <div className="w-40 h-32 sm:w-60 sm:h-48 lg:w-96 lg:h-80 flex items-center justify-center">
                  <div className="text-white/20 text-xs sm:text-sm bg-white/10 rounded-lg p-2 sm:p-4 backdrop-blur-sm text-center">
                    Astell&Kern Volcano IEM Image
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="ml-4 sm:ml-6 lg:ml-10 max-w-[280px] sm:max-w-[400px] lg:max-w-[585px]">
              <div className="mb-6 lg:mb-8">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-5 leading-tight">
                  Sound That Erupts With Emotion
                </h2>
                <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
                  Precision-crafted by Astell&Kern, the Volcano IEM delivers
                  explosive detail, rich textures, and immersive depth —
                  engineered for true audiophiles.
                </p>
              </div>

              <button className="border border-white text-white font-medium px-4 py-2 sm:px-6 sm:py-3 lg:px-6 lg:py-4 rounded text-sm sm:text-base hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* In-Ear Monitors Product Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
        <div className="mb-5">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              In-Ear Monitors
            </h2>
            <button className="flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors text-sm sm:text-base">
              <span>View all</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-4 lg:flex lg:overflow-x-auto lg:pb-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full lg:w-[368px] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg mb-3">
                  {/* Placeholder for product image */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                  </div>

                  {/* Best Seller Badge */}
                  {product.bestSeller && (
                    <div className="absolute top-2 sm:top-4 left-0 bg-green-700 text-white px-2 py-0.5 text-xs sm:text-sm font-bold rounded-r-sm shadow-lg">
                      #1
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="px-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 group-hover:text-green-700 transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3">
                    {product.category}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-green-700">
                      {product.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Launches Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 md:mb-8">
            New Launches
          </h2>

          {/* New Launches Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {newLaunches.map((launch) => (
              <div
                key={launch.id}
                className="relative w-full h-[300px] sm:h-[350px] lg:h-[410px] rounded-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gray-800">
                  {/* Placeholder for product image */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="text-gray-400 text-xs sm:text-sm text-center px-2">
                      {launch.brand} Image
                    </div>
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

                {/* Content */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
                    {launch.brand}
                  </h3>
                  <p className="text-white/80 font-medium text-sm sm:text-base">
                    {launch.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured IEM's Section - Figma Design */}
      <div className="px-4 py-10">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-row gap-2 items-center justify-center w-full">
            <div
              className="flex-1 text-[#333333] text-[22px] font-bold text-left"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.22px",
              }}
            >
              Featured IEM&apos;s
            </div>
            <div className="h-8 w-[124px] rounded relative">
              <div className="absolute left-24 w-7 h-7 top-0.5">
                <img
                  alt="Arrow"
                  className="block max-w-none size-full"
                  src="http://localhost:3845/assets/6f405a2309e9a910d203f62f40d61e97cf07a4ed.svg"
                />
              </div>
              <div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#035f0f] text-[14px] font-medium text-center whitespace-nowrap"
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  letterSpacing: "-0.42px",
                }}
              >
                View all
              </div>
            </div>
          </div>

          {/* Product Cards - Horizontal Scroll */}
          <div className="flex flex-row gap-3 overflow-x-auto w-full">
            {/* Product Card 1 */}
            <div className="flex flex-row gap-3 flex-shrink-0 w-[396px] overflow-hidden">
              <div
                className="w-[168px] h-[168px] rounded overflow-hidden relative flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(133.397deg, rgba(0, 0, 0, 0.3) 3.8126%, rgba(0, 0, 0, 0) 22.538%), url('http://localhost:3845/assets/a9476d49fd51ae1e901184e0f32794c7fa65ea4e.png')`,
                  backgroundSize: "auto, cover",
                  backgroundPosition: "0% 0%, 50% 50%",
                }}
              >
                <button className="absolute left-1 top-[3px] w-8 h-8 flex items-center justify-center cursor-pointer">
                  <div className="w-4 h-[12.8px] relative">
                    <img
                      alt="Wishlist"
                      className="block max-w-none size-full"
                      src="http://localhost:3845/assets/bdc75abf70d20ced56d8dcff338b9e343c3d9cae.svg"
                    />
                  </div>
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-0.5 w-full">
                    <div
                      className="text-[#333333] text-[16px] font-semibold w-full"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                        lineHeight: "1.4",
                      }}
                    >
                      Jabar x Crinacle - ZERO: RED
                    </div>
                    <div
                      className="text-[12px] font-normal w-full"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.24px",
                        lineHeight: "1.4",
                        color: "rgba(51,51,51,0.7)",
                      }}
                    >
                      In-ear monitors
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-1 items-center">
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/a00ff572ef4858fbec6ec213c51117a6f783d6fa.svg"
                        />
                      </div>
                    </div>
                    <div
                      className="text-[#333333] text-[14px] font-medium whitespace-nowrap"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.28px",
                        lineHeight: "1.4",
                      }}
                    >
                      4.5
                    </div>
                  </div>
                  <div
                    className="text-[14px] font-normal text-left"
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                      lineHeight: "1.35",
                      color: "rgba(51,51,51,0.8)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    Expertly tuned dual dynamic driver IEMs with balanced,
                    engaging sound and bold RED design. Crafted for audiophiles,
                    by Crinacle.
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-[237px]">
                  <div className="flex flex-row gap-2 h-[18px] items-center">
                    <div
                      className="text-[#035f0f] text-[16px] font-bold whitespace-nowrap"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                        lineHeight: "1",
                      }}
                    >
                      ₹1,899
                    </div>
                    <div
                      className="text-[14px] font-normal whitespace-nowrap line-through"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.28px",
                        lineHeight: "1",
                        color: "rgba(51,51,51,0.6)",
                      }}
                    >
                      ₹ 2,099
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="flex flex-row gap-3 flex-shrink-0 w-[396px] overflow-hidden">
              <div
                className="w-[168px] h-[168px] rounded overflow-hidden relative flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(133.397deg, rgba(0, 0, 0, 0.3) 3.8126%, rgba(0, 0, 0, 0) 22.538%), url('http://localhost:3845/assets/a9476d49fd51ae1e901184e0f32794c7fa65ea4e.png')`,
                  backgroundSize: "auto, cover",
                  backgroundPosition: "0% 0%, 50% 50%",
                }}
              >
                <button className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center cursor-pointer">
                  <div className="w-4 h-[12.8px] relative">
                    <img
                      alt="Wishlist"
                      className="block max-w-none size-full"
                      src="http://localhost:3845/assets/bdc75abf70d20ced56d8dcff338b9e343c3d9cae.svg"
                    />
                  </div>
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-0.5 w-full">
                    <div
                      className="text-[#333333] text-[16px] font-semibold w-full"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                        lineHeight: "1.4",
                      }}
                    >
                      DITA Audio - Project M
                    </div>
                    <div
                      className="text-[12px] font-normal w-full"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.24px",
                        lineHeight: "1.4",
                        color: "rgba(51,51,51,0.7)",
                      }}
                    >
                      In-Ears with 1 DD + 1 BA drivers
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-1 items-center">
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/a00ff572ef4858fbec6ec213c51117a6f783d6fa.svg"
                        />
                      </div>
                    </div>
                    <div
                      className="text-[#333333] text-[14px] font-medium whitespace-nowrap"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.28px",
                        lineHeight: "1.4",
                      }}
                    >
                      4.5
                    </div>
                  </div>
                  <div
                    className="text-[14px] font-normal text-left"
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                      lineHeight: "1.35",
                      color: "rgba(51,51,51,0.8)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    1 Dynamic + 1 BA driver deliver a balanced, detailed sound
                    with rich lows and crisp highs.
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-[237px]">
                  <div className="flex flex-row gap-2 h-[18px] items-center">
                    <div
                      className="text-[#035f0f] text-[16px] font-bold whitespace-nowrap"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                        lineHeight: "1",
                      }}
                    >
                      ₹29,999
                    </div>
                    <div
                      className="text-[14px] font-normal whitespace-nowrap line-through"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.28px",
                        lineHeight: "1",
                        color: "rgba(51,51,51,0.6)",
                      }}
                    >
                      ₹34,999
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 3 - Same as Card 1 */}
            <div className="flex flex-row gap-3 flex-shrink-0 w-[396px] overflow-hidden">
              <div
                className="w-[168px] h-[168px] rounded overflow-hidden relative flex-shrink-0"
                style={{
                  backgroundImage: `linear-gradient(133.397deg, rgba(0, 0, 0, 0.3) 3.8126%, rgba(0, 0, 0, 0) 22.538%), url('http://localhost:3845/assets/a9476d49fd51ae1e901184e0f32794c7fa65ea4e.png')`,
                  backgroundSize: "auto, cover",
                  backgroundPosition: "0% 0%, 50% 50%",
                }}
              >
                <button className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center cursor-pointer">
                  <div className="w-4 h-[12.8px] relative">
                    <img
                      alt="Wishlist"
                      className="block max-w-none size-full"
                      src="http://localhost:3845/assets/bdc75abf70d20ced56d8dcff338b9e343c3d9cae.svg"
                    />
                  </div>
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-0.5 w-full">
                    <div
                      className="text-[#333333] text-[16px] font-semibold w-full"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                        lineHeight: "1.4",
                      }}
                    >
                      Jabar x Crinacle - ZERO: RED
                    </div>
                    <div
                      className="text-[12px] font-normal w-full"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.24px",
                        lineHeight: "1.4",
                        color: "rgba(51,51,51,0.7)",
                      }}
                    >
                      In-ear monitors
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-row gap-1 items-center">
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/7b08b5b34f54c7207afaff69a3563883d957f2f6.svg"
                        />
                      </div>
                      <div className="w-[11.871px] h-[11.303px]">
                        <img
                          alt="Star"
                          className="block max-w-none size-full"
                          src="http://localhost:3845/assets/a00ff572ef4858fbec6ec213c51117a6f783d6fa.svg"
                        />
                      </div>
                    </div>
                    <div
                      className="text-[#333333] text-[14px] font-medium whitespace-nowrap"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.28px",
                        lineHeight: "1.4",
                      }}
                    >
                      4.5
                    </div>
                  </div>
                  <div
                    className="text-[14px] font-normal text-left"
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                      lineHeight: "1.35",
                      color: "rgba(51,51,51,0.8)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    Expertly tuned dual dynamic driver IEMs with balanced,
                    engaging sound and bold RED design. Crafted for audiophiles,
                    by Crinacle.
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-[237px]">
                  <div className="flex flex-row gap-2 h-[18px] items-center">
                    <div
                      className="text-[#035f0f] text-[16px] font-bold whitespace-nowrap"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.32px",
                        lineHeight: "1",
                      }}
                    >
                      ₹1,899
                    </div>
                    <div
                      className="text-[14px] font-normal whitespace-nowrap line-through"
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        letterSpacing: "-0.28px",
                        lineHeight: "1",
                        color: "rgba(51,51,51,0.6)",
                      }}
                    >
                      ₹ 2,099
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-[rgba(0,0,0,0.1)] h-[3px] rounded-2xl w-full overflow-hidden">
            <div className="bg-[#035f0f] h-[3px] rounded-2xl w-[132px]" />
          </div>
        </div>
      </div>

      {/* Shop Other Categories Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10 bg-gray-50">
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 md:mb-8">
            Shop Other Categories
          </h2>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Headphones */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    Headphones
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Over-ear & On-ear
                  </p>
                </div>
              </div>
            </div>

            {/* Speakers */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 21V3l3.5 3.5L16 3v18l-3.5-3.5L9 21z"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    Speakers
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Bluetooth & Wired
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Cables */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h8m-8 0a4 4 0 01-4-4V6a2 2 0 012-2h8a2 2 0 012 2v2a4 4 0 01-4 4m-8 0v4a4 4 0 004 4h4a4 4 0 004-4v-4"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    Audio Cables
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Premium & Custom
                  </p>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    Accessories
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Cases, Tips & More
                  </p>
                </div>
              </div>
            </div>

            {/* DACs & Amps */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    DACs & Amps
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Digital Audio Converters
                  </p>
                </div>
              </div>
            </div>

            {/* Gaming Audio */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    Gaming Audio
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Gaming Headsets
                  </p>
                </div>
              </div>
            </div>

            {/* Wireless Earbuds */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    Wireless Earbuds
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    True Wireless
                  </p>
                </div>
              </div>
            </div>

            {/* Professional Audio */}
            <div className="group cursor-pointer">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-[200px] sm:h-[220px] lg:h-[250px]">
                {/* Category Image */}
                <div className="h-[130px] sm:h-[150px] lg:h-[180px] bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center overflow-hidden">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>

                {/* Category Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                    Professional Audio
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Studio & Monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* View All Categories Button */}
          <div className="text-center mt-6 sm:mt-8">
            <button className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base transition-colors duration-200">
              View All Categories
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Figma Design */}
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
                    src="http://localhost:3845/assets/e98a8dae2192440d94d19d7b62520b089c9de372.svg"
                  />
                </a>
                <a
                  href="#"
                  className="w-6 h-6 hover:opacity-80 transition-opacity"
                >
                  <img
                    alt="Instagram"
                    className="block max-w-none size-full"
                    src="http://localhost:3845/assets/e47b9cb86d0309a31691e0e528392e4f2729bc47.svg"
                  />
                </a>
                <a
                  href="#"
                  className="w-6 h-6 hover:opacity-80 transition-opacity"
                >
                  <img
                    alt="YouTube"
                    className="block max-w-none size-full"
                    src="http://localhost:3845/assets/825461a180df82e7cf78291fdfb621b265a46e0e.svg"
                  />
                </a>
              </div>

              {/* Copyright and Powered By */}
              <div className="flex gap-3 h-3.5 items-center justify-center">
                <div className="flex gap-2 items-center opacity-40">
                  <div className="w-3 h-3">
                    <img
                      alt=""
                      className="block max-w-none size-full"
                      src="http://localhost:3845/assets/0e3affb2a3ccfcc03fc03b9ef6ebb95d1a4e5828.svg"
                    />
                  </div>
                  <p
                    className="text-white text-[12px] font-normal whitespace-nowrap"
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                    }}
                  >
                    2025 Logoipsum All rights reserved
                  </p>
                </div>
                <div className="h-full w-0">
                  <img
                    alt=""
                    className="block max-w-none size-full"
                    src="http://localhost:3845/assets/24fd318b749ebbda0bc5922463a0c84464725f6e.svg"
                  />
                </div>
                <p
                  className="text-white text-[12px] font-normal opacity-40 text-center whitespace-nowrap"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                  }}
                >
                  Powered by Marketlube
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
