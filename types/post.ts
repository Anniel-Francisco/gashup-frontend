export interface IPost {
  title: string;
  description: string;
  community_id: string | null;
  user_id: string | null;
  user_likes?: Array<string>;
  images?: (File | Blob)[];
}
