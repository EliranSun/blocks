import { getDaysInYear, startOfYear, addDays, getDay } from "date-fns";
import { useRef, useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import { useStreak } from "./hooks/useStreak";
import { useHighScore } from "./hooks/useHighScore";
import { Cell } from "./Cell";
import { Calendars } from "./constants";

const date = new Date();

export default function CalendarView() {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(Calendars[0]);
    const [isCondensed, setIsCondensed] = useState(false);

    // Use the streak and highscore hooks
    const { streak, calculateStreak } = useStreak(calendar.name);
    const { highScore, calculateHighScore } = useHighScore(calendar.name);

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
    }, [date, firstDayOfYear, calendar]);

    useEffect(() => {
        calculateStreak();
        calculateHighScore();
    }, [calculateStreak, calculateHighScore]);

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

    const toggleView = () => {
        setIsCondensed(!isCondensed);
    };

    return (
        <>
            <div className={classNames({
                "flex fixed right-5 bottom-1 bg-neutral-900 p-4": true,
                "items-center rounded-full shadow-xl": true,
                "w-fit flex-col justify-between h-60": isCondensed,
                "w-3/4 flex-row gap-1 mx-auto": !isCondensed
            })}>
                <h1
                    className="text-xl px-2 font-bold cursor-pointer font-mono"
                    onClick={() => {
                        const currentIndex = Calendars.indexOf(calendar);
                        const nextIndex = (currentIndex + 1) % Calendars.length;
                        setCalendar(Calendars[nextIndex]);
                        calculateStreak();
                        calculateHighScore();
                    }}>
                    {calendar.name.toUpperCase().slice(0, 4)}
                </h1>
                {calendar.isGamified && (
                    <>
                        <span>🔥 {streak}</span>
                        <span>🏆 {highScore}</span>
                    </>
                )}
                <button
                    onClick={toggleView}
                    className="p-4 bg-blue-500 bg-white text-black size-10 
                    flex items-center justify-center
                    rounded-full hover:bg-blue-600 transition-colors"
                >
                    {isCondensed ? "+" : "-"}
                </button>
            </div>
            <div
                ref={calendarRef}
                className={classNames("grid grid-cols-7 justify-center gap-1", {
                    "gap-0.5": isCondensed,
                    "gap-1 w-full": !isCondensed
                })}>
                {calendarCells.map((cell, index) => {
                    if (cell.isEmpty) {
                        return <div className={isCondensed ? "size-2" : "size-10"} key={index} />;
                    }

                    return (
                        <Cell
                            key={index}
                            day={cell.day}
                            selectedDate={date}
                            calendarName={calendar.name}
                            cellDate={cell.date}
                            colors={calendar.colors}
                            isCondensed={isCondensed}
                            onCellMark={calculateStreak} />

                    )
                })}
            </div>
        </>
    )
}