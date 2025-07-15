import { Categories } from "./constants";
import { HabitTile } from "./HabitTile";
import { Thought } from "./Thought";
import { HandPeaceIcon, MeteorIcon, SparkleIcon, YinYangIcon } from "@phosphor-icons/react";
import { Quotes } from "./Quotes";
import classNames from "classnames";
import { useDateSwipeNavigation } from "./hooks/useDateSwipeNavigation";

const Icons = [
    HandPeaceIcon,
    MeteorIcon,
    SparkleIcon,
    YinYangIcon,
]
export const Habits = ({ date, onDateChange }) => {
    const handlers = useDateSwipeNavigation(date, onDateChange);
    const RandomIcon = Icons[Math.floor(Math.random() * Icons.length)];

    return (
        <div {...handlers} className="flex flex-col space-y-8 w-full pt-4">
            <Quotes />
            {Categories.map((category) => (
                <>
                    <div className="space-y-4" key={category.name}>
                        <h2 className="text-2xl font-bold merriweather-500">
                            {category.name}
                        </h2>
                        <div className="grid grid-cols-3 gap-2">
                            {category.calendars.map((calendar, index) => (
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
                    </div>
                    <Thought category={category} date={date} />
                </>
            ))}
            <div className="flex justify-center items-center mt-10 mb-32">
                <RandomIcon size={120} className="opacity-50" />
            </div>
        </div>
    )
}