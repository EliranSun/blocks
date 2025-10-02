import { useStreak } from "./hooks/useStreak";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
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
    if (!calendar.showTimeAgo && !alwaysShow || diffDays === 0) {
        return null;
    }

    if (diffDays === "Never" && !alwaysShow) {
        return "無"; // mo - none
    }

    return (
        <span className="">
            {diffDays}永
        </span>
    )
}

const Streak = ({ calendar, streak, alwaysShow }) => {
    if (!calendar.isGamified || (streak === 0 && !alwaysShow)) {
        return null;
    }

    return (
        <span className="text-red-300 dark:text-red-600">
            {streak}⽕
        </span>
    );
}

const FILL_DURATION = 1000;
const REVERT_DURATION = 200;

export function HabitTile({ calendar, date = new Date(), onHabitClick, titleOnly, showInfo = true }) {
    const { streak, calculateStreak } = useStreak(calendar.name, true);
    const diffDays = useTimeSince(calendar.name);
    const [isPressed, setIsPressed] = useState(false);
    const [triggerMark, setTriggerMark] = useState(0);
    const [todayValue, setTodayValue] = useState("-1");

    // Hold animation state
    const [isHolding, setIsHolding] = useState(false);
    const [fillProgress, setFillProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const animationRef = useRef(null);
    const startTimeRef = useRef(null);
    useEffect(calculateStreak, [calendar.name, calculateStreak]);

    useEffect(() => {
        setTodayValue(localStorage.getItem(getStorageKey(calendar.name, date)) || "-1");
    }, [date]);

    // fillProgress is now managed directly in handleClick to prevent flicker

    const Icon = calendar.icon;

    const handleClick = () => {
        setIsPressed(true);

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

        // Save to localStorage
        localStorage.setItem(getStorageKey(calendar.name, date), newValue);
        console.log('Saved to localStorage:', { key: getStorageKey(calendar.name, date), newValue });

        setTimeout(() => {
            setIsPressed(false);
            setTodayValue(newValue);
            setFillProgress(0); // Reset fillProgress at the same time as todayValue
            setIsTransitioning(false); // Clear transitioning flag
        }, 200);
    };

    // Animation functions
    const animateFill = useCallback((timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / FILL_DURATION, 1);

        console.log('animateFill:', { elapsed, progress });
        setFillProgress(progress);

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateFill);
        } else if (progress >= 1) {
            // Animation completed - trigger the click action
            console.log('Animation completed, triggering click');
            setIsHolding(false);
            // Keep fillProgress at 1 for forward animation since we're going to filled state
            handleClick();
        }
    }, [FILL_DURATION, handleClick]);

    const animateReverseFill = useCallback((timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / FILL_DURATION, 1);

        // For reverse fill, we go from 1 to 0
        setFillProgress(1 - progress);

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateReverseFill);
        } else if (progress >= 1) {
            // Animation completed - trigger the click action
            setIsHolding(false);
            setIsTransitioning(true); // Mark as transitioning to prevent flicker
            handleClick();
            // Don't reset fillProgress immediately - let handleClick manage the timing
        }
    }, [FILL_DURATION, handleClick]);

    const animateRevert = useCallback((timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / REVERT_DURATION, 1);
        const isReversing = todayValue !== "-1";

        if (isReversing) {
            // Reverting from empty back to full
            const currentProgress = fillProgress + (1 - fillProgress) * progress;
            setFillProgress(currentProgress);
        } else {
            // Reverting from full back to empty
            const currentProgress = fillProgress * (1 - progress);
            setFillProgress(currentProgress);
        }

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateRevert);
        } else {
            setFillProgress(isReversing ? 1 : 0);
        }
    }, [fillProgress, REVERT_DURATION, todayValue]);

    const handlePointerDown = useCallback((e) => {
        e.preventDefault();
        console.log('Pointer down triggered');

        const isCurrentlyFilled = todayValue !== "-1";

        if (isCurrentlyFilled) {
            // For filled tiles, start with full progress and animate to empty
            setFillProgress(1);
        } else {
            // For empty tiles, start from 0 and animate to full
            setFillProgress(0);
        }

        setIsHolding(true);
        startTimeRef.current = null;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        if (isCurrentlyFilled) {
            animationRef.current = requestAnimationFrame(animateReverseFill);
        } else {
            animationRef.current = requestAnimationFrame(animateFill);
        }
    }, [animateFill, animateReverseFill, todayValue]);

    const handlePointerUp = useCallback((e) => {
        console.log('Pointer up triggered');

        setIsHolding(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        // Use a timeout to get the current fillProgress value after state updates
        setTimeout(() => {
            setFillProgress(currentProgress => {
                const isCurrentlyFilled = todayValue !== "-1";
                const shouldRevert = (isCurrentlyFilled && currentProgress > 0) || (!isCurrentlyFilled && currentProgress < 1);

                console.log('Checking revert:', { currentProgress, isCurrentlyFilled, shouldRevert });

                if (shouldRevert) {
                    startTimeRef.current = null;
                    animationRef.current = requestAnimationFrame(animateRevert);
                }

                return currentProgress; // Don't change the progress here
            });
        }, 0);
    }, [animateRevert, todayValue]);

    const handlePointerLeave = useCallback(() => {
        handlePointerUp();
    }, [handlePointerUp]);

    // Cleanup animation on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

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

    // Debug logging
    console.log('HabitTile render:', { fillProgress, isHolding, todayValue });

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
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerLeave}
                    onMouseDown={handlePointerDown}
                    onMouseUp={handlePointerUp}
                    onMouseLeave={handlePointerLeave}
                    onTouchStart={handlePointerDown}
                    onTouchEnd={handlePointerUp}
                >
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
                        <Streak calendar={calendar} streak={streak} alwaysShow={true} />
                        <TimeAgo calendar={calendar} diffDays={diffDays} alwaysShow={true} />
                    </div>
                </div>
            )}
        </Motion>
    );
}