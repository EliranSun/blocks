import { Calendars, Colors } from "./constants";
import { Button } from "./Button";
import { XIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { useTimeSince } from "./hooks/useTimeSince";

const Calendar = ({ calendar, setCalendar, setIsCalendarModalOpen }) => {
    const diffDays = useTimeSince(calendar.name);
    const Icon = calendar.icon;

    return (
        <div
            key={calendar.name}
            onClick={() => {
                setCalendar(calendar);
                setIsCalendarModalOpen(false);
            }}
            className={classNames(
                "font-bold h-15 border flex flex-col items-center justify-center rounded-md",
                {
                    "border-white/30": isNaN(diffDays),
                    // Recent activity: green
                    [`border-${Colors.GREEN}-400 text-${Colors.GREEN}-400 hover:text-${Colors.GREEN}-600 active:text-${Colors.GREEN}-600`]:
                        diffDays < 15,
                    // Moderate inactivity: amber/yellow
                    [`border-${Colors.AMBER}-400 text-${Colors.AMBER}-400 hover:text-${Colors.AMBER}-400 active:text-${Colors.AMBER}-400`]:
                        diffDays >= 15 && diffDays < 30,
                    // Long inactivity: red + grayscale
                    [`border-${Colors.RED}-400 hover:text-${Colors.RED}-500 text-${Colors.RED}-400`]:
                        diffDays >= 30,
                }
            )}>
            <Icon size={20} />
            <span className="text-[8px] opacity-50">
                {calendar.name.toUpperCase().slice(0, 3)}
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