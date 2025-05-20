import mongoose, { ObjectId } from "mongoose";
import {
  ProductCategory,
  ProductTier,
  ProductStatus,
} from "../enums/products.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productLongevity?: number; // renamed from duration for clarity
  productTier: ProductTier; // renamed for clarity
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productFragranceNotes?: string[]; // e.g., ["floral", "citrus", "woody"]
  productVolumeMl?: number; // size in milliliters
  productGender?: "male" | "female" | "unisex";
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCategory?: ProductCategory;
  search?: string;
}

export interface ProductInput {
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productLongevity?: number;
  productTier?: ProductTier;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productFragranceNotes?: string[]; // e.g., ["floral", "citrus", "woody"]
  productVolumeMl?: number; // size in milliliters
  productGender?: "male" | "female" | "unisex";
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory; // fixed typo here
  productName?: string;
  productPrice?: number;
  productLongevity?: number;
  productTier?: ProductTier;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
  productFragranceNotes?: string[]; // e.g., ["floral", "citrus", "woody"]
  productVolumeMl?: number; // size in milliliters
  productGender?: "male" | "female" | "unisex";
}
