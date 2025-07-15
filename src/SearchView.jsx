import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { searchThoughts } from "./utils/strorage";

const highlightSearchTerm = (text, search) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase()
            ? <span key={index} className="bg-yellow-200">{part}</span>
            : part
    );
};

export const SearchView = () => {
    const [search, setSearch] = useState("");
    const [thoughts, setThoughts] = useState([]);

    return (
        <div className="flex flex-col gap-4 merriweather-500 w-full h-full px-2">
            <div className="flex items-center gap-2">
                <MagnifyingGlassIcon size={60} />
                <input
                    className="text-4xl w-full border-b outline-none"
                    type="text"
                    placeholder="Search thoughts..."
                    autoFocus value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        const storedThoughts = searchThoughts(e.target.value);
                        setThoughts(storedThoughts);
                    }} />
            </div>
            <div className="flex flex-col gap-4 items-start justify-start w-full">
                {thoughts.map((thought, index) => (
                    <div
                        key={index}
                        className="bg-white/50 rounded-xl p-4 w-full overflow-hidden whitespace-wrap">
                        {highlightSearchTerm(thought, search)}
                    </div>
                ))}
            </div>
        </div>
    )
};