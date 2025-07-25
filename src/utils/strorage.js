import { format } from "date-fns";
import { Calendars } from "../constants";

export const getStorageByPrefix = (prefix) => {
    return Object
        .keys(localStorage)
        .filter(key =>
            key.toLowerCase().startsWith(prefix.toLowerCase()) &&
            !key.includes("tags") &&
            !key.includes("notes") &&
            !key.includes("thought")
        )
        .map(key => {
            const data = JSON.parse(localStorage.getItem(key));
            return {
                date: new Date(key.split("_")[1]).getTime(),
                value: data
            };
        })
        .sort((a, b) => b.date - a.date);
};

export const searchThoughts = (search) => {
    return Object.keys(localStorage)
        .filter(key => key.includes("thought_"))
        .map(key => {
            return {
                value: localStorage.getItem(key),
                category: new Date(key.split("_")[1]),
                date: new Date(key.split("_")[2]).getTime(),
            };
        })
        .filter(({ value }) => value.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b.date - a.date);
};

export const getStorageBySuffix = (suffix) => {
    return Object
        .keys(localStorage)
        .filter(key =>
            key.toLowerCase().endsWith(suffix.toLowerCase()) &&
            !key.includes("tags") &&
            !key.includes("notes") &&
            !key.includes("thought")
        )
        .map(key => {
            const data = JSON.parse(localStorage.getItem(key));
            return {
                date: new Date(key.split("_")[1]).getTime(),
                value: data,
                name: key.split("_")[0],
                key: key,
                calendar: Calendars.find(c => c.name === key.split("_")[0])
            };
        })
        .filter(item => item.value !== -1)
        .sort((a, b) => b.date - a.date);
};

export const formatDate = (date) => {
    return format(date, "yyyy-MM-dd"); // YYYY-MM-DD format
};

export const getStorageKey = (calendarName, date) => {
    return `${calendarName}_${formatDate(date)}`;
};