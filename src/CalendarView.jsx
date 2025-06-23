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
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

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
    }, [firstDayOfYear]);

    useEffect(() => {
        calculateStreak();
        calculateHighScore();
    }, [calendar]);

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
            <div className={classNames("fixed top-0 left-0 w-full h-full backdrop-blur-md z-50 p-4", {
                "hidden": !isCalendarModalOpen,
                "block": isCalendarModalOpen
            })}>
                <button
                    className="text-black bg-white rounded-full size-15 absolute bottom-5 right-5"
                    onClick={() => {
                        setIsCalendarModalOpen(false);
                    }}>
                    {'X'}
                </button>
                <div className="w-full h-full">
                    {Calendars.map((calendar) => (
                        <div
                            key={calendar.name}
                            className="text-base font-bold text-white
                        hover:text-blue-500 active:text-blue-500"
                            onClick={() => {
                                setCalendar(calendar);
                                setIsCalendarModalOpen(false);
                                calculateStreak();
                                calculateHighScore();
                            }}>
                            {/* {calendar.icon} */}
                            {calendar.name.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
            <div className={classNames({
                "flex fixed right-5 bottom-2 bg-neutral-900 p-4 w-full max-w-96": true,
                "items-center rounded-full justify-between shadow-xl": true,
                "w-fit flex-col h-60": isCondensed,
                "w-3/4 flex-row": !isCondensed
            })}>
                <h1
                    className="text-xl px-2 font-bold cursor-pointer font-mono space-x-2"
                >
                    <button
                        className="text-black bg-white rounded-full size-10"
                        onClick={() => {
                            const currentIndex = Calendars.indexOf(calendar);
                            const prevIndex = (currentIndex - 1 + Calendars.length) % Calendars.length;
                            setCalendar(Calendars[prevIndex]);
                            calculateStreak();
                            calculateHighScore();
                        }}>{'<'}</button>
                    <span
                        className="text-xl px-2 font-bold cursor-pointer font-mono"
                        onClick={() => {
                            setIsCalendarModalOpen(true);
                        }}>
                        {calendar.name.toUpperCase().slice(0, 4)}
                    </span>
                    <button
                        className="text-black bg-white rounded-full size-10"
                        onClick={() => {
                            const currentIndex = Calendars.indexOf(calendar);
                            const nextIndex = (currentIndex + 1) % Calendars.length;
                            setCalendar(Calendars[nextIndex]);
                            calculateStreak();
                            calculateHighScore();
                        }}>{'>'}</button>
                </h1>
                {calendar.isGamified && (
                    <>
                        <span>🔥 {streak}</span>
                        <span>🏆 {highScore}</span>
                    </>
                )}
                <button
                    onClick={toggleView}
                    className="p-4 bg-white text-black size-10 
                    flex items-center justify-center
                    rounded-full hover:bg-blue-600 transition-colors"
                >
                    {isCondensed ? "+" : "-"}
                </button>
            </div>
            <div
                ref={calendarRef}
                className={classNames("grid grid-cols-7 justify-center gap-1 pb-40", {
                    "gap-0.5": isCondensed,
                    "gap-1": !isCondensed
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