import { getDurationsSortedByDate } from "../../utils/duration";
import { getDaysInYear, format, addDays, getDay, startOfYear } from "date-fns";
import classNames from "classnames";
import durationData from "../../export_2025_detailed.json";

// getTotalDuration
// const cssDuration = getTotalDuration(durationData);
const cssDurationByDate = getDurationsSortedByDate(durationData);

const firstDayOfYear = getDay(startOfYear(new Date()));
const calendarCells = [
    ...new Array(firstDayOfYear).fill(0).map((_, index) => {
        return {
            date: addDays(startOfYear(new Date()), index),
            isEmpty: true
        }
    }),
    ...new Array(getDaysInYear(new Date())).fill(0).map((_, index) => {
        const date = new Date(2025, 0, index + 1);
        const duration = cssDurationByDate.find(item => item[0] === format(date, "yyyy-MM-dd"));
        const value = duration ? duration[1] : 0;

        return {
            value,
            date: addDays(startOfYear(new Date()), index),
            isEmpty: false
        }
    })
];

const FACTOR = 0.25;

export const CalendarData = () => {
    return (
        <div className="border rounded-md p-4">
            <div className="grid grid-cols-7 gap-1 w-fit">
                {calendarCells.map((cell, index) => {
                    const value = cell.value;
                    const isEmpty = cell.isEmpty;

                    if (isEmpty) {
                        return <div key={index} className="size-2" />;
                    }

                    return (
                        <div key={index} className={classNames("size-2", {
                            "bg-amber-100": value < FACTOR * 1,
                            "bg-amber-200": value > FACTOR * 1,
                            "bg-amber-300": value > FACTOR * 3,
                            "bg-amber-400": value > FACTOR * 4,
                            "bg-amber-500": value > FACTOR * 5,
                            "bg-amber-600": value > FACTOR * 6,
                            "bg-amber-700": value > FACTOR * 7,
                            "bg-amber-800": value > FACTOR * 8,
                            "bg-amber-900": value > FACTOR * 9,
                        })}>

                        </div>
                    )
                })}</div>
        </div>
    )
}