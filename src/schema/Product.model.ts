import mongoose, { Schema } from "mongoose";
import {
  ProductStatus,
  ProductCategory,
  ProductTier,
  ProductTargetAudience,
} from "../libs/enums/products.enum";

const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.PAUSE,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    productTargetAudience: {
      type: String,
      enum: Object.values(ProductTargetAudience),
      default: ProductTargetAudience.UNISEX,
    },

    productStyle: {
      type: String,
      enum: Object.values(ProductTier),
      default: ProductTier.PREMIUM,
      required: true,
    },

    productCategory: {
      type: String,
      enum: Object.values(ProductCategory),
      default: ProductCategory.ALL,
      required: true,
    },

    productDuration: {
      type: String,
      trim: true,
    },

    productDesc: {
      type: String,
      trim: true,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productTier: {
      type: String,
      enum: Object.values(ProductTier),
      default: ProductTier.STANDARD,
    },

    productViews: {
      type: Number,
      default: 0,
      min: 0,
    },

    productVolumeMl: {
      type: Number,
      min: 0,
    },

    productQuantity: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true, autoIndex: true }
);

export default mongoose.model("Product", productSchema);
