import { Categories } from "./constants";
import { HabitTile } from "./HabitTile";
import { Thought } from "./Thought";
import { HandPeaceIcon } from "@phosphor-icons/react";
import { Quotes } from "./Quotes";
import classNames from "classnames";
import { useDateSwipeNavigation } from "./hooks/useDateSwipeNavigation";

export const Habits = ({ date, onDateChange }) => {
    const handlers = useDateSwipeNavigation(date, onDateChange);
    const isToday = date.toDateString() === new Date().toDateString();

    return (
        <div {...handlers} className="flex flex-col space-y-8 w-full">
            <h1 className="text-4xl font-bold merriweather-500 pt-4 opacity-70">
                {isToday ? "Today" : date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </h1>
            <Quotes />
            {Categories.map((category) => (
                <>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold merriweather-500">
                            {category.name}
                        </h2>
                        <div className="grid grid-cols-3 gap-2">
                            {category.calendars.map((calendar) => (
                                <div className={classNames({
                                    "col-span-3": calendar.cols === 3,
                                    "col-span-2": calendar.cols === 2,
                                })}>
                                    <HabitTile key={calendar.name} calendar={calendar} date={date} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Thought category={category} date={date} />
                </>
            ))}
            <HandPeaceIcon size={120} className="my-32 opacity-50" />
        </div>
    )
}