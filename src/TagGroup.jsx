import React, { useEffect, useMemo, useState } from "react";
import Tag from "./Tag";
import { getStorageKey } from "./utils/strorage";


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
  "eating early",
  "css",
  "read",
];

const CreativeTags = [
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

const WifeTags = [
  "Hapisga",
  "Movie",
];

const Groups = {
  "health": HealthTags,
  "creative": CreativeTags,
  "wife": WifeTags,
};


function TagGroup({ groupName = "", date }) {
  const [selectedTags, setSelectedTags] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const storageKey = useMemo(() => getStorageKey(`${groupName}_tags`, date), [groupName, date]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  useEffect(() => {
    const tags = localStorage.getItem(storageKey);
    setSelectedTags(tags ? JSON.parse(tags) : []);
  }, [storageKey]);

  useEffect(() => {
    if (selectedTags !== null) {
      localStorage.setItem(storageKey, JSON.stringify(selectedTags));
    }
  }, [storageKey, selectedTags]);


  if (!groupName || !Groups[groupName])
    return null;

  if (selectedTags === null) {
    return null;
  }

  const tagsToShow = showAll ? Groups[groupName] : Groups[groupName].slice(0, 8);


  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
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
          className="text-sm hover:underline"
        >
          {showAll ? "less" : "more"}
        </button>
      )}
    </div>
  );
}

export default TagGroup;