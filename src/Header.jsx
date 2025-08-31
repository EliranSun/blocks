import { Views } from "./constants";
import classNames from "classnames";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { CalendarActionsBar } from "./CalendarActionsBar";
import { useMemo, useRef } from "react";

export const Header = ({
    view,
    setView,
    date,
    habitName,
    habitIcon: HabitIcon,
    onTitleClick,
    setIsDateSelectionOpen,
}) => {
    const isNight = date.getHours() < 6 || date.getHours() > 18;
    const headerRef = useRef(null);
    const title = useMemo(() => {
        if (habitName) {
            return habitName.toUpperCase();
        }

        const isToday = date.toDateString() === new Date().toDateString();
        if (isToday) {
            if (isNight) return "Tonight"
            return "Today";
        }

        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    }, [date, isNight, habitName]);

    const isVisible = view === Views.HABITS || view === Views.HOME || view === Views.HABIT;

    return (
        <div
            ref={headerRef}
            className={classNames(
                "w-full flex items-center justify-between pb-4 sticky",
                "top-0 bg-[#ece1d4] dark:bg-[#242424] z-10"
            )}>
            <h1
                onClick={() => {
                    if (onTitleClick && habitName) {
                        onTitleClick();
                    } else {
                        setIsDateSelectionOpen(true);
                    }
                }}
                className={classNames({
                    "text-4xl font-bold merriweather-500 flex items-center gap-4": true,
                    "opacity-70": isVisible,
                    "opacity-0": !isVisible,
                })}>
                {HabitIcon ? <HabitIcon size={40} />
                    : isNight ? <MoonIcon size={40} /> : <SunIcon size={40} />}
                {title}
            </h1>
            <CalendarActionsBar
                onSettingsClick={() => view === Views.SETTINGS
                    ? setView(Views.HOME)
                    : setView(Views.SETTINGS)} />
        </div>
    )
}