import { categories } from "../../../../lib/data";

export default function CategorySection() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[200px] py-6 md:py-8 lg:py-10"
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
        className="text-[#333333] text-center text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-normal tracking-[-0.28px]"
        style={{
          fontFamily: '"Nunito Sans", sans-serif',
          fontStyle: "normal",
          alignSelf: "stretch",
        }}
      >
        Shop by category
      </div>
      <div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-6 w-full"
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
              className="text-[#000000] font-medium text-center mt-2 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] font-medium leading-normal tracking-[-0.28px]"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
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
