import { Categories } from "./constants";
import { HabitTile } from "./HabitTile";
import { Thought } from "./Thought";
import { HandPeaceIcon, MeteorIcon, SparkleIcon, YinYangIcon } from "@phosphor-icons/react";

import classNames from "classnames";
import { useDateSwipeNavigation } from "./hooks/useDateSwipeNavigation";
import { useState } from "react";

const Icons = [
    HandPeaceIcon,
    MeteorIcon,
    SparkleIcon,
    YinYangIcon,
]
export const Habits = ({ date, onDateChange }) => {
    const handlers = useDateSwipeNavigation(date, onDateChange);
    const RandomIcon = Icons[Math.floor(Math.random() * Icons.length)];
    const [selectedCategory, setSelectedCategory] = useState(Categories[0]);
    return (
        <div {...handlers} className="flex flex-col space-y-8 w-full pt-4">
            <div className="w-full flex-wrap flex gap-2">
            {Categories.map(category => 
                <button 
                    className="bg-black/70 text-white p-1"
                    onClick={() => setSelectedCategory(category)}>
                    {category.name}
                </button>)}
            </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold merriweather-500">
                            {selectedCategory.name}
                        </h2>
                        <div className="grid grid-cols-3 gap-2">
                            {selectedCategory.calendars.map((calendar, index) => (
                                <div
                                    key={calendar.name + index}
                                    className={classNames({
                                        "col-span-3": calendar.cols === 3,
                                        "col-span-2": calendar.cols === 2,
                                    })}>
                                    <HabitTile key={calendar.name} calendar={calendar} date={date} />
                                </div>
                            ))}
                        </div>
                    <Thought category={selectedCategory} date={date} />
                    </div>
            <div className="flex justify-center items-center mt-10 mb-32">
                <RandomIcon size={120} className="opacity-50" />
            </div>
        </div>
    )
}