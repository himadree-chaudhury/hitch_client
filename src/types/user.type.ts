import { UserRole } from "@/lib/auth-utils";

export interface IUser {
  id: string;
  email: string;
  provider: "CREDENTIALS" | "GOOGLE";
  role: UserRole;
  status: string;
  createdAt: string;
  updatedAt: string;
}