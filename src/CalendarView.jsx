import { getDaysInYear, startOfYear, addDays, getDay, getDayOfYear } from "date-fns";
import { useRef, useState, useMemo } from "react";
import classNames from "classnames";
import { Cell } from "./Cell";
import { Calendars } from "./constants";

export default function CalendarView({
    calendar,
    isCondensed,
    isTransitioning,
    showInfo,
    onCellMark,
    hideTitle,
    limitInDays,
    flex,
    triggerMark,
    date = new Date(),
    showFullYear = true,
    horizontal = false,
    isOpaque = false,
    showLegend = false,
    onCellsClick,
    onTitleClick,
}) {
    const calendarRef = useRef(null);
    const firstDayOfYear = getDay(startOfYear(date));
    const todayIndex = useMemo(() => getDayOfYear(date), [date]);
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);

    const calendarCells = useMemo(() => {
        const daysInYear = getDaysInYear(date);
        const cells = [];

        for (let i = 0; i < firstDayOfYear; i++) {
            cells.push({ isEmpty: true });
        }

        for (let i = 0; i < daysInYear; i++) {
            if (!showFullYear) {
                if (i >= todayIndex) {
                    continue;
                }
            }

            cells.push({
                isEmpty: false,
                day: i + 1,
                date: addDays(startOfYear(date), i)
            });
        }

        return cells;
    }, [firstDayOfYear, date, showFullYear, todayIndex]);

    // useEffect(() => {
    //     if (calendarRef.current && !isCondensed) {
    //         // jump to today
    //         const today = new Date();
    //         const startOfCurrentYear = startOfYear(today);
    //         const daysSinceStartOfYear = Math.floor((today - startOfCurrentYear) / (1000 * 60 * 60 * 24));
    //         // Add the offset to account for empty cells at the beginning
    //         const todayCell = calendarRef.current.children[firstDayOfYear + daysSinceStartOfYear];
    //         if (todayCell) {
    //             setTimeout(() => {
    //                 todayCell.scrollIntoView({
    //                     behavior: "smooth",
    //                     block: horizontal ? "nearest" : "start",
    //                     inline: horizontal ? "start" : "nearest",
    //                 });
    //             }, 1000);
    //         }
    //     }
    // }, [calendarRef, firstDayOfYear, isCondensed, horizontal]);

    const Icon = calendar.icon;

    const slicedCells = useMemo(() => {
        if (limitInDays) {
            const start = todayIndex - limitInDays + firstDayOfYear;
            const end = todayIndex + firstDayOfYear;
            return calendarCells.slice(
                start < 0 ? 0 : start,
                end > calendarCells.length ? calendarCells.length : end
            );
        }

        return calendarCells;
    }, [calendarCells, todayIndex, limitInDays, firstDayOfYear]);

    return (
        <div className="flex flex-col items-start justify-center h-fit">
            {!hideTitle && isCondensed &&
                <h1
                    onClick={onTitleClick}
                    className="text-xl merriweather-500 py-4 font-mono text-center flex items-center justify-center gap-2">
                    <Icon size={16} />
                    <span className="">{calendar.name.toUpperCase()}</span>
                </h1>}
            <div
                ref={calendarRef}
                onClick={onCellsClick}
                style={{ cursor: "pointer" }}
                className={classNames({
                    "overflow-y-auto w-fit h-screen gap-1 pb-40": !isCondensed && !horizontal,
                    "overflow-x-auto h-fit w-screen gap-1 pr-40": !isCondensed && horizontal,
                    "transition-opacity duration-300": true,
                    "grid grid-cols-7 items-center": !flex && !horizontal,
                    "grid grid-rows-7 grid-flow-col items-center": !flex && horizontal,
                    "flex flex-wrap": flex,
                    "gap-[2px] w-fit h-fit": isCondensed,
                    "opacity-0": isTransitioning,
                    "opacity-100": !isTransitioning
                })}>
                {slicedCells.map((cell, index) => {
                    if (cell.isEmpty) {
                        return <div className={isCondensed ? "size-2" : "size-8"} key={index} />;
                    }

                    return (
                        <Cell
                            key={index}
                            day={cell.day}
                            selectedDate={date}
                            calendarName={calendar.name}
                            cellDate={cell.date}
                            showInfo={showInfo}
                            selectedColorIndex={selectedColorIndex}
                            isOpaque={isOpaque}
                            colors={calendar.colors}
                            isCondensed={isCondensed}
                            onCellMark={onCellMark}
                            triggerMark={triggerMark}
                        />
                    )
                })}
            </div>
            {showLegend &&
                <legend className="flex items-center justify-center gap-2 pt-2">
                    {Calendars.find(c => c.name === calendar.name).colors.map((color, index) => (
                        <span key={index}
                            onClick={() => setSelectedColorIndex(index)}
                            className={classNames(
                                "rounded text-[8px] w-fit h-fit p-2",
                                color.isDark ? "text-white" : "text-black",
                                color.className
                            )}>
                            {color.name}
                        </span>
                    ))}
                </legend>}
        </div>
    )
}