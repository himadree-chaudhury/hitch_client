import EventCard from "@/components/modules/event/EventCard";
import { ApiResponse } from "@/types/event.type";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

// 1. Define searchParams type as a Promise
type SearchParams = Promise<{ [key: string]: string | undefined }>;

// 2. Helper to fetch data (accepts resolved params object)
async function getEvents(query: { [key: string]: string | undefined }) {
  const params = new URLSearchParams();
  if (query.search) params.append("search", query.search);
  if (query.city) params.append("city", query.city);

  // FIX: Ensure a valid base URL.
  // Use environment variable in production, localhost in dev.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

  const res = await fetch(`${baseUrl}/event?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json() as Promise<ApiResponse>;
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: SearchParams; // Type is now a Promise
}) {
  // 3. AWAIT searchParams before accessing properties
  const resolvedParams = await searchParams;

  const response = await getEvents(resolvedParams);
  const events = response.data || []; // Safely handle potential undefined data

  // Server Action for Search
  async function searchEvents(formData: FormData) {
    "use server";
    const searchTerm = formData.get("search")?.toString();
    const cityTerm = formData.get("city")?.toString();

    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (cityTerm) params.set("city", cityTerm);

    redirect(`/events?${params.toString()}`);
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-10">
      {/* Header & Filter Section */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Explore Events
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover {events.length} upcoming events near you.
          </p>
        </div>

        {/* Search Form */}
        <form action={searchEvents} className="flex gap-2">
          <input
            name="search"
            type="text"
            placeholder="Search events..."
            defaultValue={resolvedParams.search} // Use resolvedParams here
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            name="city"
            type="text"
            placeholder="City..."
            defaultValue={resolvedParams.city} // Use resolvedParams here
            className="h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex h-60 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/50">
          <h3 className="text-xl font-semibold">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
