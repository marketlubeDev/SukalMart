"use client";
import { serviceBenefits } from "../../../../lib/data";

export default function ProductServiceBenefits() {
  // Filter to show only the three specific benefits
  const filteredBenefits = serviceBenefits.filter(benefit => 
    benefit.title === "Secured payment" || 
    benefit.title === "Delivery in 3-4 working days" || 
    benefit.title === "24x7 support"
  );

  return (
    <div className="py-8 mb-6 overflow-hidden px-6 sm:px-0">
      <div className="flex flex-row items-center justify-center gap-8 sm:gap-4 md:gap-20 lg:gap-8 xl:gap-6 max-w-full mx-auto">
        {filteredBenefits.map((benefit, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            {/* Service Benefit Item */}
            <div className="flex flex-col items-center gap-4 sm:gap-2 lg:gap-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-green-50 rounded-full">
                <img
                  src={benefit.icon}
                  alt={benefit.alt}
                  className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
                />
              </div>
              <span 
                className="text-center text-xs sm:text-sm md:text-base lg:text-base xl:text-lg font-medium"
                style={{
                  color: "#333",
                  lineHeight: "1.2",
                  letterSpacing: "-0.24px",
                  width: "clamp(60px, 12vw, 180px)",
                  maxWidth: "180px"
                }}
              >
                {benefit.title}
              </span>
            </div>

            {/* Divider - Show between items */}
            {index < filteredBenefits.length - 1 && (
              <div className="flex items-center justify-center mx-6 sm:mx-2 md:mx-10 lg:mx-5 xl:mx-2 flex-shrink-0">
                <div 
                  className="w-px bg-gray-300" 
                  style={{ 
                    height: "clamp(40px, 5vh, 70px)",
                    minHeight: "40px"
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 