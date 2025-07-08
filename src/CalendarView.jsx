import { getDaysInYear, startOfYear, addDays, getDay, getDayOfYear } from "date-fns";
import { useRef, useEffect, useMemo } from "react";
import classNames from "classnames";
import { Cell } from "./Cell";

/* eslint-disable */
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
    date = new Date()
}) {
    const calendarRef = useRef(null);
    const firstDayOfYear = getDay(startOfYear(date));
    const todayIndex = useMemo(() => getDayOfYear(date), [date]);

    const calendarCells = useMemo(() => {
        const daysInYear = getDaysInYear(date);
        const cells = [];

        for (let i = 0; i < firstDayOfYear; i++) {
            cells.push({ isEmpty: true });
        }

        for (let i = 0; i < daysInYear; i++) {
            cells.push({
                isEmpty: false,
                day: i + 1,
                date: addDays(startOfYear(date), i)
            });
        }

        return cells;
    }, [firstDayOfYear]);

    useEffect(() => {
        if (calendarRef.current && !isCondensed) {
            // jump to today
            const today = new Date();
            const startOfCurrentYear = startOfYear(today);
            const daysSinceStartOfYear = Math.floor((today - startOfCurrentYear) / (1000 * 60 * 60 * 24));
            // Add the offset to account for empty cells at the beginning
            const todayCell = calendarRef.current.children[firstDayOfYear + daysSinceStartOfYear];
            if (todayCell) {
                setTimeout(() => {
                    todayCell.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 1000);
            }
        }
    }, [calendarRef, firstDayOfYear, isCondensed]);

    const Icon = calendar.icon;

    const slicedCells = useMemo(() => {
        if (limitInDays) {
            return calendarCells.slice(
                todayIndex - limitInDays + firstDayOfYear,
                todayIndex + firstDayOfYear
            );
        }

        return calendarCells;
    }, [calendarCells, todayIndex, limitInDays, firstDayOfYear]);

    return (
        <div className="shrink-0">
            {!hideTitle && isCondensed &&
                <h1 className="mb-4 text-sm font-mono text-center flex items-center justify-center gap-2">
                    <Icon size={16} />
                    <span className="">{calendar.name.slice(0, 4).toUpperCase()}</span>
                </h1>}
            <div
                ref={calendarRef}
                className={classNames({
                    "overflow-y-auto w-fit h-screen gap-1 pb-40": !isCondensed,
                    "transition-opacity duration-300": true,
                    "grid grid-cols-7 items-center": !flex,
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
                            colors={calendar.colors}
                            isCondensed={isCondensed}
                            onCellMark={onCellMark}
                            triggerMark={triggerMark}
                        />
                    )
                })}
            </div>
        </div>
    )
}