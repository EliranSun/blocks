import { useSwipeable } from "react-swipeable";

export const useDateSwipeNavigation = (date, onDateChange) => {
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