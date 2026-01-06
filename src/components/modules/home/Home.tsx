"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Calendar,
  Coffee,
  Laptop,
  MapPin,
  Music,
  Palette,
  Search,
  Star,
  Tent,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

// --- MOCK DATA (Replace with API calls later) ---
const CATEGORIES = [
  { name: "Technology", icon: Laptop, color: "bg-blue-100 text-blue-600" },
  { name: "Music", icon: Music, color: "bg-pink-100 text-pink-600" },
  { name: "Sports", icon: Trophy, color: "bg-orange-100 text-orange-600" },
  { name: "Art", icon: Palette, color: "bg-purple-100 text-purple-600" },
  { name: "Outdoors", icon: Tent, color: "bg-green-100 text-green-600" },
  { name: "Social", icon: Coffee, color: "bg-yellow-100 text-yellow-600" },
];

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

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Event Enthusiast",
    quote:
      "Hitch made it so easy to find hiking buddies when I moved to a new city. I've made lifelong friends here!",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Tech Host",
    quote:
      "As a host, the platform handles all the payments and registrations perfectly. I can focus on the content.",
    avatar: "MJ",
  },
  {
    name: "Emily Davis",
    role: "Artist",
    quote:
      "I found the best local art workshops through Hitch. The community is so welcoming and vibrant.",
    avatar: "ED",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5"
          >
            🚀 The #1 Platform for Local Connections
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Find Your People. <br />
            <span className="text-primary">Experience the Moment.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Discover local events, sports, and hobbies. Connect with like-minded
            people and never miss out on an experience again.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-10">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search for concerts, hiking, workshops..."
                className="pl-10 h-12 text-md shadow-sm"
              />
            </div>
            <Button size="lg" className="h-12 w-full md:w-auto px-8">
              Find Events
            </Button>
          </div>

          {/* Social Proof Numbers */}
          <div className="flex justify-center gap-8 text-slate-500 text-sm font-medium">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> 50k+ Users
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> 1k+ Events
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> 20+ Cities
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORIES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Explore by Category
            </h2>
            <Link
              href="/events"
              className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/events?category=${cat.name}`}
                className="group"
              >
                <div
                  className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer border border-slate-100 ${cat.color} bg-opacity-10`}
                >
                  <cat.icon
                    className={`h-8 w-8 mb-3 ${cat.color.split(" ")[1]}`}
                  />
                  <span className="font-semibold text-slate-700 group-hover:text-primary">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED EVENTS */}
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
                  <img
                    src={event.image}
                    alt={event.title}
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

      {/* SECTION 4: HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How Hitch Works
            </h2>
            <p className="text-slate-600">
              We make it simple to bridge the gap between online discovery and
              offline connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold">Discover</h3>
              <p className="text-slate-500 leading-relaxed">
                Browse thousands of events based on your interests, location,
                and schedule.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold">Join</h3>
              <p className="text-slate-500 leading-relaxed">
                Book your spot instantly. For paid events, our secure payment
                system keeps you safe.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold">Connect</h3>
              <p className="text-slate-500 leading-relaxed">
                Show up, meet like-minded people, and enjoy the experience
                together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BECOME A HOST CTA */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <Badge className="bg-primary hover:bg-primary/90 text-white">
              For Creators
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Host Your Own Events & Build a Community
            </h2>
            <p className="text-slate-300 text-lg">
              Whether you want to organize a small book club or a massive tech
              conference, Hitch gives you the tools to manage tickets, payments,
              and attendees seamlessly.
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                Create Event
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl">
              {/* Visual mock of a dashboard card */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  H
                </div>
                <div>
                  <div className="font-bold text-lg">Host Dashboard</div>
                  <div className="text-slate-400 text-sm">
                    Manage your events
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-24 bg-slate-700/50 rounded-xl w-full animate-pulse"></div>
                <div className="h-24 bg-slate-700/50 rounded-xl w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Loved by the Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <Card key={index} className="border-none shadow-md bg-white">
                <CardContent className="pt-6">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {t.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
