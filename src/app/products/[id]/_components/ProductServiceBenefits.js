import { serviceBenefits } from "../../../../lib/data";

export default function ProductServiceBenefits() {
  return (
    <div className="py-6 mb-6">
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
        {serviceBenefits.map((benefit, index) => (
          <div key={index} className="flex items-center">
            {/* Service Benefit Item */}
            <div className="flex flex-col items-center gap-2">
              <img
                src={benefit.icon}
                alt={benefit.alt}
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <span 
                className="text-center text-xs md:text-sm"
                style={{
                  color: "#333",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.24px",
                  width: "clamp(60px, 15vw, 140px)"
                }}
              >
                {benefit.title}
              </span>
            </div>

            {/* Divider - Show between items */}
            {index < serviceBenefits.length - 1 && (
              <div className="flex items-center justify-center mx-2 sm:mx-3 md:mx-4">
                <div className="w-px bg-gray-300" style={{ height: "60px" }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 