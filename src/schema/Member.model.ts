import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enums";

const memberscheme = new Schema(
  {
    MemberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },

    MemberStatus: {
      type: String,
      enum: MemberStatus,
      default: MemberStatus.ACTIVE,
    },

    MemberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    MemberPhone: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    MemberPassword: {
      type: String,
      select: false,
      required: false,
    },

    MemberAddress: {
      type: String,
    },

    MemberImages: {
      type: String,
    },

    MemberDesc: {
      type: String,
    },

    MemberPoints: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberscheme);
