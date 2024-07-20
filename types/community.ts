import { ICategory } from "./Categories";
import { IPost } from "./post";
import { IUser } from "./user";

export interface ICommunity {
  _id?: string;
  name: string;
  owner_id: IUser;
  description: string;
  img: string;
  banner: string;
  members_id?: Array<string> | Array<IUser>;
  admins_id?: Array<string> | Array<IUser>;
  isDeleted: boolean;
  isActive: boolean;
  created_at?: string;
  bannedUsers_id: Array<string>;
  communityCategory_id: Array<string> | Array<ICategory>;
  rank?: number;
}

