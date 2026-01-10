"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ name, value, onChange }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {/* Hidden input for FormData to catch the value */}
      <input type="hidden" name={name} value={value} />

      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          type="button"
          key={rating}
          onClick={() => onChange(rating)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Star
            className={cn(
              "h-8 w-8 cursor-pointer transition-colors",
              rating <= value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-300 hover:text-yellow-200",
            )}
          />
        </button>
      ))}
      <span className="text-muted-foreground ml-2 text-sm font-medium">
        {value > 0 ? `${value}/5` : "Select rating"}
      </span>
    </div>
  );
}
