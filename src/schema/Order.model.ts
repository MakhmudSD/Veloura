import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "../libs/enums/orders.enum";

const orderSchema = new Schema(
  {
    orderTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    orderDelivery: {
      type: Number,
      required: true,
      min: 0,
    },

    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
<<<<<<< HEAD
      default: OrderStatus.PROCESS,
=======
      default: OrderStatus.PAUSE,
>>>>>>> 78b39a4 (feat: updates made)
      required: true,
      trim: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
  },
  { timestamps: true, collection: "orders" }
);

export default mongoose.model("Order", orderSchema);
