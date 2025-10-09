const StreakLabel = ({ calendar, streak, alwaysShow }) => {
    if (!calendar.isGamified || (streak === 0 && !alwaysShow)) {
        return null;
    }

    return (
        <span className="text-red-300 dark:text-red-600">
            {streak}⽕
        </span>
    );
}

export default StreakLabel;