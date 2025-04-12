import mongoose, { ObjectId } from "mongoose";

import {
  ProductCategory,
  ProductStyle,
  ProductStatus,
} from "../enums/products.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productDuration: number;
  productStyle: ProductStyle;
  productColor: string;
  productDesc?: string;
  productImages: string[];
  productViews: number;
}

export interface ProductInput {
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productDuration: number;
  productStyle?: ProductStyle;
  productColor?: string;
  productDesc?: string;
  productImages: string[];
  productViews: number;
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productCollection?: ProductCategory;
  productName?: string;
  productPrice?: number;
  productDuration: number;
  productStyle?: ProductStyle;
  productColor?: string;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}
