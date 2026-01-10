
import UpdateEventForm from "@/components/modules/hostDashboard/UpdateEventForm";
import { notFound } from "next/navigation";

// 1. Fetch logic
async function getEventBySlug(slug: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  try {
    const res = await fetch(`${baseUrl}/event/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

// 2. Page Component
export default async function EditEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getEventBySlug(slug);

  if (!response?.data) {
    return notFound();
  }

  return (
    <div className="container py-10">
      <UpdateEventForm event={response.data} />
    </div>
  );
}
