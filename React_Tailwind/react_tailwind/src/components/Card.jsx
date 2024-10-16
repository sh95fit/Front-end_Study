import React from "react";

const Card = ({ children }) => {
  return (
    <div className="relative w-full h-full p-8 bg-white border-2 rounded-md border-neutral-200">
      { children }
    </div>
  )
};

export default Card;