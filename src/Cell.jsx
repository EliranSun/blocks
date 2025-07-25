import classNames from "classnames";
import { format, isSameDay } from "date-fns";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Motion, spring, presets } from "react-motion";

const DayText = ({ dayText, text, showInfo, isStartOfMonth, isCondensed }) => {
    if (isCondensed) {
        return null;
    }

    if (isStartOfMonth) {
        return <h1>{dayText}</h1>;
    }

    if (showInfo) {
        return (
            <h1 className="flex flex-col items-center justify-center text-[6px]">
                <span className="text-white">{dayText}</span>
                <span className="font-bold">{text}</span>
            </h1>
        );
    }

    if (isStartOfMonth) {
        return <h1>{dayText}</h1>;
    }

    return null;
};

export const Cell = ({
    cellDate,
    calendarName,
    colors = [],
    isCondensed = false,
    onCellMark = () => { },
    showInfo = false,
    triggerMark,
    selectedDate = new Date(),
    isOpaque = false,
    selectedColorIndex = null
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

    const isCellSelected = useMemo(() => isSameDay(cellDate, selectedDate), [cellDate, selectedDate]);

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

    useEffect(() => {
        if (triggerMark > 0 && isCellSelected) {
            handleMark(true);
        }
    }, [triggerMark, isCellSelected]);

    const text = useMemo(() => {
        if (isMarked && colors[colorIndex]?.name) {
            return colors[colorIndex]?.name.slice(0, 3);
        }

        return null;
    }, [isMarked, colorIndex, colors]);

    const dayText = useMemo(() => {
        if (dayNumber === "1") {
            return monthName;
        }
        return dayNumber;
    }, [dayNumber, monthName]);

    const isStartOfMonth = useMemo(() => isNaN(dayText), [dayText]);
    const isColorSelected = (selectedColorIndex === colorIndex);
    
    return (
        <Motion style={{
            scale: spring(isAnimating ? 1.2 : 1, presets.wobbly),
            opacity: spring(
                 selectedColorIndex !== null
                    ? isColorSelected ? 1 : 0
                    : isMarked ? 1 : 0.9
            )
        }}>
            {interpolated => (
                <>
                    {!isCondensed && isStartOfMonth && new Array(14).fill(null).map((_, index) => (
                        <div key={index} className="size-8 bg-transparent rounded-md"></div>
                    ))}
                    <div
                        onClick={() => {
                            if (triggerMark > 0) {
                                return;
                            }

                            handleMark();
                        }}
                        className={classNames("cursor-pointer", currentColor, {
                            "bg-neutral-700": !isCellSelected && !isMarked && !isOpaque,
                            "size-12 flex items-center justify-center rounded-md": !isCondensed,
                            "size-[9px] rounded-xs": isCondensed,
                            "border-1 shadow": isCellSelected,
                            "border border-black/50": isOpaque,
                        })}
                        style={{
                            transform: `scale(${interpolated.scale})`,
                            opacity: interpolated.opacity
                        }}>
                        <DayText
                            dayText={dayText}
                            text={text}
                            showInfo={showInfo}
                            isStartOfMonth={isStartOfMonth}
                            isCondensed={isCondensed}
                        />
                    </div>
                </>
            )}
        </Motion>
    );
};
