import { useState } from "react";
import { HabitTile } from "./HabitTile";
import { Categories } from "./constants";
import { useHabitsByDay } from "./hooks/useHabitsByDay";
import classNames from "classnames";
import { HandPeaceIcon } from "@phosphor-icons/react";
import { Quotes } from "./Quotes";
import TagGroup from "./TagGroup";
import { HabitHeader } from "./habit/Header";
import { HabitFocus } from "./HabitFocus";

const Habits = ({ date }) => {
    return (
        <>
            {Categories.map((category, index) => (
                <>
                    <div className="space-y-4 my-4">
                        <h2 className="text-2xl font-bold font-mono text-center">
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
                        <TagGroup groupName={category.name.toLowerCase()} date={date} />
                    </div>

                    {index === 1 &&
                        <div className="my-4">
                            <Quotes />
                        </div>}
                </>
            ))}
            <HandPeaceIcon size={120} className="my-10" />
        </>
    )
}

export const HabitView = () => {
    const [date, setDate] = useState(new Date());
    const [habitFocusView, setHabitFocusView] = useState("");
    const habitsByDay = useHabitsByDay(date);

    return (
        <div className="flex flex-col space-y-8 w-full justify-center items-center">
            <HabitHeader
                date={date}
                setDate={setDate}
                habitsByDay={habitsByDay}
                onHabitClick={(habitName) => habitFocusView
                    ? setHabitFocusView("")
                    : setHabitFocusView(habitName)}
            />
            {habitFocusView
                ? <HabitFocus habitName={habitFocusView} />
                : <Habits date={date} />}
        </div>
    );
}