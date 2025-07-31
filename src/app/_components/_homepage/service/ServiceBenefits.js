import { serviceBenefits } from "../../../../lib/data";

export default function ServiceBenefits() {
  const benefits = serviceBenefits;

  return (
    <div className="py-12" style={{ background: "rgba(3, 95, 15, 0.05)" }}>
      <div className="px-8 sm:px-12 md:px-16 lg:px-[300px]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {benefits.map((benefit, index) => (
            <div key={index}>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={benefit.icon}
                  alt={benefit.alt}
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
                    width: "180px",
                  }}
                >
                  {benefit.title}
                </span>
              </div>

              {/* Divider - Show only between items on desktop */}
              {index < benefits.length - 1 && (
                <div
                  className="hidden sm:block"
                  style={{ width: "0", height: "120px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2"
                    height="120"
                    viewBox="0 0 2 120"
                    fill="none"
                  >
                    <path
                      d="M1 0.59375V120.594"
                      stroke="rgba(0, 0, 0, 0.16)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
