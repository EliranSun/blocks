import { Calendars } from "./constants";
import { Button } from "./Button";
import { XIcon } from "@phosphor-icons/react";
import classNames from "classnames";

export default function CalendarSelectionModal({
    isCalendarModalOpen,
    setIsCalendarModalOpen,
    setCalendar,
}) {
    return (
        <div
            className={classNames("fixed top-0 left-0 w-full h-full backdrop-blur-md z-50 p-4", {
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
                {Calendars.map((cal) => (
                    <div
                        key={cal.name}
                        className="text-base font-bold h-15 border border-white/30 flex items-center justify-center rounded-md
                         text-white hover:text-blue-500 active:text-blue-500"
                        onClick={() => {
                            setCalendar(cal);
                            setIsCalendarModalOpen(false);
                        }}>
                        {cal.name.toUpperCase().slice(0, 4)}
                    </div>
                ))}
            </div>
        </div>
    )
}