import mongoose, { Schema } from "mongoose";
import {
  ProductStatus,
  ProductCategory,
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

    productColor: {
      type: String,
    },


    productStyle: {
      type: String,
      enum: ProductStyle,
      default: ProductStyle.PREMIUM,
      required: true,
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

export default mongoose.model("Product", productSchema);
