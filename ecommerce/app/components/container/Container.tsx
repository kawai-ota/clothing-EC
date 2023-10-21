import React from "react";
import Item from "./Item";

type ContainerProps = {};

const Container = (props: ContainerProps) => {
  return (
    <div className="mb-[200px]">
      <div className="flex">
        <div className="sm:px-20 pl-3">
          <Item />
        </div>
      </div>
    </div>
  );
};

export default Container;
