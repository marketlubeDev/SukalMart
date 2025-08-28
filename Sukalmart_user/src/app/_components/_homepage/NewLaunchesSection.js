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
    {
      id: "17",
      name: "KERASTASE Repair Shampoo",
      description: "Fiber-strengthening care for damaged hair",
      image: "/newlaunch1.jpg",
    },
    {
      id: "18",
      name: "MOROCCANOIL Hydrating Shampoo",
      description: "Argan oil infused moisture balance",
      image: "/newlaunch2.jpg",
    },
  ];

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="py-8 container mx-auto px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-10">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-[28px] font-bold text-gray-800">
            New Launches
          </h2>
        </div>

        {/* Products Grid - Mobile: horizontal scroll with 6 cards in a row */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-primary">
            {newLaunchesProducts.map((product) => (
              <div key={product.id} className="flex-none w-1/3">
                <div 
                  className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-[260px] border border-gray-200"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Product Image with overlay and text */}
                  <div className="relative w-full h-[200px] rounded-t-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="text-xs font-semibold mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-white/90 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer to keep consistent overall height */}
                  <div className="flex-1 bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid - Desktop/Tablet */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {newLaunchesProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 w-full h-[260px] flex flex-col border border-gray-200"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image with overlay and text */}
              <div className="relative w-full h-[200px] rounded-t-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-xs font-semibold mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-white/90 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 