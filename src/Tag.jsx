import React from "react";
import clsx from "classnames"; // Optional, see note below

function Tag({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1 text-sm rounded-full border transition-colors duration-200",
        "hover:shadow-sm",
        selected
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 border-gray-300"
      )}
    >
      {label}
    </button>
  );
}

export default Tag;