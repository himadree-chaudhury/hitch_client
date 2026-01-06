import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Search, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
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
  );
};
export default Hero;
