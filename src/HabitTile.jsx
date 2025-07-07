/* eslint-disable */
import { useStreak } from "./hooks/useStreak";
import { useEffect, useMemo, useState } from "react";
import { Calendars } from "./constants";
import classNames from "classnames";
import { useTimeSince } from "./hooks/useTimeSince";
import CalendarView from "./CalendarView";
import { Motion, spring } from "react-motion";

export function HabitTile({ calendar }) {
    const { streak, calculateStreak } = useStreak(calendar.name, true);
    const diffDays = useTimeSince(calendar.name);
    const calendarColors = useMemo(() => Calendars.find(c => c.name === calendar.name)?.colors, [calendar.name]);
    const [isPressed, setIsPressed] = useState(false);
    const [triggerMark, setTriggerMark] = useState(0);

    useEffect(calculateStreak, [calendar.name]);

    const Icon = calendar.icon;

    const handleClick = () => {
        setIsPressed(true);
        setTriggerMark(triggerMark + 1);
        setTimeout(() => setIsPressed(false), 200);
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
                            {calendar.cols ? calendar.name : calendar.name.slice(0, 5)}
                        </h1>
                        <CalendarView
                            isCondensed
                            hideTitle
                            showInfo
                            flex
                            triggerMark={triggerMark}
                            limitInDays={calendar.cols ? 30 : 7}
                            calendar={calendar}
                        />
                        {calendar.isGamified && streak > 0 &&
                            <span className="text-xs font-mono absolute top-4 right-3">
                                {streak}🔥
                            </span>}
                    </div>
                </div>
            )}
        </Motion>
    );
}