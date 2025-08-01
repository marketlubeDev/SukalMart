import { categories } from "../../../../lib/data";

export default function CategorySection() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        alignSelf: "stretch",
        background: "#FFF"
      }}
    >
      <div
        className="text-[#333333] text-center"
        style={{
          fontFamily: '"Nunito Sans", sans-serif',
          fontSize: "clamp(20px, 5vw, 28px)",
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
        className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-6 w-full"
        style={{
          display: "grid",
          padding: "0",
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch"
        }}
      >
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center justify-start">
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full aspect-square">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-[#000000] font-medium text-center mt-2"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "clamp(10px, 2.5vw, 14px)",
                letterSpacing: "-0.28px",
              }}
            >
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
