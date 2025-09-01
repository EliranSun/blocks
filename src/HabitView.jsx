import { Views } from "./constants";
import CalendarView from "./CalendarView";
import { useState, useMemo } from "react";
import { getStorageByPrefix } from "./utils/strorage";
import { isSameMonth } from "date-fns";
const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const HabitView = ({ date, setView, habit, setDate }) => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const data = useMemo(() =>
        getStorageByPrefix(habit.name)
            .filter((item) => {
                if (selectedMonth) {
                    return isSameMonth(item.date, selectedMonth);
                }
                return true;
            })
            .filter((item) => item.value > -1), [habit.name, selectedMonth]);

    return (
        <>
            <div className="flex gap-4 w-full justify-center">
                <div className="flex flex-col justify-evenly font-mono text-sm bg-white/30 p-4 rounded-lg">
                    {Months.map((month, index) => (
                        <h2 key={index} onClick={() => {
                            if (selectedMonth?.getMonth() === index) {
                                setSelectedMonth(null);
                            } else {
                                setSelectedMonth(new Date(2025, index, 1));
                            }
                        }}>
                            {month.slice(0, 3)}
                        </h2>
                    ))}
                </div>
                <div className="bg-white/40 p-4 rounded-lg">
                    <CalendarView
                        date={date}
                        onTitleClick={() => setView(Views.HABITS)}
                        isCondensed
                        hideTitle
                        horizontal={false}
                        flex={false}
                        isOpaque
                        showLegend
                        showInfo
                        showFullYear={true}
                        calendar={habit}
                        selectedMonth={selectedMonth}
                        onDateChange={setDate} />
                </div>

                <div className="bg-white/30 p-4 h-fit rounded-lg text-lg font-mono w-16 text-center">
                    {data.length}
                </div>

            </div>
            <pre className="text-sm my-2 opacity-70 w-full p-4">
                {habit.description}
            </pre>
        </>
    )
}