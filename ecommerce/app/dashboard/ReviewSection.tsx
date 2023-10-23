"use client";
import React from "react";
import ReactStars from "react-rating-star-with-type";

type ReviewSectionProps = {
  rating: number;
  commentry: string;
  productId: number;
  userId: number;
};

const ReviewSection = ({ rating, commentry }: ReviewSectionProps) => {
  return (
    <div>
      <ReactStars
        value={rating}
        activeColors={["red", "orange", "#FFCE00", "#9177FF", "#3EBCB5"]}
      />
      <p className="mt-2">{commentry}</p>
    </div>
  );
};

export default ReviewSection;
