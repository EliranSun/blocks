import { useMemo } from "react";
import { formatDate, getStorageBySuffix } from "../utils/strorage";

export const useHabitsByDay = (date) => {
    const habitsByDay = useMemo(() => {
        const formattedDate = formatDate(date);
        return getStorageBySuffix(formattedDate);
    }, [date]);

    return habitsByDay;
};