import { useStreak } from "./hooks/useStreak";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useTimeSince } from "./hooks/useTimeSince";
import CalendarView from "./CalendarView";
import { Motion, spring } from "react-motion";
import { getStorageKey } from "./utils/strorage";

/* eslint-disable */

const HabitName = ({ calendar, todayValue }) => {
    return (
        <h1 className="text-base uppercase font-bold">
            {todayValue !== "-1" && calendar.colors[todayValue].name
                ? calendar.colors[todayValue].name
                : calendar.name.slice(0, 3)}
        </h1>
    )
};



const TimeAgo = ({ calendar, diffDays }) => {
    if (!calendar.showTimeAgo) {
        return null;
    }

    if (diffDays === "Never") {
        return "無"; // mo - none
    }

    if (calendar.cols > 0 && diffDays > 17) {
        return (
            <span className="text-gray-500">
                {diffDays}永
            </span>
        )
    }

    if (diffDays > 7) {
        return (
            <span className="text-gray-500">
                {diffDays}永
            </span>
        )
    }

    return null;
}

const Streak = ({ calendar, streak }) => {
    if (!calendar.isGamified || streak === 0) {
        return null;
    }

    return (
        <span className="text-red-500">
            {streak}⽕
        </span>
    );
}

export function HabitTile({ calendar, date = new Date(), onHabitClick, titleOnly, showInfo = true }) {
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
                    style={{
                        transform: `scale(${scale})`,
                        cursor: 'pointer'
                    }}
                    className={classNames("bg-white/50 dark:bg-black/50 rounded-2xl p-4", {
                        "flex flex-col justify-between": true,
                        "h-24": titleOnly,
                        "h-full": !titleOnly,
                    })}
                >
                    <div
                        onClick={handleClick}
                        className="flex gap-1 items-center my-1">
                        <Icon size={23} className={classNames({
                            "hidden": titleOnly,
                            "text-amber-500": calendar.primaryColor === "amber",
                            "text-green-500": calendar.primaryColor === "green",
                        })} />
                        <HabitName calendar={calendar} todayValue={todayValue} />
                    </div>
                    <div className={classNames({
                        "hidden": titleOnly,
                    })}>
                        <CalendarView
                            isCondensed
                            hideTitle
                            showInfo={showInfo}
                            flex
                            onCellsClick={handleClick}
                            date={date}
                            calendar={calendar}
                            triggerMark={triggerMark}
                            limitInDays={
                                calendar.cols === 3
                                    ? 58
                                    : calendar.cols === 2
                                        ? 18 : 7}
                        />
                    </div>
                    {/* absolute top-4 right-3  */}
                    {/* <div onClick={onHabitClick} className="mt-4 flex items-center gap-1 font-mono text-xs">
                        <span >年</span>
                        <Streak calendar={calendar} streak={streak} />
                        <TimeAgo calendar={calendar} diffDays={diffDays} />
                    </div> */}
                </div>
            )}
        </Motion>
    );
}