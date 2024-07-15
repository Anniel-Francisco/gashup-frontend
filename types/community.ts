import { IUser } from "./user";

export interface ICommunity {
  _id?: string;
  name: string;
  owner_id?: string;
  description: string;
  img: string;
  banner: string;
  members_id?: Array<string> | Array<IUser>;
  admins_id?: Array<string>;
  isDeleted: boolean;
  isActive: boolean;
  created_at?: string;
  bannedUsers_id: Array<string>;
  communityCategory_id: Array<string>;
}
