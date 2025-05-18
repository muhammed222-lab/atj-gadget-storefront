
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 16, 
  interactive = false,
  onRatingChange
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  
  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = hoverRating ? star <= hoverRating : star <= rating;
        
        return (
          <Star 
            key={star}
            size={size}
            className={`${isActive ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} ${
              interactive ? "cursor-pointer" : ""
            }`}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(null)}
            onClick={() => handleClick(star)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
