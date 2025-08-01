import ProductCard from "../ProductCard";
import { bestSellers } from "../../../../lib/data";
import Image from "next/image";

export default function BestSellersSection() {
  return (
    <div className="bg-white py-16">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-[24px] font-bold"
            style={{
              color: "#333",
              fontFamily: "'Nunito Sans', sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "-0.24px",
            }}
          >
            Best Sellers
          </h2>
          <button
            className="flex items-center gap-2 font-medium transition-colors"
            style={{ color: "#035F0F" }}
          >
            <span>View all</span>
            <Image
              src="/nextarrow.svg"
              alt="Next arrow"
              className="w-7 h-7"
              width={28}
              height={28}
            />
          </button>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              showBadge={!!product.badge}
              badgeText={product.badge}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
