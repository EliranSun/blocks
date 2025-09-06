import { Categories } from "./constants";
import { HabitTile } from "./HabitTile";
import { Thought } from "./Thought";
import { HandPeaceIcon, MeteorIcon, SparkleIcon, YinYangIcon } from "@phosphor-icons/react";
import { addDays, format, startOfWeek } from "date-fns";
import classNames from "classnames";
import { useDateSwipeNavigation } from "./hooks/useDateSwipeNavigation";
// import { useState } from "react";

const Icons = [
    HandPeaceIcon,
    MeteorIcon,
    SparkleIcon,
    YinYangIcon,
];

function getDateForIndex(baseDate, index) {
  // Get the Sunday of that week (index 0 = Sunday)
  const start = startOfWeek(baseDate, { weekStartsOn: 0 });
  // Add the index to reach the right day
  return addDays(start, index);
}



const flatCategories = Categories.flatMap(category => category.calendars);

export const Habits = ({ date, onDateChange, onHabitClick }) => {
    const handlers = useDateSwipeNavigation(date, onDateChange);
    const RandomIcon = Icons[Math.floor(Math.random() * Icons.length)];
    // const [selectedCategory, setSelectedCategory] = useState(Categories[0]);

    return (
        <div {...handlers} className="flex flex-col space-y-8 w-full pt-4">
            <div className="w-full flex-wrap flex gap-2">
            {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((dayOfWeek, index) => 
                <button 
                    className={classNames("font-mono text-sm px-2 py-1", {
                        "font-bold": dayOfWeek === format(date, "EEE").toLowerCase()
                      })}
                    onClick={() => onDateChange(getDateForIndex(date, index))}>
                    {dayOfWeek}
                </button>)}
            </div>
            <div className="space-y-4">
                {/* <h2 className="text-2xl font-bold merriweather-500">
                    {selectedCategory.name}
                </h2> */}
                <div className="md:grid-cols-6 max-w-screen-md mx-auto flex-wrap grid grid-cols-3 gap-2">
                    {flatCategories.filter(calendar => !calendar.isHidden).map((calendar, index) => (
                        <div
                            key={calendar.name + index}
                            className={classNames({
                                "col-span-3": calendar.cols === 3,
                                "col-span-2": calendar.cols === 2,
                            })}>
                            <HabitTile
                                key={calendar.name}
                                calendar={calendar}
                                date={date}
                                onHabitClick={() => onHabitClick(calendar)} />
                        </div>
                    ))}
                </div>
                {/* <Thought category={selectedCategory} date={date} /> */}
            </div>
            <div className="flex justify-center items-center mt-10 mb-32">
                <RandomIcon size={120} className="opacity-50" />
            </div>
        </div>
    )
}