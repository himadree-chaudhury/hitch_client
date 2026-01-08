export interface EventCategory {
  eventCategory: {
    name: string;
    id: string;
  };
}

export interface UserProfile {
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}

export interface EventHost {
  user: {
    userProfile: UserProfile;
  };
}

export interface EventData {
  id: string;
  title: string;
  slug: string;
  description: string;
  startTime: string;
  endTime: string;
  city: string;
  country: string;
  imageUrl: string;
  joiningFee: number;
  currency: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
  eventCategories: EventCategory[];
  host: EventHost;
}

export interface ApiResponse {
  success: boolean;
  data: EventData[];
}

export interface UserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

// Helper to handle the deep nesting in your JSON
export interface NestedUser {
  user: {
    userProfile: UserProfile;
  };
}

export interface EventParticipant {
  user: NestedUser;
}

export interface EventCategory {
  eventCategory: {
    id: string;
    name: string;
  };
}

export interface EventReview {
  reviewer: UserProfile;
}

export interface EventDetailData {
  id: string;
  title: string;
  slug: string;
  description: string;
  startTime: string;
  endTime: string;
  city: string;
  country: string;
  address: string;
  imageUrl: string;
  joiningFee: number;
  currency: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number; // Note: Your JSON had -1, UI should handle this
  rating: number;
  reviewCount: number;
  host: {
    user: {
      userProfile: UserProfile;
    };
  };
  eventCategories: EventCategory[];
  eventParticipants: EventParticipant[];
  eventReviews: EventReview[];
}

export interface EventDetailResponse {
  success: boolean;
  data: EventDetailData;
}
