export interface IUser {
  _id?: string;
  code: string | undefined;
  name: string;
  email: string;
  phone: string;
  password?: string;
  img?: Blob | string | null;
  isActive?: boolean;
  isDeleted?: boolean;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

