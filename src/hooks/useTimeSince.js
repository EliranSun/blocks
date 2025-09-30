import { useMemo } from "react";
import { isAfter, differenceInDays } from "date-fns";
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

    return differenceInDays(now, lastActivity);
};

export const useTimeSince = (calendarName) => {
    const diffDays = useMemo(() => {
        return timeSinceLastActivity(calendarName);
    }, [calendarName]);

    return diffDays;
};