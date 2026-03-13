"use client";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
     totalStars?: number;
     defaultRating?: number;
     onChange?: (rating: number) => void;
}

export default function StarRating({
     totalStars = 5,
     defaultRating = 0,
     onChange,
}: StarRatingProps) {
     const [rating, setRating] = useState<number>(defaultRating);
     const [hoverRating, setHoverRating] = useState<number | null>(null);
     const activeRating = hoverRating ?? rating;

     function handleMouseEnter(rating: number) {
          setHoverRating(rating);
     }
     function handleMouseLeave() {
          setHoverRating(null);
     }
     function handleClick(rating: number) {
          setRating(rating);
          onChange?.(rating);
     }
     return (
          <div className="flex items-center gap-1">
               {Array.from({ length: totalStars }).map((_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= activeRating;
                    return (
                         <Star
                              key={starValue}
                              className={
                                   isFilled
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                              }
                              onMouseEnter={() => handleMouseEnter(starValue)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleClick(starValue)}
                         />
                    );
               })}
          </div>
     );
}
