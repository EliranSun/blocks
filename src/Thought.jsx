import classNames from "classnames";
import { useState, useRef, useEffect } from "react";
import { formatDate } from "./utils/strorage";

const parseHashtags = (text) => {
    if (!text) return text;
    // Split text into segments, preserving newlines and spaces
    return text.split(/(\s+|\n+|(?=#))/).map((segment, index) => {
        if (segment.startsWith('#')) {
            return <span key={index} className="bg-yellow-200 rounded px-1">{segment}</span>;
        }
        return segment;
    });
};

export const Thought = ({ category, date, showCategoryName = false, hideIfEmpty = false }) => {
    const [isThinking, setIsThinking] = useState(false);
    const [thought, setThought] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        const thought = localStorage.getItem(`thought_${category.name}_${formatDate(date)}`);
        setThought(thought || "");
    }, [date, category.name]);

    useEffect(() => {
        if (isThinking && textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [isThinking]);

    if (isThinking) {
        return (
            <textarea
                ref={textareaRef}
                value={thought}
                autoFocus
                onChange={(e) => setThought(e.target.value)}
                placeholder={`My thoughts for today on ${category.name}...`}
                className="w-full border merriweather-500 h-[33vh] text-xl rounded-xl p-4"
                onBlur={() => {
                    setIsThinking(false);
                    localStorage.setItem(`thought_${category.name}_${formatDate(date)}`, thought);
                }} />
        );
    }

    if (hideIfEmpty && !thought) {
        return null;
    }

    return (
        <h3
            onClick={() => setIsThinking(true)}
            className={classNames(
                "text-xl merriweather-500 py-2 w-full",
            )}>
            {showCategoryName &&
                <span className="merriweather-500 opacity-100 ">
                    {category.name}:{' '}
                </span>}
            <div className={classNames(
                "whitespace-pre-wrap",
                {
                    "opacity-70": thought,
                    "opacity-40": !thought,
                }
            )}>
                {parseHashtags(thought || `My thoughts for today on ${category.name}...`)}
            </div>
        </h3>
    );
};
