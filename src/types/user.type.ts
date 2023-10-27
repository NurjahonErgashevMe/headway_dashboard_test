export type UserTypes = {
  id: string;
  phone: string;
  otp: string;
  first_name: string | null;
  last_name: string | null;
  role: number;
  is_deleted: boolean;
  created_at: string;
  status: number;
  email: string;
};

export type TUserSignup = {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type TUserConfirmOtp = {
  email : string;
  otp : string;
}