import {
  ArrowRight,
  Coffee,
  Laptop,
  Music,
  Palette,
  Tent,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Technology", icon: Laptop, color: "bg-blue-100 text-blue-600" },
  { name: "Music", icon: Music, color: "bg-pink-100 text-pink-600" },
  { name: "Sports", icon: Trophy, color: "bg-orange-100 text-orange-600" },
  { name: "Art", icon: Palette, color: "bg-purple-100 text-purple-600" },
  { name: "Outdoors", icon: Tent, color: "bg-green-100 text-green-600" },
  { name: "Social", icon: Coffee, color: "bg-yellow-100 text-yellow-600" },
];

const Categories = () => {
  return (
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
  );
};
export default Categories;
