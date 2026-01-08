import { Button } from "@/components/ui/button";
import { EventDetailResponse } from "@/types/event.type";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Star,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Fetch Logic
async function getEventDetails(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

  try {
    const res = await fetch(`${baseUrl}/event/${slug}`, {
      cache: "default",
    });

    if (!res.ok) return null;

    return (await res.json()) as EventDetailResponse;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getEventDetails(slug);

  if (!response || !response.data) {
    notFound();
  }

  const event = response.data;

  // Format Dates
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const dateStr = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = `${startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  // Host Info
  const host = event.host.user.userProfile;
  const hostName = host.firstName
    ? `${host.firstName} ${host.lastName}`
    : "Anonymous Host";

  // Price
  const isFree = event.joiningFee === 0;
  const priceDisplay = isFree
    ? "Free"
    : `${event.currency} ${event.joiningFee}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* --- HERO IMAGE SECTION --- */}
      <div className="relative h-[400px] w-full lg:h-[500px]">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

        <div className="container absolute bottom-0 left-1/2 mx-auto -translate-x-1/2 px-4 pb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            {event.eventCategories.map((cat) => (
              <span
                key={cat.eventCategory.id}
                className="rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-md"
              >
                {cat.eventCategory.name}
              </span>
            ))}
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                event.status === "COMPLETED" ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {event.status}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl lg:text-6xl shadow-sm">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto mt-10 grid grid-cols-1 gap-10 px-4 lg:grid-cols-3">
        {/* --- LEFT COLUMN (DETAILS) --- */}
        <div className="space-y-10 lg:col-span-2">
          {/* Quick Stats Bar */}
          <div className="flex flex-wrap gap-6 rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Date
                </p>
                <p className="font-semibold">{dateStr}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Location
                </p>
                <p className="font-semibold">
                  {event.city}, {event.country}
                </p>
              </div>
            </div>

            {event.rating > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <Star className="h-5 w-5 fill-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Rating
                  </p>
                  <p className="font-semibold">
                    {event.rating} ({event.reviewCount} reviews)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">About this Event</h2>
            <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Host Info */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Your Host</h2>
            <div className="flex items-center gap-4 rounded-xl border p-4 bg-muted/30">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20">
                {host.imageUrl ? (
                  <Image
                    src={host.imageUrl}
                    alt={hostName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold">{hostName}</h3>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(host.createdAt || "").getFullYear()}
                </p>
              </div>
            </div>
          </div>

          {/* Participants Preview */}
          {event.eventParticipants.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Attendees</h2>
              <div className="flex -space-x-3 overflow-hidden">
                {/* Slice to show max 5 faces */}
                {event.eventParticipants.slice(0, 5).map((p, idx) => {
                  const profile = p.user.user.userProfile;
                  return (
                    <div
                      key={profile.id}
                      className="relative h-10 w-10 rounded-full border-2 border-background bg-gray-200"
                    >
                      {profile.imageUrl ? (
                        <Image
                          src={profile.imageUrl}
                          alt="User"
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300 text-xs text-gray-600 font-bold">
                          {/* Initials fallback */}U{idx + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
                {event.eventParticipants.length > 5 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                    +{event.eventParticipants.length - 5}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN (STICKY SIDEBAR) --- */}
        <div className="relative lg:col-span-1">
          <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-muted-foreground">Total Price</span>
              <span className="text-3xl font-bold text-primary">
                {priceDisplay}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>
                  {dateStr} <br />{" "}
                  <span className="text-muted-foreground">{timeStr}</span>
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>{event.address}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>
                  {event.minParticipants} - {event.maxParticipants} Guests
                </span>
              </div>
            </div>

            {event.status === "UPCOMING" ? (
              <Button className="w-full text-lg" size="lg">
                Join Event
              </Button>
            ) : (
              <Button className="w-full text-lg" size="lg" disabled>
                Event {event.status}
              </Button>
            )}

            <div className="mt-4 flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share this event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
