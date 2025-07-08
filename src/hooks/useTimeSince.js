import { useMemo } from "react";
import { isAfter } from "date-fns";
import { getStorageByPrefix } from "../utils/strorage";

const timeSinceLastActivity = (calendarName) => {
    const calendarData = getStorageByPrefix(calendarName + "_");

    if (calendarData.length === 0) {
        return "Never";
    }

    const lastActivity = calendarData.find(item => item.value !== -1)?.date;
    const now = new Date().getTime();

    if (isAfter(lastActivity, now)) {
        return NaN;
    }

    const diffTime = Math.abs(now - lastActivity);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

export const useTimeSince = (calendarName) => {
    const diffDays = useMemo(() => {
        return timeSinceLastActivity(calendarName);
    }, [calendarName]);

    return diffDays;
};