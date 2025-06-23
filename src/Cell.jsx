import classNames from "classnames";
import { format, isToday } from "date-fns";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Motion, spring, presets } from "react-motion";

export const Cell = ({
    cellDate,
    calendarName,
    colors = [],
    isCondensed = false,
    onCellMark
}) => {
    const storageKey = useMemo(() => {
        // const dateString = format(date, "yyyy-MM-dd");
        const dateString = format(cellDate, "yyyy-MM-dd"); // YYYY-MM-DD format
        return `${calendarName}_${dateString}`;
    }, [calendarName, cellDate]);

    const [colorIndex, setColorIndex] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : -1;
    });

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        setColorIndex(saved ? JSON.parse(saved) : -1);
    }, [storageKey]);

    const isCellToday = useMemo(() => isToday(cellDate), [cellDate]);

    const dayNumber = useMemo(() => cellDate.toLocaleDateString("en-GB", {
        day: "numeric",
    }), [cellDate]);
    const monthName = useMemo(() => cellDate.toLocaleDateString("en-GB", {
        month: "short",
    }), [cellDate]);

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

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
        setColorIndex(newColorIndex);
        localStorage.setItem(storageKey, JSON.stringify(newColorIndex));
        onCellMark();
    }, [colorIndex, colors, storageKey, onCellMark]);

    const isMarked = useMemo(() => colorIndex >= 0, [colorIndex, storageKey]);

    const currentColor = useMemo(() => {
        if (isMarked) {
            return colors[colorIndex]?.className;
        }
        return null;
    }, [isMarked, colors, colorIndex, storageKey]);

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
        <Motion style={{
            scale: spring(isAnimating ? 1.2 : 1, presets.wobbly),
            opacity: spring(isMarked ? 1 : 0.9)
        }}>
            {interpolated => (
                <div
                    onClick={handleMark}
                    className={classNames("rounded-md cursor-pointer", currentColor, {
                        "size-10 flex items-center justify-center": !isCondensed,
                        "size-2": isCondensed,
                        "bg-neutral-700": !isCellToday && !isMarked,
                        "border-3": isCellToday,
                    })}
                    style={{
                        transform: `scale(${interpolated.scale})`,
                        opacity: interpolated.opacity
                    }}>
                    {!isCondensed &&
                        <h1 className="flex flex-col items-center justify-center">
                            <span className={text ? "text-[8px]" : ""}>{dayText}</span>
                            {/* span className="text-sm font-bold">{text}</span>*/}
                        </h1>}
                </div>
            )}
        </Motion>
    );
};
