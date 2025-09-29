import { useStreak } from "./hooks/useStreak";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useTimeSince } from "./hooks/useTimeSince";
import CalendarView from "./CalendarView";
import { Motion, spring } from "react-motion";
import { getStorageKey } from "./utils/strorage";

/* eslint-disable */

const HabitName = ({ calendar, todayValue, sliceTitle }) => {
    return (
        <h1 className="text-base uppercase font-bold">
            {todayValue !== "-1" && calendar.colors[todayValue].name
                ? calendar.colors[todayValue].name
                : sliceTitle ? calendar.name.slice(0, 6) : calendar.name}
        </h1>
    )
};



const TimeAgo = ({ calendar, diffDays, alwaysShow }) => {
    if (!calendar.showTimeAgo && !alwaysShow) {
        return null;
    }

    if (diffDays === "Never" && !alwaysShow) {
        return "無"; // mo - none
    }

    if (calendar.cols > 0 && diffDays > 17) {
        return (
            <span className="">
                {diffDays}永
            </span>
        )
    }

    if (diffDays > 1) {
        return (
            <span className="">
                {diffDays}永
            </span>
        )
    }

    return null;
}

const Streak = ({ calendar, streak, alwaysShow }) => {
    if (!calendar.isGamified || (streak === 0 && !alwaysShow)) {
        return null;
    }

    return (
        <span className="">
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

    const currentColor = useMemo(() => {
        if (todayValue === "-1") {
            return null;
        }

        return calendar.colors[Number(todayValue)]?.className;
    }, [calendar.colors, todayValue]);

    console.log(calendar.name, { calendar });

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
                    className={classNames(currentColor, {
                        "rounded-2xl p-4": true,
                        "text-white": currentColor,
                        "bg-white/50 dark:bg-black/50": !currentColor,
                        "flex flex-col gap-0 border-1 border-black/20": true,
                        "h-24": titleOnly,
                        "h-full min-h-24": !titleOnly,
                    })}
                >
                    <div
                        onClick={handleClick}
                        className="flex flex-col gap-1 items-start justify-start">
                        <Icon size={30} className={classNames({
                            "hidden": titleOnly,
                            // "text-amber-500": calendar.primaryColor === "amber",
                            // "text-green-500": calendar.primaryColor === "green",
                        })} />
                        <HabitName
                            calendar={calendar}
                            todayValue={todayValue}
                            sliceTitle={!calendar.cols || calendar.cols <= 1}
                        />
                    </div>
                    <div className={classNames({
                        // "hidden": titleOnly,
                        "hidden": true,
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
                    {/* absolute top-4 right-3   */}
                    <div onClick={handleClick} className="flex items-center gap-1 font-mono text-sm">
                        <Streak calendar={calendar} streak={streak} alwaysShow={true} />
                        <TimeAgo calendar={calendar} diffDays={diffDays} alwaysShow={true} />
                    </div>
                </div>
            )}
        </Motion>
    );
}