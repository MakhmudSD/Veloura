import mongoose, { Schema } from "mongoose";
import {
  ProductStatus,
  ProductCategory,
  ProductPackageSize,
  ProductStyle,
  // ProductDuration
} from "../libs/enums/products.enum";

// Build type: Schema First vs Code First
const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PROCESS,
    },

    productName: {
      type: String,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productPackageSize: {
      type: String,
      enum: ProductPackageSize,
      default: ProductPackageSize.MEDIUM,
    },

    productStyle: {
      type: String,
      enum: ProductStyle,
      default: ProductStyle.PREMIUM,
    },

    productCategory: {
      type: String,
      enum: ProductCategory,
      default: ProductCategory.HAIRCUT,
    },

    productDuration: {
      type: String,
    },

    productDesc: {
      type: String,
    },

    productImages: {
      type: [ String ],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, autoIndex: true  } // updatedAt, createdAt info
);

productSchema.index(
  {
    productCategory: 1,
    productPackageSize: 1,
  },
  { unique: true }
);

export default mongoose.model("Product", productSchema);
