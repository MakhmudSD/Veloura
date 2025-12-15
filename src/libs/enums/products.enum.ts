import { registerEnumType } from '@nestjs/graphql';

export enum ProductTier {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  PACKAGE = "PACKAGE",
}

registerEnumType(ProductTier, {
  name: 'ProductTier',
});

export enum ProductVolume {
  THIRTY_ML = 30,
  FIFTY_ML = 50,
  SEVENTY_FIVE_ML = 75,
  ONE_HUNDRED_ML = 100,
  ONE_FIFTY_ML = 150,
}

registerEnumType(ProductVolume, {
  name: 'ProductVolume',
});

export enum ProductStatus {
  PAUSE = "PAUSE",
  PROCESS = "PROCESS",
  DELETE = "DELETE",
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});

export enum ProductTargetAudience {
  MEN = "MEN",
  WOMEN = "WOMEN",
  UNISEX = "UNISEX",
}

registerEnumType(ProductTargetAudience, {
  name: 'ProductTargetAudience',
});

export enum ProductCategory {
  SUPPLEMENTS = "SUPPLEMENTS",
  VITAMINS = "VITAMINS",
  ORGANIC_FOOD = "ORGANIC_FOOD",
  FITNESS_EQUIPMENT = "FITNESS_EQUIPMENT",
  SKINCARE = "SKINCARE",
  HERBAL_REMEDIES = "HERBAL_REMEDIES",
  PROTEIN_POWDER = "PROTEIN_POWDER",
  SUPERFOODS = "SUPERFOODS",
  WELLNESS_ACCESSORIES = "WELLNESS_ACCESSORIES",
  HEALTH_BOOKS = "HEALTH_BOOKS",
  LIQUIDS = "LIQUIDS",
  GINSENG = "GINSENG",
  DRUGS = "DRUGS",
  COSMETICS = "COSMETICS",
}

registerEnumType(ProductCategory, {
  name: 'ProductCategory',
});
