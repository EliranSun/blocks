/* eslint-disable */
import { format, isToday, startOfMonth, eachDayOfInterval } from "date-fns";
import classNames from "classnames";
import { useRef, useEffect } from "react";

function getDaysFromMonthStart(currentDate) {
    const monthStart = startOfMonth(currentDate);
    const today = new Date();

    return eachDayOfInterval({
        start: monthStart,
        end: today
    });
}

export const DateNavigation = ({ date, onDateChange }) => {
    const scrollContainerRef = useRef(null);

    // Scroll to the end (today) when component mounts or date changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, []);

    return (
        <div className="fixed left-0 right-0 top-20 bg-[#ece1d4] dark:bg-[#242424] z-10 
        mx-auto p-2 rounded-lg overflow-x-auto" ref={scrollContainerRef}>
            <div className="flex gap-2">
                {getDaysFromMonthStart(date).map((day) => {
                    const dayOfWeek = format(day, "EEE").toLowerCase();
                    const dayOfMonth = format(day, "d");
                    const isSelected = format(day, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
                    // const isTodayDate = isToday(day);

                    return (
                        <button
                            key={format(day, "yyyy-MM-dd")}
                            onClick={() => onDateChange(day)}
                            className={classNames({
                                "font-mono text-sm px-3 py-2 whitespace-nowrap": true,
                                "text-amber-700 font-black": isSelected,
                                // "font-mono text-sm px-3 py-2 whitespace-nowrap rounded-2xl transition-colors": true,
                                // "font-bold bg-black text-white dark:text-black dark:bg-white": isSelected,
                                // "text-amber-700 dark:text-amber-400 underline": isTodayDate && !isSelected,
                                // "bg-white text-black dark:text-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-800": !isSelected && !isTodayDate
                            })}>
                            {dayOfWeek} {dayOfMonth}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}