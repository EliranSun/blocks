import classNames from "classnames";
import { format, isToday } from "date-fns";
import { useMemo, useState, useCallback, useEffect } from "react";


export const Cell = ({
    date,
    calendarName,
    colors = [],
    isEmpty = false,
    isCondensed = false,
    onCellMark
}) => {
    // If this is an empty cell, just render an empty div
    if (isEmpty) {
        return <div className={isCondensed ? "size-2" : "size-10"} />;
    }

    // Create a unique key for localStorage using calendarName and date
    const storageKey = useMemo(() => {
        const dateString = format(date, "yyyy-MM-dd"); // YYYY-MM-DD format
        return `${calendarName}_${dateString}`;
    }, [calendarName, date]);

    // Load initial state from localStorage
    // Store color index instead of boolean (-1 means unmarked, 0+ means marked with that color)
    const [colorIndex, setColorIndex] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : -1;
    });

    const isCellToday = useMemo(() => isToday(date), [date]);

    const dayNumber = useMemo(() => date.toLocaleDateString("en-GB", {
        day: "numeric",
    }), [date]);
    const monthName = useMemo(() => date.toLocaleDateString("en-GB", {
        month: "short",
    }), [date]);

    const handleMark = useCallback(() => {
        let newColorIndex;

        if (colorIndex === -1) {
            // If unmarked, go to first color
            newColorIndex = 0;
        } else if (colorIndex < colors.length - 1) {
            // If not at last color, move to next color
            newColorIndex = colorIndex + 1;
        } else {
            // If at last color, go back to unmarked
            newColorIndex = -1;
        }

        setColorIndex(newColorIndex);
        localStorage.setItem(storageKey, JSON.stringify(newColorIndex));
        onCellMark();
    }, [colorIndex, colors, storageKey, onCellMark]);

    const isMarked = colorIndex >= 0;
    const currentColor = useMemo(() => {
        if (isMarked) return colors[colorIndex]?.className;
        return null;
        }, [isMarked, colors, colorIndex]);

    const text = useMemo(() => {
        if (isMarked && colors[colorIndex]?.name) {
            return colors[colorIndex]?.name.slice(0, 3);
        }

        return null;
    }, [isMarked, colorIndex, colors, dayNumber, monthName]);

    const dayText = useMemo(() => {
        if (dayNumber === "1") {
            return monthName;
        }
        return dayNumber;
    }, [dayNumber, monthName]);

    return (
        <div
            onClick={handleMark}
            className={classNames("rounded-md", currentColor, {
                "size-12 flex items-center justify-center": !isCondensed,
                "size-2": isCondensed,
                "bg-neutral-700": !isCellToday && !isMarked,
                "border-3": isCellToday,
            })}>
            {!isCondensed &&
                <h1 className="flex flex-col items-center justify-center">
                    <span className={text ? "text-[8px]" : ""}>{dayText}</span>
                    <span className="text-sm font-bold">{text}</span>
                </h1>}
        </div>
    );
};
