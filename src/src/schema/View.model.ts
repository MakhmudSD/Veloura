import mongoose, { Schema } from "mongoose";
import { ViewGroup } from "../libs/enums/view.enum";

const viewSchema = new Schema(
  {
    viewGroup: {
      type: String,
      enum: Object.values(ViewGroup),
      required: true,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },

    viewRefId: {
      type: Schema.Types.ObjectId, // e.g., productId, memberId, etc.
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    collection: "views",
  }
);

export default mongoose.model("View", viewSchema);
