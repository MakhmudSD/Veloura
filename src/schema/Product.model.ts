import mongoose, { Schema } from "mongoose";
import {
  ProductDuration,
  ProductStatus,
  ProductCategory,
  ProductSize,
} from "../libs/enums/products.enum";

// Build type: Schema First vs Code First
const productSchema = new Schema(
  {
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.IN_PROGRESS,
    },

    productName: {
      type: String,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    productSize: {
      type: String,
      enum: ProductSize,
      default: ProductSize.STANDARD,
    },

    productCategory: {
      type: String,
      enum: ProductCategory,
      default: ProductCategory.HAIRCUT,
    },

    productDuration: {
      type: String,
      enum: ProductDuration,
      default: ProductDuration.STANDARD,
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
  { timestamps: true } // updatedAt, createdAt info
);

productSchema.index(
  {
    Productategory: 1,
    ProductSize: 1,
    ProductDuration: 1,
  },
  { unique: true }
);

export default mongoose.model("Product", productSchema);
