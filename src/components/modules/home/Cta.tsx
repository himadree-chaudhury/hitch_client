import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Cta = () => {
    return (
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
    );
};
export default Cta;