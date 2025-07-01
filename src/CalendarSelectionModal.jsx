import { Calendars } from "./constants";
import { Button } from "./Button";
import { XIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { useMemo } from "react";
import { isAfter } from "date-fns";

const getStorageByPrefix = (prefix) => {
    return Object
        .keys(localStorage)
        .filter(key => key.toLowerCase().startsWith(prefix.toLowerCase()))
        .map(key => {
            const data = JSON.parse(localStorage.getItem(key));
            return {
                date: new Date(key.split("_")[1]).getTime(),
                value: data
            }
        })
        .sort((a, b) => b.date - a.date);
}

const timeSinceLastActivity = (calendarName) => {
    const calendarData = getStorageByPrefix(calendarName + "_");

    if (calendarData.length === 0) {
        return "Never";
    }

    const lastActivity = calendarData.find(item => item.value !== -1)?.date;
    const now = new Date().getTime();

    if (isAfter(lastActivity, now)) {
        alert(JSON.stringify({ calendarName, lastActivity, now }));
        return NaN;
    }

    const diffTime = Math.abs(now - lastActivity);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

const Calendar = ({ calendar, setCalendar, setIsCalendarModalOpen }) => {
    const diffDays = useMemo(() => {
        return timeSinceLastActivity(calendar.name);
    }, [calendar.name]);

    return (
        <div
            key={calendar.name}
            className={classNames(
                "font-bold h-15 border text-xs flex items-center justify-center rounded-md",
                {
                    "border-white/30": isNaN(diffDays),
                    // Recent activity: green
                    "border-green-400 text-green-400 hover:text-green-600 active:text-green-600":
                        diffDays < 15,
                    // Moderate inactivity: amber/yellow
                    "border-amber-400 text-amber-400 hover:text-amber-400 active:text-amber-400":
                        diffDays >= 15 && diffDays < 30,
                    // Long inactivity: red + grayscale
                    "border-red-400 hover:text-red-500 text-red-400":
                        diffDays >= 30,
                }
            )}
            onClick={() => {
                setCalendar(calendar);
                setIsCalendarModalOpen(false);
            }}>
            <span className="text-left">
                {calendar.name.toUpperCase().slice(0, 4)}
                {/* {calendar.icon} */}
            </span>
        </div>
    )
};

export default function CalendarSelectionModal({
    isCalendarModalOpen,
    setIsCalendarModalOpen,
    setCalendar,
}) {
    return (
        <div
            className={classNames("fixed top-0 left-0 w-full h-full backdrop-brightness-50 backdrop-blur-xl z-50 p-4", {
                "transition-opacity duration-300": true,
                "opacity-0 pointer-events-none": !isCalendarModalOpen,
                "opacity-100 pointer-events-auto": isCalendarModalOpen,
                "flex items-center justify-center": true,
            })}
        >
            <Button
                className="absolute bottom-5 right-5 z-50 size-20"
                onClick={() => setIsCalendarModalOpen(false)}
                title="Close calendar selection">
                <XIcon size={32} weight="bold" />
            </Button>
            <div className="w-full grid grid-cols-3 gap-2 mb-10">
                {Calendars.map((calendar) => (
                    <Calendar
                        key={calendar.name}
                        calendar={calendar}
                        setCalendar={setCalendar}
                        setIsCalendarModalOpen={setIsCalendarModalOpen}
                    />
                ))}
            </div>
        </div>
    )
}