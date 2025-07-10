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

const WifeTags = [
  "One Piece",
  "passion",
  "snake woman",
  "Nathan for You",
  "Baldur's Gate III",
  "Blue Prince",
  "Kentucky Route Zero",
  "Neighbor upstairs",
  "CSS drawing"
  ];

const Groups = {
  "health": HealthTags,
  "wife": WifeTags,
  };
  

function TagGroup({ groupName = "" }) {
  const [selectedTags, setSelectedTags] = useState([]);
const [showAll, setShowAll] = useState(false);

if (!groupName || !Groups[groupName]) 
    return null;
    
const tagsToShow = showAll ? Groups[groupName] : Groups[groupName].slice(0, 8);


  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };
  
  

  return (
    <div className="flex flex-wrap gap-2">
      {tagsToShow.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          selected={selectedTags.includes(tag)}
          onClick={() => toggleTag(tag)}
        />
      ))}
      {Groups[groupName].length > 8 && (
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-sm text-blue-500 hover:underline self-start"
      >
        {showAll ? "Show less" : "Show more"}
      </button>
    )}
  </div
    </div>
  );
}

export default TagGroup;