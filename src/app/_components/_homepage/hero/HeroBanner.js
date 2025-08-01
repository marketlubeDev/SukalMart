

import Image from "next/image";

export default function HeroBanner() {
  return (
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
      <div className="lg:hidden relative h-[500px] w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/banner1.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          </div>

        {/* Content positioned at bottom */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="flex flex-col gap-6">
            {/* Navigation Arrows - Above Heading */}
            <div className="flex justify-between items-center mb-2">
              <button className="text-[#333333] hover:text-[#565656] transition-colors">
                <img
                  src="/previousicon.svg"
                  alt="Previous"
                  className="w-2 h-4"
                />
              </button>
              <button className="text-[#333333] hover:text-[#565656] transition-colors">
                <img
                  src="/nexticon.svg"
                  alt="Next"
                  className="w-2 h-4"
                />
              </button>
        </div>

            {/* Text Content */}
            <div className="flex flex-col gap-3">
              <h1
                className="text-[24px] font-semibold text-[#333333] leading-tight"
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  letterSpacing: "-0.88px",
                }}
              >
                Silence the World, Hear Every Detail
              </h1>
              <p
                className="text-[12px] font-normal text-[#565656] leading-relaxed"
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  letterSpacing: "-0.36px",
                }}
              >
                Active Noise Cancellation, Superior Comfort, Unmatched Finish
                <br />
                Upgrade Your Audio Game Today
              </p>
            </div>

            {/* Shop Now Button */}
            <button className="bg-[#035f0f] text-white px-4 py-3 rounded flex items-center justify-center self-start">
              <span
                className="text-[12px] font-medium"
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  letterSpacing: "-0.36px",
                }}
              >
                Shop now
              </span>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1 w-[80px]">
            <div className="flex-1 h-0.5 bg-[rgba(51,51,51,0.2)] rounded-2xl relative overflow-hidden">
              <div className="absolute left-0 top-0 w-full h-[2px] bg-[rgba(3,95,15,0.7)] rounded-2xl" />
            </div>
            <div className="flex-1 h-0.5 bg-[rgba(51,51,51,0.2)] rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
