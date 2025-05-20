import mongoose, { Schema } from "mongoose";
import {
  ProductStatus,
  ProductCategory,
  ProductTier,
} from "../libs/enums/products.enum";

const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: Object.values(ProductStatus),
      default: ProductStatus.PROCESS,
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

    productColor: {
      type: String,
      trim: true,
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
      default: ProductCategory.PERFUME,
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

    productViews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, autoIndex: true }
);

export default mongoose.model("Product", productSchema);
