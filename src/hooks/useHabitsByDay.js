import { useMemo } from "react";
import { formatDate, getStorageBySuffix } from "../utils/strorage";

export const useHabitsByDay = (name, date) => {
    const habitsByDay = useMemo(() => {
        const formattedDate = formatDate(date);
        return getStorageBySuffix(name, formattedDate);
    }, [date]);

    return habitsByDay;
};