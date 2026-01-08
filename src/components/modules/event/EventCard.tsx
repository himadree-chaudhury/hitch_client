import { Button } from "@/components/ui/button"; // Assuming you have shadcn/ui
import { EventData } from "@/types/event.type";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ event }: { event: EventData }) => {
  const startDate = new Date(event.startTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const priceLabel =
    event.joiningFee === 0 ? "Free" : `${event.currency} ${event.joiningFee}`;

  return (
    <div className="group bg-card text-card-foreground relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {event.status}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {event.eventCategories.map((cat) => (
            <span
              key={cat.eventCategory.id}
              className="bg-secondary text-secondary-foreground inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
            >
              {cat.eventCategory.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl leading-tight font-bold tracking-tight">
          {event.title}
        </h3>

        {/* Details */}
        <div className="text-muted-foreground mt-auto space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="text-primary h-4 w-4" />
            <span>{startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-primary h-4 w-4" />
            <span>
              {event.city}, {event.country}
            </span>
          </div>
        </div>

        {/* Footer: Host & Price */}
        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div className="text-primary text-lg font-bold">{priceLabel}</div>
          <Button asChild size="sm">
            <Link href={`/events/${event.slug}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
