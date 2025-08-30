import { useStreak } from "./hooks/useStreak";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useTimeSince } from "./hooks/useTimeSince";
import CalendarView from "./CalendarView";
import { Motion, spring } from "react-motion";
import { getStorageKey } from "./utils/strorage";

export function HabitTile({ calendar, date = new Date() }) {
    const { streak, calculateStreak } = useStreak(calendar.name, true);
    const diffDays = useTimeSince(calendar.name);
    const [isPressed, setIsPressed] = useState(false);
    const [triggerMark, setTriggerMark] = useState(0);
    const [todayValue, setTodayValue] = useState("-1");

    useEffect(calculateStreak, [calendar.name, calculateStreak]);

    useEffect(() => {
        setTodayValue(localStorage.getItem(getStorageKey(calendar.name, date)) || "-1");
    }, [date]);

    const Icon = calendar.icon;

    const handleClick = () => {
        setIsPressed(true);
        setTriggerMark(triggerMark + 1);
        setTimeout(() => {
            setIsPressed(false);
            const value = localStorage.getItem(getStorageKey(calendar.name, date)) || "-1";
            setTodayValue(value);
        }, 200);
    };

    return (
        <Motion
            style={{
                scale: spring(isPressed ? 1.05 : 1, {
                    stiffness: 400,
                    damping: 10
                })
            }}>
            {({ scale }) => (
                <div
                    onClick={handleClick}
                    style={{
                        transform: `scale(${scale})`,
                        cursor: 'pointer'
                    }}
                    className={classNames("bg-white/50 dark:bg-black/50 rounded-2xl p-4", {
                        // "border-2 border-amber-500": diffDays === 1,
                        "flex flex-col justify-between": true,
                        "size-28": !calendar.cols,
                        "h-28": calendar.cols > 0,
                    })}
                >
                    <span>
                        <Icon size={24} className={classNames({
                            "text-amber-500": calendar.primaryColor === "amber",
                            "text-green-500": calendar.primaryColor === "green",
                        })} />
                    </span>
                    <div className="space-y-1">
                        <h1 className="text-base uppercase font-bold">
                            {todayValue !== "-1" && calendar.colors[todayValue].name
                                ? calendar.colors[todayValue].name
                                : calendar.cols ? calendar.name : calendar.name.slice(0, 6)}
                        </h1>
                        <CalendarView
                            isCondensed
                            hideTitle
                            showInfo
                            flex
                            date={date}
                            calendar={calendar}
                            triggerMark={triggerMark}
                            limitInDays={
                                calendar.cols === 3
                                    ? 58
                                    : calendar.cols === 2
                                        ? 18 : 7}
                        />
                        {calendar.isGamified && streak > 0 &&
                            <span className="text-xs text-red-500 font-mono absolute top-4 right-3">
                                {streak}⽕
                            </span>}
                        {/*  (calendar.cols ? diffDays > 17 : diffDays > 7) && */}
                        {calendar.showTimeAgo &&
                            <span className="text-xs text-gray-500 font-mono absolute top-4 right-3">
                                {diffDays}永
                            </span>}
                    </div>
                </div>
            )}
        </Motion>
    );
}