import { IComment, ICommunity } from "./community";
import { IUser } from "./user";
interface ITypePost{
    name: string;
    code: string;
}
export interface IPost {
  _id?: string;
  title: string;
  description: string;
  comments?: Array<IComment>;
  community: string | ICommunity;
  user: string | IUser | null;
  user_likes?: Array<string>;
  images?: (File | Blob | string)[] | null;
  postDate?: string;
}
