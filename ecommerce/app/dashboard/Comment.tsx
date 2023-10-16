"use client";
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-star-with-type";

interface CommentProps {
  rating: number;
  numberComments: number;
}

const Comment = (props: CommentProps) => {
  return (
    <>
      <div className="flex items-center mt-4">
        <ReactStars value={props.rating} size={20} />
        <span className="ml-2">
          <span className="opacity-70 text-sm underline hover:no-underline cursor-pointer">
            <Link href="/allreview">
              [{props.numberComments}件のレビューを見る]
            </Link>
          </span>
        </span>
      </div>
    </>
  );
};

export default Comment;
