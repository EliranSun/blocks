import { getDaysInYear, startOfYear, addDays, getDay } from "date-fns";
import { useRef, useEffect, useMemo } from "react";
import classNames from "classnames";
import { Cell } from "./Cell";

const date = new Date();


export default function CalendarView({
    calendar,
    isCondensed,
    isTransitioning,
    showInfo,
    onCellMark,
}) {
    const calendarRef = useRef(null);
    const firstDayOfYear = getDay(startOfYear(date));

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
                        block: "center",
                        inline: "center"
                    });
                }, 1000);
            }
        }
    }, [calendarRef, firstDayOfYear, isCondensed]);


    return (
        <div className="shrink-0">
            {isCondensed && <h1 className="mb-4 text-center">{calendar.icon}</h1>}
            <div
                ref={calendarRef}
                className={classNames({
                    "overflow-y-auto w-fit h-screen gap-1": !isCondensed,
                    "pb-40 transition-opacity duration-300": true,
                    "grid grid-cols-7 justify-center ": true,
                    "gap-[2px]": isCondensed,
                    "gap-": !isCondensed,
                    "opacity-0": isTransitioning,
                    "opacity-100": !isTransitioning
                })}>
                {calendarCells.map((cell, index) => {
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
                        />
                    )
                })}
            </div>
        </div>
    )
}