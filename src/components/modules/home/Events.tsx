import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Events = () => {
  const FEATURED_EVENTS = [
    {
      id: 1,
      title: "Annual Tech Conference 2026",
      date: "Mar 15, 2026",
      location: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      price: "$99",
      category: "Technology",
      attendees: 120,
    },
    {
      id: 2,
      title: "Sunday Morning Yoga",
      date: "Jan 12, 2026",
      location: "Central Park, NY",
      image:
        "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80",
      price: "Free",
      category: "Sports",
      attendees: 15,
    },
    {
      id: 3,
      title: "Indie Music Night",
      date: "Feb 20, 2026",
      location: "Austin, TX",
      image:
        "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80",
      price: "$25",
      category: "Music",
      attendees: 45,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">
          Trending Events Near You
        </h2>
        <p className="text-slate-500 text-center mb-12">
          Do not miss out on what is happening this weekend.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_EVENTS.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none shadow-md"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-4 left-4 bg-white/90 text-slate-900 hover:bg-white">
                  {event.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-1">
                    {event.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{event.attendees} Attending</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <span className="font-bold text-lg text-slate-900">
                  {event.price}
                </span>
                <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-white"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/events">
            <Button size="lg" variant="default">
              Browse All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Events;
