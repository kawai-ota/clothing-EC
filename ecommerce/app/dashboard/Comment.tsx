"use client";
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-star-with-type";

interface CommentProps {
  rating: number;
  numberComments: number;
}

const Comment = (props: CommentProps) => {
  const scrollToReviews = () => {
    const reviewSection = document.getElementById("review-section");
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex items-center mt-4">
        <ReactStars value={props.rating} size={20} />
        <span className="ml-2">
          <span
            className="opacity-70 text-sm underline hover:no-underline cursor-pointer"
            onClick={scrollToReviews}
          >
            [{props.numberComments}件のレビューを見る]
          </span>
        </span>
      </div>
    </>
  );
};

export default Comment;
