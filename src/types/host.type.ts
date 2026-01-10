export interface Host {
  id: string;
  userId: string;
  hostStatus: "PENDING" | "APPROVED" | "REJECTED";
  rating: number;
  ratingCount: number;
  createdAt: string;
  user?: {
    email: string;
    userProfile?: {
      firstName: string;
      lastName: string;
    };
  };
}

export interface HostsResponse {
  success: boolean;
  data: Host[];
}
