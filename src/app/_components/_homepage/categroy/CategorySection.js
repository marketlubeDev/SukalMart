import { categories } from "../../../../lib/data";

export default function CategorySection() {
  // Calculate if we are on mobile (3 columns) and if there is a second row
  // This is a presentational component, so we do this in render logic
  const mobileColumns = 3;
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 640 : false;

  // For SSR/SSG, fallback to always render as mobile for initial paint
  const getRows = () => {
    const rows = [];
    for (let i = 0; i < categories.length; i += mobileColumns) {
      rows.push(categories.slice(i, i + mobileColumns));
    }
    return rows;
  };

  // We'll use a media query to only apply the centering logic on mobile
  // On mobile, if the last row has less than 3 items, center them
  return (
    <div
      className="flex flex-col items-center justify-center w-full overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[200px] py-6 md:py-8 lg:py-10 border-b border-black/10 max-w-6xl mx-auto"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        alignSelf: "stretch",
        background: "#FFF",
      }}
    >
      <div
        className="text-[#333333] text-center text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-normal tracking-[-0.28px]"
        style={{
          fontStyle: "normal",
          alignSelf: "stretch",
        }}
      >
        Shop by category
      </div>
      {/* Mobile: custom centering for all rows */}
      <div className="block sm:hidden w-full">
        {getRows().map((row, rowIdx, arr) => (
          <div
            key={rowIdx}
            className="flex w-full mb-2 last:mb-0"
            style={{
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {row.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start"
                style={{
                  flex: "0 0 33.33%",
                  maxWidth: "120px",
                }}
              >
                <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[#000000] font-medium text-center mt-2 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] font-medium leading-normal tracking-[-0.28px]">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Desktop/tablet: flex layout - single line */}
      <div
        className="
          hidden
          sm:flex
          sm:flex-nowrap
          sm:justify-center
          sm:items-center
          sm:gap-3
          md:gap-4
          lg:gap-3
          xl:gap-6
          w-full
        "
        style={{
          display: "flex",
          padding: "0",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center justify-start">
            <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px]">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[#000000] font-medium text-center mt-2 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] font-medium leading-normal tracking-[-0.28px]">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
