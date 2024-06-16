export interface IUser {
  code: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  img?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  role?: string;
  created_at?: string;
  updated_at?: string;
}
