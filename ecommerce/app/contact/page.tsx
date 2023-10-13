import React from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";

type ContactProps = {};

const page = (props: ContactProps) => {
  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <Navbar />
      <hr />
      <Contact />
    </div>
  );
};

export default page;
