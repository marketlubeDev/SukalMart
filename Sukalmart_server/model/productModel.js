const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
    activeStatus: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    label: { type: Schema.Types.ObjectId, ref: "Label" },
    isDeleted: { type: Boolean, default: false },
    offer: { type: Schema.Types.ObjectId, ref: "Offer" },
    priority: { type: Number, enum: [0, 1], default: 0 },
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    // Additional merchandising fields for detailed product page
    about: { type: String },
    specifications: [{ type: String }],
    featureImages: [{ type: String }],
    // Multiple features sections (preferred)
    featuresSections: [
      new Schema(
        {
          layout: {
            type: String,
            enum: ["banner", "split"],
            default: "banner",
          },
          imagePosition: {
            type: String,
            enum: ["left", "right"],
            default: "right",
          },
          mediaType: {
            type: String,
            enum: ["image", "video"],
            default: "image",
          },
          mediaUrl: { type: String },
          title: { type: String },
          description: { type: String },
        },
        { _id: false }
      ),
    ],
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
