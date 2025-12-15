import { MemberStatus, MemberType } from "../enums/members.enum";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberEmail?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberEmail?: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface MemberUpdateInput {
  _id: string;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberEmail?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}
