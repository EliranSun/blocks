import { useState, useCallback, useEffect } from 'react';
import { eachDayOfInterval, startOfYear, endOfYear, format } from 'date-fns';

export const useHighScore = (calendarName, isActive) => {
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        setHighScore(0);
    }, [calendarName]);

    const calculateHighScore = useCallback(() => {
        if (!isActive) {
            setHighScore(0);
            return;
        }

        const start = startOfYear(new Date());
        const end = endOfYear(new Date());
        const allDays = eachDayOfInterval({ start, end });

        let maxStreak = 0;
        let currentStreak = 0;

        // Go through each day of the year
        allDays.forEach((date) => {
            const dateString = format(date, "yyyy-MM-dd");
            const storageKey = `${calendarName}_${dateString}`;
            const storedValue = localStorage.getItem(storageKey);
            const isMarked = storedValue !== "-1" && storedValue !== null;

            if (isMarked) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        });

        // Update high score if we found a higher streak
        if (maxStreak > highScore) {
            setHighScore(maxStreak);
        }
    }, [highScore, calendarName, isActive]);

    return { highScore, calculateHighScore };
}; 