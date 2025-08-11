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
      className="flex flex-col items-center justify-center w-full overflow-hidden px-2 sm:px-4 md:px-6 lg:px-8 xl:px-[200px] py-6 md:py-8 lg:py-10"
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
      {/* Mobile: custom centering for second row if not full */}
      <div className="block sm:hidden w-full">
        {getRows().map((row, rowIdx, arr) => (
          <div
            key={rowIdx}
            className="flex w-full mb-2 last:mb-0"
            style={{
              justifyContent:
                row.length < mobileColumns && rowIdx === arr.length - 1
                  ? "center"
                  : "flex-start",
              gap: "8px",
            }}
          >
            {row.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start flex-1 min-w-0 max-w-[120px]"
                style={{
                  // If last row and not full, don't stretch
                  flex:
                    row.length < mobileColumns && rowIdx === arr.length - 1
                      ? "0 0 33.33%"
                      : "1 1 0%",
                }}
              >
                <div className="bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded w-full aspect-square">
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
      {/* Desktop/tablet: normal grid */}
      <div
        className="
          hidden
          sm:grid
          sm:grid-cols-4
          md:grid-cols-6
          lg:grid-cols-6
          xl:grid-cols-6
          sm:gap-3
          md:gap-4
          lg:gap-3
          xl:gap-6
          w-full
          justify-items-center
        "
        style={{
          display: "grid",
          padding: "0",
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
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
            <div className="text-[#000000] font-medium text-center mt-2 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[14px] font-medium leading-normal tracking-[-0.28px]">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
