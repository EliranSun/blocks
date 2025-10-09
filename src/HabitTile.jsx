import { useStreak } from "./hooks/useStreak";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useTimeSince } from "./hooks/useTimeSince";
import CalendarView from "./CalendarView";
import { Motion, spring } from "react-motion";
import { getStorageKey } from "./utils/strorage";
import HabitName from "./components/atoms/HabitName";
import SteakLabel from "./components/atoms/SteakLabel";
import TimeAgoLabel from "./components/atoms/TimeAgoLabel";
import { useTileProgressAnimation } from "./hooks/useTileProgressAnimation";


export function HabitTile({ calendar, date = new Date(), titleOnly, showInfo = true }) {
    const { streak, calculateStreak } = useStreak(calendar.name, true);
    const [triggerMark] = useState(0);
    const [todayValue, setTodayValue] = useState("-1");
    const diffDays = useTimeSince(calendar.name);

    const { isPressed, eventHandlers, fillProgress, isHolding, isTransitioning } = useTileProgressAnimation({
        todayValue,
        onAnimationComplete: () => {
            // Handle the actual state change logic directly
            const currentValue = localStorage.getItem(getStorageKey(calendar.name, date)) || "-1";
            let newValue;

            if (currentValue === "-1") {
                // If unmarked, go to first color (0)
                newValue = "0";
            } else if (parseInt(currentValue) < calendar.colors.length - 1) {
                // If not at last color, move to next color
                newValue = (parseInt(currentValue) + 1).toString();
            } else {
                // If at last color, go back to unmarked (-1)
                newValue = "-1";
            }

            localStorage.setItem(getStorageKey(calendar.name, date), newValue);
            setTodayValue(newValue);
        }
    });

    useEffect(calculateStreak, [calendar.name, calculateStreak]);

    useEffect(() => {
        setTodayValue(localStorage.getItem(getStorageKey(calendar.name, date)) || "-1");
    }, [date, calendar.name]);

    // fillProgress is now managed directly in handleClick to prevent flicker

    const Icon = calendar.icon;

    const currentColor = useMemo(() => {
        if (todayValue === "-1" && fillProgress === 0) {
            return null;
        }

        const colorConstant = calendar.colors[Number(todayValue)]?.color;
        const isStaticFilled = todayValue !== "-1" && colorConstant;

        // If we have static fill or animation progress, show filled state
        if (isStaticFilled || fillProgress > 0) {
            return `bg-black border-black text-white`;
        }

        return null;
    }, [calendar.colors, todayValue, fillProgress]);

    // Calculate dynamic styles for animation
    const dynamicStyles = useMemo(() => {
        const isStaticFilled = todayValue !== "-1";

        // During animation or transition, always use fillProgress
        // When not animating and not transitioning, use static state
        const effectiveFillProgress = (isHolding || fillProgress > 0 || isTransitioning)
            ? fillProgress
            : (isStaticFilled ? 1 : 0);

        console.log('dynamicStyles calc:', {
            isStaticFilled,
            isHolding,
            fillProgress,
            isTransitioning,
            effectiveFillProgress,
            todayValue
        });

        return {
            backgroundImage: effectiveFillProgress > 0
                ? `linear-gradient(to right, black ${effectiveFillProgress * 100}%, transparent ${effectiveFillProgress * 100}%)`
                : 'none',
            transition: isHolding ? 'none' : 'all 0.3s ease-out'
        };
    }, [fillProgress, todayValue, isHolding, isTransitioning]);

    // Calculate text color based on fill progress
    const textColor = useMemo(() => {
        const isStaticFilled = todayValue !== "-1";

        // During animation or transition, always use fillProgress
        // When not animating and not transitioning, use static state
        const effectiveFillProgress = (isHolding || fillProgress > 0 || isTransitioning)
            ? fillProgress
            : (isStaticFilled ? 1 : 0);

        if (effectiveFillProgress > 0.5) {
            return 'text-white';
        } else if (effectiveFillProgress > 0) {
            // Transition zone - could be implemented with CSS mix-blend-mode or gradient text
            return 'text-gray-800 dark:text-gray-200';
        }
        return '';
    }, [fillProgress, todayValue, isHolding, isTransitioning]);

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
                        cursor: 'pointer',
                        ...dynamicStyles
                    }}
                    className={classNames(textColor, "border relative overflow-hidden select-none", {
                        "p-4": true,
                        "border-1 border-black/50 dark:border-white/50": !currentColor,
                        "border-1 border-black": currentColor,
                        "flex flex-col gap-0": true,
                        "h-24": titleOnly,
                        "h-full min-h-24": !titleOnly,
                    })}
                    {...eventHandlers}>
                    <div
                        className="flex flex-col gap-1 items-start justify-start relative z-10 pointer-events-none">
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
                        "hidden": titleOnly,
                    })}>
                        <CalendarView
                            isCondensed
                            hideTitle
                            showInfo={showInfo}
                            flex
                            // onCellsClick={handleClick}
                            grayscale
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
                    <div className="flex items-center gap-1 font-mono text-sm relative z-10 pointer-events-none">
                        <SteakLabel calendar={calendar} streak={streak} alwaysShow={true} />
                        <TimeAgoLabel calendar={calendar} diffDays={diffDays} alwaysShow={true} />
                    </div>
                </div>
            )}
        </Motion>
    );
}