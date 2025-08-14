"use client";
export default function NewLaunchesSection() {
  // New launches products data
  const newLaunchesProducts = [
    {
      id: 1,
      name: "FatFrequency",
      description: "Starting @ ₹150,509",
      image: "/newlaunch1.jpg",
    },
    {
      id: 2,
      name: "64 Audio",
      description: "Starting @ ₹1,03,200",
      image: "/newlaunch2.jpg",
    },
    {
      id: 3,
      name: "Noble Audio - Kublai Khan",
      description: "Limited Edition - @ ₹1,79,999",
      image: "/newlaunch3.jpg",
    },
    {
      id: 4,
      name: "Dita Audio - Project M",
      description: "In-Ears With 1 DD + 1 BA Drivers",
      image: "/newlaunch4.jpeg",
    },
  ];

  return (
    <div className="py-8 container mx-auto px-4 sm:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            New Launches
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {newLaunchesProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden">
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