import React, { useState } from "react";
import Tag from "./Tag";

const initialTags = ["Focus", "Energy", "Sleep", "Physio", "Creative"];

function TagGroup() {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {initialTags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          selected={selectedTags.includes(tag)}
          onClick={() => toggleTag(tag)}
        />
      ))}
    </div>
  );
}

export default TagGroup;