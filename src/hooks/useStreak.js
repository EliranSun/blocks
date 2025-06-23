import { useState, useMemo, useCallback } from 'react';
import { subDays, startOfYear, isBefore, format } from 'date-fns';

export const useStreak = (calendarName) => {
    const [streak, setStreak] = useState(0);

    const calculateStreak = useCallback(() => {
        let currentStreak = 0;
        const today = new Date();

        // First check if today is marked - if not, no active streak
        const todayString = format(today, "yyyy-MM-dd");
        const todayKey = `${calendarName}_${todayString}`;
        const storedValue = localStorage.getItem(todayKey);
        const isTodayMarked = storedValue !== "-1" && storedValue !== null;

        console.debug({
            isTodayMarked,
            todayKey,
            storedValue,
        });

        if (!isTodayMarked) {
            return 0;
        }

        // If today is marked, count backwards until we find an unmarked day
        let currentDate = today;
        currentStreak = 1; // Start at 1 since we know today is marked

        while (true) {
            // Get previous day
            currentDate = subDays(currentDate, 1);

            // Stop if we've gone too far back (e.g., previous year)
            if (isBefore(currentDate, startOfYear(new Date()))) {
                break;
            }

            const dateString = currentDate.toISOString().split('T')[0];
            const storageKey = `${calendarName}_${dateString}`;
            const storedValue = localStorage.getItem(storageKey);
            const isMarked = storedValue !== "-1" && storedValue !== null;

            if (!isMarked) {
                break; // Break on first unmarked day
            }

            currentStreak++;
        }

        console.log({
            currentStreak,
            currentDate,
            today,
            todayString,
            todayKey,
        });
        setStreak(currentStreak);
    }, [calendarName]);

    return { streak, calculateStreak };
}; 