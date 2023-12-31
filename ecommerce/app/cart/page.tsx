import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "../components/Navbar";
import AllCartProduct from "../components/AllCartProduct";
import AllPurchased from "../components/AllPurchased";

type CartProps = {};

const page = async (props: CartProps) => {
  const session = await getServerSession(options);
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5 mb-20">
        <Navbar />
        <hr />
        <AllCartProduct userId={session?.user?.id} />
        <hr className="sm:mt-0 mt-16" />
        <AllPurchased userId={session?.user?.id} />
      </div>
    </>
  );
};

export default page;
