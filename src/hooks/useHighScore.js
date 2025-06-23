import { useState, useCallback } from 'react';
import { eachDayOfInterval, startOfYear, endOfYear, format } from 'date-fns';

export const useHighScore = (calendarName) => {
    const [highScore, setHighScore] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem(`${calendarName}_highscore`);
        return saved ? parseInt(saved, 10) : 0;
    });

    const calculateHighScore = useCallback(() => {
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
            localStorage.setItem(`${calendarName}_highscore`, maxStreak.toString());
        }
    }, [highScore, calendarName]);

    return { highScore, calculateHighScore };
}; 