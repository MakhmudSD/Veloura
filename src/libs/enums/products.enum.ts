export enum ProductTier {
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  PACKAGE = "PACKAGE",
}

export enum ProductVolume {
  THIRTY_ML = 30,
  FIFTY_ML = 50,
  SEVENTY_FIVE_ML = 75,
  ONE_HUNDRED_ML = 100,
  ONE_FIFTY_ML = 150,
}

export enum ProductSize {
  SMALL = "SMALL",   // e.g. 30 ml
  MEDIUM = "MEDIUM", // e.g. 50 ml
  LARGE = "LARGE",   // e.g. 100 ml
  SET = "SET",       // gift sets or bundles
}

export enum ProductStatus {
  PAUSE = "PAUSE",
  PROCESS = "PROCESS",
<<<<<<< HEAD
  FINISH = "FINISH",
=======
  DELETE = "DELETE",
>>>>>>> 78b39a4 (feat: updates made)
}

export enum ProductTargetAudience {
  MEN = "MEN",
  WOMEN = "WOMEN",
  UNISEX = "UNISEX",
}

export enum ProductCategory {
  ALL = "ALL",
  PERFUME = "PERFUME",          // General perfumes (can include both Eau de Parfum and Eau de Toilette)
  EAU_DE_TOILETTE = "EAU_DE_TOILETTE",  // Lighter fragrance type
  GIFT_SET = "GIFT_SET",        // Gift sets or bundles
  ACCESSORY = "ACCESSORY",      // Perfume accessories like atomizers, cases, etc.
  BODY_PRODUCT = "BODY_PRODUCT" // Related scented body lotions, sprays, creams
}
