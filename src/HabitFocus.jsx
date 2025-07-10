import { useMemo, useState } from "react";
import { getStorageByPrefix, formatDate } from "./utils/strorage";
import { Calendars } from "./constants";
import classNames from "classnames";

const Note = ({ habitName, date }) => {
    const [notes, setNotes] = useState(localStorage.getItem(`${habitName}_notes_${formatDate(date)}`));

    return (
        <input type="text"
            className="border border-white/50 rounded-md px-1 py-2 font-mono w-full"
            value={notes}
            onChange={(e) => {
                setNotes(e.target.value);
                localStorage.setItem(`${habitName}_notes_${formatDate(date)}`, e.target.value);
            }}
        />
    )
}
export const HabitFocus = ({ habitName }) => {
    const storageData = useMemo(() => getStorageByPrefix(habitName), [habitName]);

    console.log(storageData);

    return (
        <div className="bg-white/50 dark:bg-black/50 rounded-lg p-4 w-full">
            <h1>{habitName}</h1>
            <div className="flex flex-col">
                {storageData.map((item) => {
                    const color = Calendars.find(calendar => calendar.name === habitName)?.colors[item.value];
                    if (!color) return null;

                    return (
                        <div key={item.date} className={classNames(
                            "flex items-center justify-center w-full gap-2")}>
                            <span className={classNames(
                                "flex items-center justify-center",
                                "text-white text-xs rounded p-2 size-8 overflow-hidden",
                                color.className)
                            }>
                                {color.name.slice(0, 2).toUpperCase()}
                            </span>
                            <Note habitName={habitName} date={item.date} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};