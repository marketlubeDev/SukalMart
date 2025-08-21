"use client";
import { useRouter } from "next/navigation";

export default function NewLaunchesSection() {
  const router = useRouter();

  // New launches products data with proper IDs for navigation
  const newLaunchesProducts = [
    {
      id: "13",
      name: "THE ANSWER Super Shampoo",
      description: "Hydrolyzed Keratin & Ceramide Formula",
      image: "/newlaunch1.jpg",
    },
    {
      id: "14",
      name: "NEWEST Onion Protein Shampoo",
      description: "Almond & Onion Ultra Nourishing",
      image: "/newlaunch2.jpg",
    },
    {
      id: "15",
      name: "FLAKES Anti-Dandruff Shampoo",
      description: "Professional Anti-Dandruff Formula",
      image: "/newlaunch3.jpg",
    },
    {
      id: "16",
      name: "REDKEN Anti-Dandruff Shampoo",
      description: "Professional Hair Care Formula",
      image: "/newlaunch4.jpeg",
    },
  ];

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="py-8 container mx-auto px-4 xl:px-10">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-[28px] font-bold text-gray-800">
            New Launches
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {newLaunchesProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-3 sm:p-4 bg-gray-900 text-white">
                <h3 className="text-xs sm:text-sm font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-300">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 