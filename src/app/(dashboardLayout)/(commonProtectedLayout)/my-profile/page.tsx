import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { ProfileResponse } from "@/types/user-profile";
import {
  Calendar,
  CreditCard,
  Edit,
  LucideIcon,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";

// Fetch logic
async function getUserProfile(userId: string) {
  const res = await serverFetch.get(`/user/profile/${userId}`, {
    next: { tags: ["user-info"] },
  });
  if (!res.ok) {
    return null;
  }

  console.log(res);

  return (await res.json()) as ProfileResponse;
}

export default async function ProfilePage() {
  const user = await getUserInfo();
  const response = await getUserProfile(user.id);

  // If no profile found, redirect or show error
  if (!response?.data) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Profile not found</h2>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  const profile = response.data;

  // Formatting Helpers
  const fullName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : "Anonymous User";

  const location =
    profile.city && profile.country
      ? `${profile.city}, ${profile.country}`
      : "Location not set";

  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      {/* --- HEADER SECTION --- */}
      <div className="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center">
        <Avatar className="border-background h-24 w-24 border-4 shadow-lg md:h-32 md:w-32">
          <AvatarImage src={profile.imageUrl || ""} alt={fullName} />
          <AvatarFallback className="text-3xl font-bold">
            {profile.firstName?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Member since {memberSince}
            </span>
          </div>
        </div>

        {/* Desktop Edit Button */}
        <Button className="hidden md:flex" asChild variant="outline">
          <Link href="/edit-profile">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Link>
        </Button>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* LEFT COLUMN: Bio & Interests */}
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-muted-foreground mb-1 text-sm font-medium">
                  Bio
                </h4>
                <p className="text-sm leading-relaxed">
                  {profile.bio || "No bio added yet."}
                </p>
              </div>

              <div>
                <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.length > 0 ? (
                    profile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm italic">
                      No interests added.
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Tabs (Events, Payments, Reviews) */}
        <div className="md:col-span-2">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="events"
                className="data-[state=active]:border-primary data-[state=active]:bg-muted/20 rounded-t-lg border-b-2 border-transparent px-6 py-2"
              >
                My Events ({profile.eventsJoined.length})
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:border-primary data-[state=active]:bg-muted/20 rounded-t-lg border-b-2 border-transparent px-6 py-2"
              >
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:border-primary data-[state=active]:bg-muted/20 rounded-t-lg border-b-2 border-transparent px-6 py-2"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {/* EVENTS TAB */}
              <TabsContent value="events" className="space-y-4">
                {profile.eventsJoined.length > 0 ? (
                  profile.eventsJoined.map((entry) => (
                    <Card key={entry.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-semibold">{entry.event.title}</p>
                          <p className="text-muted-foreground text-sm">
                            Status: {entry.status}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/events/${entry.event.slug}`}>View</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <EmptyState
                    icon={Calendar}
                    title="No events joined"
                    description="You haven't joined any events yet. Start exploring!"
                    actionLink="/events"
                    actionText="Explore Events"
                  />
                )}
              </TabsContent>

              {/* PAYMENTS TAB */}
              <TabsContent value="payments" className="space-y-4">
                {profile.payments.length > 0 ? (
                  profile.payments.map((payment) => (
                    <Card key={payment.id}>{/* Render Payment Details */}</Card>
                  ))
                ) : (
                  <EmptyState
                    icon={CreditCard}
                    title="No payment history"
                    description="Your transaction history is empty."
                  />
                )}
              </TabsContent>

              {/* REVIEWS TAB */}
              <TabsContent value="reviews" className="space-y-4">
                {profile.eventReviews.length > 0 ? (
                  // Render Reviews
                  <div>Reviews List</div>
                ) : (
                  <EmptyState
                    icon={Star}
                    title="No reviews yet"
                    description="You haven't written any reviews yet."
                  />
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* --- MOBILE FOOTER BUTTON (Requested) --- */}
      <div className="bg-background fixed right-0 bottom-0 left-0 border-t p-4 md:hidden">
        <Button className="w-full" size="lg" asChild>
          <Link href="/profile/edit">
            <Edit className="mr-2 h-4 w-4" /> Update Profile
          </Link>
        </Button>
      </div>

      {/* Spacer for mobile footer so it doesn't cover content */}
      <div className="h-20 md:hidden" />
    </div>
  );
}

// --- HELPER COMPONENTS ---

function EmptyState({
  icon: Icon,
  title,
  description,
  actionLink,
  actionText,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLink?: string;
  actionText?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
      <div className="bg-muted mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <Icon className="text-muted-foreground h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-xs text-sm">
        {description}
      </p>
      {actionLink && (
        <Button variant="outline" size="sm" asChild>
          <Link href={actionLink}>{actionText}</Link>
        </Button>
      )}
    </div>
  );
}
