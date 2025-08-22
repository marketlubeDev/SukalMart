"use client";

import { useState } from "react";
import { Modal, Rate, Input, Button } from "antd";

export default function ReviewsSection({ product, selectedImage }) {
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const showReviewModal = () => {
    setIsReviewModalVisible(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleReviewModalCancel = () => {
    setIsReviewModalVisible(false);
    setRating(0);
    setReviewText("");
    document.body.style.overflow = 'unset'; // Restore background scrolling
  };

  const handleReviewSubmit = () => {
    // Here you would typically send the review to your backend
    console.log("Review submitted:", { rating, reviewText, productId: product.id });
    // You can add API call here to save the review
    setIsReviewModalVisible(false);
    setRating(0);
    setReviewText("");
    document.body.style.overflow = 'unset'; // Restore background scrolling
  };

  const clearRating = () => {
    setRating(0);
  };

  return (
    <>
      <div className="my-12 w-full mx-auto md:px-0">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left: Ratings Summary */}
          <div className="md:w-1/3 w-full flex flex-col items-start md:items-start sticky-left">
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#333" }}
            >
              Reviews & Rating
            </h3>
            <div className="flex items-center mb-2">
              <span
                className="text-3xl font-bold mr-2"
                style={{ color: "#035F0F" }}
              >
                4.0
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={star <= 4 ? "/filledstar.svg" : "/star.svg"}
                    alt="star"
                    className="w-5 h-5"
                  />
                ))}
              </div>
            </div>
            <span className="text-gray-600 mb-4 text-sm">Based on 181 reviews</span>
            {/* Ratings Bar */}
            <div className="w-full max-w-xs space-y-1 mb-4 md:max-w-none">
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 w-4">{star}</span>
                  <img src="/filledstar.svg" alt="star" className="w-3 h-3" />
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                    <div
                      className="h-1.5 bg-[#035F0F] rounded-full"
                      style={{
                        width: ["60%", "20%", "10%", "5%", "5%"][idx],
                      }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-500 ml-2">
                    {[73, 38, 52, 13, 105][idx]}
                  </span>
                </div>
              ))}
            </div>
            <button 
              onClick={showReviewModal}
              className="mt-2 px-4 py-2 border border-[#035F0F] text-[#035F0F] rounded font-medium hover:bg-[#035F0F] hover:text-white transition text-sm cursor-pointer"
            >
              Rate Product
            </button>
          </div>

          {/* Right: Review Images & Customer Reviews */}
          <div className="md:w-2/3 w-full">
            {/* Review Images */}
            <div className="mb-4">
              <div>
                <h5
                  className="mb-2"
                  style={{
                    color: "#333",
                    leadingTrim: "both",
                    textEdge: "cap",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Review images
                </h5>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <img
                      key={idx}
                      src={product.images && product.images.length > 0 ? product.images[selectedImage] : product.image}
                      alt="Selected product"
                      className="w-16 h-16 rounded object-cover border border-gray-200"
                    />
                  ))}
                </div>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1.5px solid #E5E7EB",
                    backgroundColor: "#E5E7EB",
                    height: "1.5px",
                    margin: "16px 0",
                  }}
                />
              </div>
            </div>
            {/* Customer Reviews */}
            <div>
              <h4
                className="mb-3"
                style={{
                  color: "#333",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.2px",
                }}
              >
                Customer Reviews
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#17632D] text-white text-xs font-semibold">
                  <span className="mr-0.5">5</span>
                  <img
                    src="/whitestar.svg"
                    alt="5 star"
                    className="w-3 h-3 inline"
                  />
                </span>
                <span className="text-gray-800 text-sm font-medium">
                  Good Sound, But Not For Bass Lovers
                </span>
                <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <img
                      src={product.images && product.images[selectedImage] ? product.images[selectedImage] : product.image}
                      alt="Selected product review 1"
                      className="w-12 h-12 rounded object-cover border border-gray-200"
                    />
                    <img
                      src={product.images && product.images[0] ? product.images[0] : product.image}
                      alt="Selected product review 2"
                      className="w-12 h-12 rounded object-cover border border-gray-200"
                    />
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    I bought these after reading all the hype. The sound is
                    clear, but the bass was too light for my taste. I listen
                    mostly to hip-hop and pop, and it didn't give me that
                    satisfying thump. However, for podcasts or instrumental
                    music, it's really clean.
                  </p>
                  <span className="block text-xs text-gray-500 mt-1">
                    -Sample user
                  </span>
                </div>
              </div>
              <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#17632D] text-white text-xs font-semibold">
                  <span className="mr-0.5">4</span>
                  <img
                    src="/whitestar.svg"
                    alt="5 star"
                    className="w-3 h-3 inline"
                  />
                </span>
                <span className="text-gray-800 text-sm font-medium">
                  Good Sound, But Not For Bass Lovers
                </span>
                <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-700 mt-2">
                    I bought these after reading all the hype. The sound is
                    clear, but the bass was too light for my taste. I listen
                    mostly to hip-hop and pop, and it didn't give me that
                    satisfying thump. However, for podcasts or instrumental
                    music, it's really clean.
                  </p>
                  <span className="block text-xs text-gray-500 mt-1">
                    -Sample user
                  </span>
                </div>
              </div>
              <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#F9A825] text-white text-xs font-semibold">
                  <span className="mr-0.5">3</span>
                  <img
                    src="/whitestar.svg"
                    alt="5 star"
                    className="w-3 h-3 inline"
                  />
                </span>
                <span className="text-gray-800 text-sm font-medium">
                  Good Sound, But Not For Bass Lovers
                </span>
                <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
              </div>

              <div className="flex items-start gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <img
                      src={product?.images?.[selectedImage] || product?.image || "/shop2.png"}
                      alt="Selected product image"
                      className="w-12 h-12 rounded object-cover border border-gray-200"
                    />
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    I bought these after reading all the hype. The sound is
                    clear, but the bass was too light for my taste. I listen
                    mostly to hip-hop and pop, and it didn't give me that
                    satisfying thump. However, for podcasts or instrumental
                    music, it's really clean.
                  </p>
                  <span className="block text-xs text-gray-500 mt-1">
                    -Sample user
                  </span>
                </div>
              </div>

              <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#F57C00] text-white text-xs font-semibold">
                  <span className="mr-0.5">2</span>
                  <img
                    src="/whitestar.svg"
                    alt="5 star"
                    className="w-3 h-3 inline"
                  />
                </span>
                <span className="text-gray-800 text-sm font-medium">
                  Good Sound, But Not For Bass Lovers
                </span>
                <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
              </div>

              <div className="flex items-start gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-700 mt-2">
                    I bought these after reading all the hype. The sound is
                    clear, but the bass was too light for my taste. I listen
                    mostly to hip-hop and pop, and it didn't give me that
                    satisfying thump. However, for podcasts or instrumental
                    music, it's really clean.
                  </p>
                  <span className="block text-xs text-gray-500 mt-1">
                    -Sample user
                  </span>
                </div>
              </div>
              <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#B71C1C] text-white text-xs font-semibold">
                  <span className="mr-0.5">1</span>
                  <img
                    src="/whitestar.svg"
                    alt="5 star"
                    className="w-3 h-3 inline"
                  />
                </span>
                <span className="text-gray-800 text-sm font-medium">
                  Good Sound, But Not For Bass Lovers
                </span>
                <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
              </div>

              <div className="flex items-start gap-2 mt-2">
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-700 mt-2">
                    I bought these after reading all the hype. The sound is
                    clear, but the bass was too light for my taste. I listen
                    mostly to hip-hop and pop, and it didn't give me that
                    satisfying thump. However, for podcasts or instrumental
                    music, it's really clean.
                  </p>
                  <span className="block text-xs text-gray-500 mt-1">
                    -Sample user
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        title="Add Review"
        open={isReviewModalVisible}
        onCancel={handleReviewModalCancel}
        footer={null}
        width={500}
        centered
      >
        <div className="space-y-6">
          {/* Rating Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How was the item?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Let us know your experience with the item in a few words!
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors duration-200 ${
                      star <= rating 
                        ? 'text-[#EF9C16]' 
                        : 'text-transparent'
                    }`}
                    style={{
                      WebkitTextStroke: star <= rating ? 'none' : '1px #EF9C16',
                      cursor: 'pointer'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                onClick={clearRating}
                className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Review Text Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Write your review <span className="text-red-500">*</span>
            </h3>
            <Input.TextArea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us what you think.."
              rows={4}
              style={{ 
                resize: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.01)'
              }}
            />
          </div>

          {/* Border Separator */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Submit Button */}
          <div className="w-full">
            <Button
              type="primary"
              onClick={handleReviewSubmit}
              disabled={!rating || !reviewText.trim()}
              style={{
                backgroundColor: '#035F0F',
                borderColor: '#035F0F',
                height: '40px',
                width: '100%',
                color: '#ffffff',
                fontWeight: '600',
              }}
            >
              Rate Product
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
       
        
        /* Custom star rating styles */
        .custom-rate .ant-rate-star {
          color: #EF9C16 !important;
        }
        
        .custom-rate .ant-rate-star-first,
        .custom-rate .ant-rate-star-second {
          color: #EF9C16 !important;
        }
        
        .custom-rate .ant-rate-star-half .ant-rate-star-first,
        .custom-rate .ant-rate-star-half .ant-rate-star-second {
          color: #EF9C16 !important;
        }
        
        .custom-rate .ant-rate-star-full .ant-rate-star-first,
        .custom-rate .ant-rate-star-full .ant-rate-star-second {
          color: #EF9C16 !important;
        }
        
        /* Remove blue border on textarea focus/hover */
        .ant-input:focus,
        .ant-input:hover,
        .ant-input-focused,
        .ant-input-affix-wrapper:focus,
        .ant-input-affix-wrapper:hover,
        .ant-input-affix-wrapper-focused {
          border-color: #d9d9d9 !important;
          box-shadow: none !important;
        }
        
        .ant-input-textarea:focus,
        .ant-input-textarea:hover,
        .ant-input-textarea-focused,
        .ant-input-textarea .ant-input:focus,
        .ant-input-textarea .ant-input:hover,
        .ant-input-textarea .ant-input-focused {
          border-color: #d9d9d9 !important;
          box-shadow: none !important;
        }
        
        /* Override Ant Design's default focus styles */
        .ant-input:focus,
        .ant-input-focused {
          border: 1px solid #d9d9d9 !important;
          box-shadow: none !important;
        }
        
        .ant-input-textarea .ant-input:focus,
        .ant-input-textarea .ant-input-focused {
          border: 1px solid #d9d9d9 !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
} 