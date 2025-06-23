import { getDaysInYear, startOfYear, addDays, getDay } from "date-fns";
import { useRef, useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import { Motion, spring, presets } from "react-motion";
import { useStreak } from "./hooks/useStreak";
import { useHighScore } from "./hooks/useHighScore";
import { Cell } from "./Cell";
import { Calendars } from "./constants";
import { exportCalendarData, triggerImport } from "./utils/dataManager";
import {
    CaretLeftIcon,
    CaretRightIcon,
    DownloadSimpleIcon,
    UploadSimpleIcon,
    XIcon,
    GridFourIcon,
    RowsIcon
} from "@phosphor-icons/react";

const date = new Date();

export default function CalendarView() {
    const calendarRef = useRef(null);
    const [calendar, setCalendar] = useState(Calendars[0]);
    const [isCondensed, setIsCondensed] = useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Use the streak and highscore hooks
    const { streak, calculateStreak } = useStreak(calendar.name, calendar.isGamified);
    const { highScore, calculateHighScore } = useHighScore(calendar.name, calendar.isGamified);

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

    const switchCalendar = (direction) => {
        setIsTransitioning(true);

        setTimeout(() => {
            const currentIndex = Calendars.indexOf(calendar);
            const newIndex = direction === 1
                ? (currentIndex + 1) % Calendars.length
                : (currentIndex - 1 + Calendars.length) % Calendars.length;
            setCalendar(Calendars[newIndex]);
            calculateStreak();
            calculateHighScore();

            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 150);
    };

    const handleExport = () => {
        exportCalendarData();
    };

    const handleImport = () => {
        triggerImport(false, () => {
            // Refresh streak and high score after import
            calculateStreak();
            calculateHighScore();
        });
    };

    return (
        <>
            <div
                className={classNames("fixed top-0 left-0 w-full h-full backdrop-blur-md z-50 p-4", {
                    "transition-opacity duration-300": true,
                    "opacity-0 pointer-events-none": !isCalendarModalOpen,
                    "opacity-100 pointer-events-auto": isCalendarModalOpen
                })}
            >
                <button
                    className="text-black bg-white rounded-full size-12 absolute bottom-5 right-5 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    onClick={() => setIsCalendarModalOpen(false)}
                    title="Close calendar selection">
                    <XIcon size={20} weight="bold" />
                </button>
                <div className="w-full h-full">
                    {Calendars.map((cal) => (
                        <div
                            key={cal.name}
                            className="text-base font-bold text-white hover:text-blue-500 active:text-blue-500"
                            onClick={() => {
                                setCalendar(cal);
                                setIsCalendarModalOpen(false);
                                calculateStreak();
                                calculateHighScore();
                            }}>
                            {cal.name.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div
                    className={classNames({
                        "flex fixed right-5 bottom-2 bg-neutral-900 p-4  max-w-96": true,
                        "items-center rounded-full z-10 justify-between shadow-xl": true,
                        "w-fit flex-col": isCondensed,
                        "flex-row w-full": !isCondensed
                    })}
                >
                    <h1 className={classNames("text-xl flex  px-2 font-bold cursor-pointer font-mono", {
                        "flex-col justify-center": isCondensed,
                        "flex-row items-center": !isCondensed
                    })}>
                        <button
                            className="text-black bg-white rounded-full size-10 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            onClick={() => switchCalendar(-1)}>
                            <CaretLeftIcon size={15} weight="bold" />
                        </button>
                        <span
                            className={classNames("text-xl font-bold  cursor-pointer font-mono hover:text-blue-400 transition-colors", {
                                "w-10": isCondensed,
                                "w-20 text-center": !isCondensed
                            })}
                            onClick={() => setIsCalendarModalOpen(true)}>
                            {calendar.name.toUpperCase().slice(0, 4)}
                        </span>
                        <button
                            className="text-black bg-white rounded-full size-10 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            onClick={() => switchCalendar(1)}>
                            <CaretRightIcon size={15} weight="bold" />
                        </button>
                    </h1>
                    {calendar.isGamified && (
                        <>
                            <Motion style={{ scale: spring(streak === 0 ? 1 : 1.2, presets.wobbly) }}>
                                {interpolated => (
                                    <span style={{ transform: `scale(${interpolated.scale})` }}>
                                        🔥 {streak}
                                    </span>
                                )}
                            </Motion>
                            <Motion style={{ scale: spring(highScore === 0 ? 1 : 1.2, presets.wobbly) }}>
                                {interpolated => (
                                    <span style={{ transform: `scale(${interpolated.scale})` }}>
                                        🏆 {highScore}
                                    </span>
                                )}
                            </Motion>
                        </>
                    )}
                    <div className={classNames("flex gap-2", {
                        "flex-col": isCondensed,
                        "flex-row items-center": !isCondensed
                    })}>
                        <button
                            onClick={handleExport}
                            className="p-2 text-white size-10 flex items-center justify-center rounded-full hover:bg-blue-600 transition-colors"
                            title="Export calendar data"
                        >
                            <UploadSimpleIcon size={18} weight="bold" />
                        </button>
                        <button
                            onClick={handleImport}
                            className="p-2 text-white size-10 flex items-center justify-center rounded-full hover:bg-blue-600 transition-colors"
                            title="Import calendar data"
                        >
                            <DownloadSimpleIcon size={18} weight="bold" />
                        </button>
                        <button
                            onClick={toggleView}
                            className="p-2 bg-white text-black size-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                            title={isCondensed ? "Expand view" : "Condense view"}
                        >
                            {isCondensed ? <GridFourIcon size={18} weight="bold" /> : <RowsIcon size={18} weight="bold" />}
                        </button>
                    </div>
                </div>
            </div>
            <div
                ref={calendarRef}
                className={classNames("grid grid-cols-7 justify-center gap-1 pb-40 transition-opacity duration-300", {
                    "gap-0.5": isCondensed,
                    "gap-1": !isCondensed,
                    "opacity-0": isTransitioning,
                    "opacity-100": !isTransitioning
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