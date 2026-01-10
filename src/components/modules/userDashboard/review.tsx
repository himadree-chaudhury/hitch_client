import { getUserInfo } from "@/services/auth/getUserInfo";
import { notFound, redirect } from "next/navigation";
import DualReviewForm from "./ReviewForm";

// Fetch event details + participant status
async function getReviewData(slug: string, userId: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // Fetch event
  const res = await fetch(`${baseUrl}/event/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const event = (await res.json()).data;

  // Verify User Participation (This logic might be in your backend,
  // but assuming we check specific conditions here or via an endpoint)
  // For now, we pass the event data to the form.

  return event;
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getUserInfo();

  if (!user) {
    redirect(`/login?redirect=/events/${slug}/review`);
  }

  const event = await getReviewData(slug, user.userId);

  if (!event) return notFound();

  // OPTIONAL: Add server-side check here.
  // If user has already reviewed or status != COMPLETED, redirect away.
  // if (event.status !== 'COMPLETED') redirect(`/events/${slug}`);

  // Safely get host Name
  const hostProfile = event.host?.user?.userProfile;
  const hostName = hostProfile?.firstName
    ? `${hostProfile.firstName} ${hostProfile.lastName}`
    : "The Host";

  return (
    <div className="bg-muted/10 container min-h-screen py-10">
      <DualReviewForm
        eventId={event.id}
        hostId={event.hostId}
        eventTitle={event.title}
        hostName={hostName}
      />
    </div>
  );
}
