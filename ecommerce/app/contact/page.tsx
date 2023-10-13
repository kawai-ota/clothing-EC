import React from "react";
import Navbar from "../components/Navbar";

type ContactProps = {};

const page = (props: ContactProps) => {
  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <Navbar />
      <hr />
    </div>
  );
};

export default page;
