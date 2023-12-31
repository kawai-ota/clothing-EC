"use client";
import React, { useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { useRouter } from "next/navigation";
import axios from "axios";

type ReviewProps = {
  productId?: number;
  userId?: number;
};

const Review = ({ productId, userId }: ReviewProps) => {
  const router = useRouter();
  const defaultReviewForm = {
    star: 0,
    comment: "",
    productId: productId,
    userId: userId,
  };
  const [reviewForm, setReviewForm] = useState(defaultReviewForm);

  const onChange = (nextValue: any) => {
    setReviewForm((prevState) => ({ ...prevState, star: nextValue }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviewForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const postData = async () => {
    try {
      const response = await axios.post("/api/review", reviewForm);
      setReviewForm(defaultReviewForm);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-medium mb-4">レビューを書く</h1>
      <h2 className="mb-2">評価する</h2>
      <ReactStars
        onChange={onChange}
        value={defaultReviewForm.star}
        size={17}
        isEdit={true}
        activeColors={["#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00", "#FFCE00"]}
      />
      <h2 className="mt-4">コメントを書いてください</h2>
      <div>
        <input
          className="border-[1px] border-gray-300 rounded-lg w-full h-[40px] focus:border-[#3EBCB5] px-2 mt-2"
          type="text"
          name="comment"
          onChange={handleChange}
          value={reviewForm.comment}
        />
      </div>
      <button
        className="px-5 p-2 border-[1px] bg-[#3EBCB5] hover:bg-[#42c9c3] text-white rounded-lg mt-5"
        onClick={postData}
      >
        投稿
      </button>
    </div>
  );
};

export default Review;
