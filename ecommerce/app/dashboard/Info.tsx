"use client";
import React from "react";
import ReactStars from "react-rating-star-with-type";
import { FaRegCommentDots } from "react-icons/fa";
import { CiShoppingCart, CiCreditCard1 } from "react-icons/ci";
import { SlTag } from "react-icons/sl";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiCubeFocusThin } from "react-icons/pi";
import { AiTwotoneEdit } from "react-icons/ai";
import Size from "../components/Size";
import Link from "next/link";
import { useSession } from "next-auth/react";

type InfoProps = {
  id: number;
  title: string;
  description: string;
  category: string;
  style: string;
  store: string;
  size: string;
  inventory: number;
  color: string;
  price: number;
  images: string;
  userId: number;
  //   rating: number;
  //   numbercomments: number;
};

const Info: React.FC<InfoProps> = ({
  title,
  description,
  id,
  price,
  color,
  size,
  userId,
}) => {
  return <div>Info</div>;
};

export default Info;
