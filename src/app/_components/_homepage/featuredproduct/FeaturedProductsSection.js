import FeaturedProductCard from "./FeaturedProductCard";
import { featuredProducts } from "../../../../lib/data";

export default function FeaturedProductsSection() {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10 overflow-hidden">
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
          <button
            className="flex items-center gap-2 font-medium transition-colors"
            style={{ color: "#035F0F" }}
          >
            <span>View all</span>
            <img src="/nextarrow.svg" alt="Next arrow" className="w-7 h-7" />
          </button>
        </div>

        {/* Product Cards - 50:50 Layout */}
        <div className="flex flex-row gap-6 w-full">
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
