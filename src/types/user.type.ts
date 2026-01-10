import { UserRole } from "@/lib/auth-utils";

export interface IUser {
  id: string;
  email: string;
  provider: "CREDENTIALS" | "GOOGLE";
  role: UserRole;
  status: "ACTIVE" | "BLOCKED" | "BANNED";
  verification: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  data: IUser[];
}