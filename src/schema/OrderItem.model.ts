import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    itemQuantity: {
      type: Number,
      required: true,
      min: 1,
    },

    itemPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
    collection: "orderItems",
  }
);

export default mongoose.model("OrderItem", orderItemSchema);
