import { categories } from "../../../../lib/data";

export default function CategorySection() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        display: "flex",
        padding: "80px 0 40px 0",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        alignSelf: "stretch",
        background: "#FFF",
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
          alignSelf: "stretch",
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start"
            style={{
              display: "flex",
              height: "274.593px",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flex: "1 0 0",
              aspectRatio: "233.33/274.59",
            }}
          >
            <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full h-full">
              <img
                src={category.image}
                alt={category.name}
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
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
