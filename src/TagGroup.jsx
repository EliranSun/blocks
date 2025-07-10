import React, { useState } from "react";
import Tag from "./Tag";

const HealthTags = [
  "family",
  "friends",
  "Woke up", 
  "8hrs", 
  "low hours", 
  "on schedule", 
  "social",
  "low carbs",
  "high protein",
  "eating early"
];

const Groups = {
  "health": HealthTags
  };
  

function TagGroup({ groupName = "" }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };
  
  if (!groupName || !Groups[groupName]) 
    return null;

  return (
    <div className="flex flex-wrap gap-2">
      {Groups[groupName].map((tag) => (
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