import React, { useState } from "react";
import Tag from "./Tag";

const Groups = {
  health: HealthTags
  };
  
const HealthTags = [
  "Woke up", 
  "8hrs", 
  "low hours", 
  "on schedule", 
  "social",
  "low carbs",
  "high protein"
  "eating early"
];

function TagGroup({ groupName = "" }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };
  
  if (!groupName) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {HealthTags.map((tag) => (
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