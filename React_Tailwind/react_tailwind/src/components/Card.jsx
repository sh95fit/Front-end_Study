import React from "react";

const Card = ({ children }) => {
  return (
    <div className="relative w-full h-full p-8 bg-gray-300 border-2 rounded-md">
      { children }
    </div>
  )
};

export default Card;