import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/members.enum";

const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },

    memberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
      match: /^[0-9]{9,15}$/,
    },

    memberPassword: {
      type: String,
      select: false,
      required: false,
    },

    memberAddress: {
      type: String,
    },

    memberImage: {
      type: String,
    },

    memberDesc: {
      type: String,
    },

    memberPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
