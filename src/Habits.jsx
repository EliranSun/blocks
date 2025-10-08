import { Categories } from "./constants";
import { HabitTile } from "./HabitTile";
import { Thought } from "./Thought";
import { HandPeaceIcon, MeteorIcon, SparkleIcon, YinYangIcon } from "@phosphor-icons/react";
import { format, startOfMonth, eachDayOfInterval, isToday } from "date-fns";
import classNames from "classnames";
// import { useDateSwipeNavigation } from "./hooks/useDateSwipeNavigation";
import { useEffect, useRef } from "react";
// import { useState } from "react";
import { CalendarIcon } from "@phosphor-icons/react";
const Icons = [
    HandPeaceIcon,
    MeteorIcon,
    SparkleIcon,
    YinYangIcon,
];

function getDaysFromMonthStart(currentDate) {
    const monthStart = startOfMonth(currentDate);
    const today = new Date();

    return eachDayOfInterval({
        start: monthStart,
        end: today
    });
}



const flatCategories = Categories.flatMap(category => [
    // { isHeader: true, name: category.name },
    ...category.calendars
]);

export const Habits = ({ date, onDateChange, onHabitClick }) => {
    // const handlers = useDateSwipeNavigation(date, onDateChange);
    const RandomIcon = Icons[Math.floor(Math.random() * Icons.length)];
    const scrollContainerRef = useRef(null);
    // const [selectedCategory, setSelectedCategory] = useState(Categories[0]);

    // Scroll to the end (today) when component mounts or date changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, []);

    return (
        <div className="flex flex-col space-y-8 w-full pt-4">
            <div className="fixed z-50 bottom-12 inset-x-0 mx-auto p-2 rounded-lg w-full overflow-x-auto" ref={scrollContainerRef}>
                <div className="flex px-2 gap-2">
                    {getDaysFromMonthStart(date).map((day) => {
                        const dayOfWeek = format(day, "EEE").toLowerCase();
                        const dayOfMonth = format(day, "d");
                        const isSelected = format(day, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
                        const isTodayDate = isToday(day);

                        return (
                            <button
                                key={format(day, "yyyy-MM-dd")}
                                onClick={() => onDateChange(day)}
                                className={classNames(
                                    "font-mono text-sm px-3 py-2 whitespace-nowrap rounded-2xl transition-colors",
                                    {
                                        "font-bold bg-black text-white dark:text-black dark:bg-white": isSelected,
                                        "text-amber-700 dark:text-amber-400 underline": isTodayDate && !isSelected,
                                        "bg-white text-black dark:text-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-800": !isSelected && !isTodayDate
                                    }
                                )}>
                                {dayOfWeek} {dayOfMonth}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="space-y-4">
                <div className="md:grid-cols-6 max-w-screen-md mx-auto flex-wrap grid grid-cols-3 gap-2">
                    {flatCategories.filter(calendar => !calendar.isHidden).map((calendar, index) => {
                        if (calendar.isHeader) {
                            return (
                                <HabitTile
                                    titleOnly
                                    calendar={{ icon: CalendarIcon, name: calendar.name }}
                                    date={date} />
                            );
                        }

                        return (
                            <div
                                key={calendar.name + index}
                                className={classNames({
                                    "col-span-3": calendar.cols === 3,
                                    "col-span-2": calendar.cols === 2,
                                })}>
                                <HabitTile
                                    key={calendar.name}
                                    calendar={calendar}
                                    date={date}
                                    showInfo={false}
                                    onHabitClick={() => onHabitClick(calendar)} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-center items-center my-32">
                <RandomIcon size={120} className="opacity-50" />
            </div>
        </div>
    )
}