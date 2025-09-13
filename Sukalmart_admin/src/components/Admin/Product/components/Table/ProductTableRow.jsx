import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../ConfirmationModal";
import { deleteProduct } from "../../../../../sevices/ProductApis";
import { toast } from "react-toastify";

const ProductTableRow = ({
  product,
  selectedProducts,
  setSelectedProducts,
  role,
  refetchProducts,
}) => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (id) => {
    if (role === "store") {
      navigate(`/store/product/addproduct`, { state: { productId: id } });
    } else {
      navigate(`/admin/product/addproduct`, { state: { productId: id } });
    }
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedProducts((prev) => [...prev, product._id]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== product._id));
    }
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      toast.success("Product deleted successfully");
      refetchProducts();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const getStatusBadge = () => {
    if (product?.isDraft) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Draft
        </span>
      );
    }
    
    if (product?.activeStatus) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Inactive
        </span>
      );
    }
  };

  // Get product image
  const getProductImage = () => {
    if (product?.images && product.images.length > 0) {
      return product.images[0];
    }
    if (product?.image) {
      return product.image;
    }
    return null;
  };

  const productImage = getProductImage();

  return (
    <>
      <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
        {/* Product Image and Name */}
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              {productImage ? (
                <img
                  className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                  src={productImage}
                  alt={product?.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 ${productImage ? 'hidden' : 'flex'}`}
              >
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <div className="flex items-center">
                {product?.priority && (
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2" title="Priority Product"></span>
                )}
                <div className="text-sm font-medium text-gray-900">
                  {product?.name?.length > 40
                    ? product?.name?.substring(0, 40) + "..."
                    : product?.name}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {product?.variants?.length || 0} variants
              </div>
            </div>
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-4">
          {getStatusBadge()}
        </td>

        {/* Category */}
        <td className="px-6 py-4 text-sm text-gray-900">
          {product?.category?.name || 'N/A'}
        </td>

        {/* Sub Category */}
        <td className="px-6 py-4 text-sm text-gray-900">
          {product?.subcategory?.name || 'N/A'}
        </td>

        {/* Last Updated */}
        <td className="px-6 py-4 text-sm text-gray-500">
          {new Date(product?.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </td>

        {/* Actions */}
        <td className="px-6 py-4 text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => handleEdit(product?._id)}
              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
              title="Edit Product"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => confirmDelete(product?._id)}
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
              title="Delete Product"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={() => handleDelete(productToDelete)}
      />
    </>
  );
};

export default ProductTableRow;
