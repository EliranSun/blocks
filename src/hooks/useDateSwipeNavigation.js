import { useSwipeable } from "react-swipeable";
import { useEffect } from "react";

export const useDateSwipeNavigation = (date, onDateChange) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                // Go to previous day
                const prevDate = new Date(date);
                prevDate.setDate(date.getDate() - 1);
                onDateChange(prevDate);
            } else if (event.key === "ArrowRight") {
                // Go to next day
                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() + 1);
                onDateChange(nextDate);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [date, onDateChange]);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            // Go to next day
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            onDateChange(nextDate);
        },
        onSwipedRight: () => {
            // Go to previous day
            const prevDate = new Date(date);
            prevDate.setDate(date.getDate() - 1);
            onDateChange(prevDate);
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return handlers;
};