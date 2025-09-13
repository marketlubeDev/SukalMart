import React from "react";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableRow from "./ProductTableRow";

const ProductTable = ({
  products,
  onSelectAll,
  selectedProducts,
  setSelectedProducts,
  role,
  selectedProductsCount,
  currentPage,
  refetchProducts,
}) => (
  <div className="overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <ProductTableHeader
        onSelectAll={onSelectAll}
        selectedProductsCount={selectedProductsCount}
        products={products}
        currentPage={currentPage}
        selectedProducts={selectedProducts}
      />
      <tbody className="bg-white divide-y divide-gray-200">
        {products?.map((product) => (
          <ProductTableRow
            key={product._id}
            product={product}
            onSelectAll={onSelectAll}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            role={role}
            refetchProducts={refetchProducts}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
