import { IUser } from "./user";

export interface IPost {
  _id?: string;
  title: string;
  description: string;
  community: string | null;
  user: string | IUser | null;
  user_likes?: Array<string>;
  images?: (File | Blob | string)[] | null;
  postDate?: string;
}
