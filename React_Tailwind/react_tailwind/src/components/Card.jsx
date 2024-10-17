import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Card = ({ children }) => {

  const { darkMode } = useContext(ThemeContext);

  return (
    // <div className="relative w-full h-full p-8 bg-white border-2 rounded-md border-neutral-200">
    <div className={`relative w-full h-full p-8 bg-white border-2 rounded-md
                    ${darkMode ? "bg-gray-900 border-gray-800" : "border-neutral-200"}
    `}>
      { children }
    </div>
  )
};

export default Card;