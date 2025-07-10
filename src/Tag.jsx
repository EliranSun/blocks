import React from "react";
import cn from "classnames";

function Tag({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 text-sm rounded-full transition-colors duration-200",
        "hover:shadow-sm",
        selected
          ? "bg-gray-800 text-white border-gray-500"
          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 border-gray-300"
      )}
    >
      {label.toLowerCase()}
    </button>
  );
}

export default Tag;