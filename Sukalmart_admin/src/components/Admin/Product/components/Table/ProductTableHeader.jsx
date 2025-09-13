import React, { useState, useEffect } from "react";

const ProductTableHeader = ({
  onSelectAll,
  selectedProducts,
  products,
  currentPage,
}) => {
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const currentProductIds = products.map((product) => product._id);
    const isAllCurrentSelected = currentProductIds.every((id) =>
      selectedProducts?.includes(id)
    );
    setIsAllSelected(isAllCurrentSelected);
  }, [selectedProducts, products]);

  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Product name
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Category
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Sub Category
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Last updated on
        </th>
        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default ProductTableHeader;
