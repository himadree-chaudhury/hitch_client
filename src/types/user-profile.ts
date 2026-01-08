export interface UserProfileData {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  interests: string[];
  bio: string | null;
  imageUrl: string | null;
  gender: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  // Based on your empty arrays, I'm inferring the structure from your schema
  eventsJoined: Array<{
    id: string;
    status: string;
    event: { id: string; title: string; startTime: string; slug: string };
  }>;
  payments: Array<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
  }>;
  eventReviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
}

export interface ProfileResponse {
  success: boolean;
  data: UserProfileData;
}
