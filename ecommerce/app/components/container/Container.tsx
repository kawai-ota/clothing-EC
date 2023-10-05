import Link from "next/link";
import React from "react";
import Filter from "./Filter";
import Item from "./Item";

type ContainerProps = {};

const Container = (props: ContainerProps) => {
  return (
    <div className="mb-[200px]">
      <div className="flex">
        {/* <Link href="/filters"> */}
        <div>
          <Filter />
        </div>
        {/* </Link> */}
        <div className="px-20">
          <Item />
        </div>
      </div>
    </div>
  );
};

export default Container;
