import mongoose, { ObjectId } from "mongoose";
import {
  ProductCategory,
  ProductTier,
  ProductStatus,
  ProductTargetAudience,
  ProductVolume,
} from "../enums/products.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productTier: ProductTier;
  productQuantity?: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productFragranceNotes?: string[];
  productVolumeMl?: number;
  productTargetAudience?: ProductTargetAudience;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCategory?: ProductCategory;
  productVolume?: ProductVolume;
  productGender?: ProductTargetAudience;
  search?: string;
}

export interface ProductInput {
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  productTier?: ProductTier;
  productQuantity?: number;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productFragranceNotes?: string[];
  productVolumeMl?: number;
  productTargetAudience?: ProductTargetAudience;
}

export interface ProductUpdateInput {
  _id: ObjectId;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory;
  productName?: string;
  productPrice?: number;
  productTier?: ProductTier;
  productQuantity?: number;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
  productFragranceNotes?: string[];
  productVolumeMl?: number;
  productTargetAudience?: ProductTargetAudience;
}
