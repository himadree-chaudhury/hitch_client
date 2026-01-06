import { AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
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

  return (
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
                <p className="text-slate-700 mb-6 italic">{t.quote} </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      {t.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
