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
          ? "bg-stone-800/40 text-white dark:bg-stone-100/90 dark:text-stone-800"
          : "bg-stone-100/40 text-gray-800 dark:bg-stone-900/40 dark:text-stone-100"
      )}
    >
      {label.toLowerCase()}
    </button>
  );
}

export default Tag;