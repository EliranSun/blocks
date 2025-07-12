import { Categories } from "./constants";
import { HabitTile } from "./HabitTile";
import { Thought } from "./Thought";
import { HandPeaceIcon } from "@phosphor-icons/react";
import { Quotes } from "./Quotes";
import classNames from "classnames";

export const Habits = ({ date }) => {
    return (
        <div className="flex flex-col space-y-8 w-full justify-center items-center">
            <h1 className="text-lg font-bold merriweather-500 text-center py-4">
                {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </h1>
            {Categories.map((category, index) => (
                <>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold merriweather-500 text-center">
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
                        {/* <TagGroup groupName={category.name.toLowerCase()} date={date} /> */}
                    </div>
                    <Thought category={category} date={date} />

                    {index === 1 &&
                        <div className="my-4">
                            <Quotes />
                        </div>}
                </>
            ))}
            <HandPeaceIcon size={120} className="my-32 opacity-50" />
        </div>
    )
}