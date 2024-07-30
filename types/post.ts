import { ICommunity } from "./community";
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

export interface IComment {
  _id?: string;
  description: string;
  user_id: string | IUser;
  post_id: string | IPost;
  commentDate?: string;
  user_likes?: Array<string> | Array<IUser>;
  subComments?: Array<ISubComment> 
}

export interface ISubComment {
  _id?: string;
  description: string;
  user_id: string | IUser | null;
  comment_id: string | IComment;
  commentDate?: string;
  user_likes?: Array<string>;
}


