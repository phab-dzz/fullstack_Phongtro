import React from "react";
import { Navigation } from "../public";

const header = () => {
    return (
      <div className="w-full flex h-[40px] fixed top-0 left-0 z-50 bg-white shadow-md">
  <div className="flex justify-center items-center font-bold bg-secondary1 text-white w-[150px] flex-none">
    EZROOM.PA#N
  </div>
  <div className="flex-grow basis-[400px]">
    <Navigation isAdmin={true} />
  </div>
</div>

    );
}
export default header;