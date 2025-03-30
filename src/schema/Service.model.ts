import mongoose, { Schema } from "mongoose";
import {
  ServiceDuration,
  ServiceStatus,
  ServiceCategory,
  ServiceSize,
} from "../libs/enums/services.enum";

// Build type: Schema First vs Code First
const serviceSchema = new Schema(
  {
    serviceStatus: {
      type: String,
      enum: ServiceStatus,
      default: ServiceStatus.IN_PROGRESS,
    },

    serviceName: {
      type: String,
      required: true,
    },

    servicePrice: {
      type: Number,
      required: true,
    },

    serviceSize: {
      type: String,
      enum: ServiceSize,
      default: ServiceSize.STANDARD,
    },

    serviceCategory: {
      type: String,
      enum: ServiceCategory,
      default: ServiceCategory.HAIRCUT,
    },

    serviceDuration: {
      type: String,
      enum: ServiceDuration,
      default: ServiceDuration.STANDARD,
    },

    serviceDesc: {
      type: String,
      required: true,
    },

    serviceImages: {
      type: { String },
      default: [],
    },

    servicesViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // updatedAt, createdAt info
);

serviceSchema.index(
  {
    ServiceCategory: 1,
    ServiceSize: 1,
    ServiceDuration: 1,
  },
  { unique: true }
);

export default mongoose.model("Product", serviceSchema);
