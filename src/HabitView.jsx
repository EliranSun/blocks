import { useState } from "react";
import { HabitTile } from "./HabitTile";
// import { isToday } from "date-fns";
import { Calendars } from "./constants";
import { useHabitsByDay } from "./hooks/useHabitsByDay";
import classNames from "classnames";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";

const Categories = [
    {
        name: "Health",
        calendars: Calendars.slice(0, 7),
    },
    {
        name: "Creative",
        calendars: Calendars.slice(7, 13),
    },
    {
        name: "Wife",
        calendars: Calendars.slice(13, 17),
    },
    {
        name: "House",
        calendars: Calendars.slice(17, 22),
    },
    {
        name: "Social",
        calendars: Calendars.slice(22, 25),
    },
    {
        name: "Avoid",
        calendars: Calendars.slice(25, 28),
    }
]

export const HabitView = () => {
    const [date, setDate] = useState(new Date());
    const habitsByDay = useHabitsByDay(date);

    return (
        <div className="flex flex-col space-y-8 w-full justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-4">
                <h1 className="text-base font-bold font-mono opacity-80 text-center flex justify-between gap-10">
                    <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>
                        <ArrowLeftIcon size={20} />
                    </button>
                    <span>
                        {date.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric"
                        })}
                    </span>
                    <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>
                        <ArrowRightIcon size={20} />
                    </button>
                </h1>
                <div className="flex flex-row gap-2 h-9">
                    {habitsByDay.map(item => {
                        const Icon = item.calendar.icon;
                        return (
                            <div className="flex flex-col items-center justify-center">
                                <Icon
                                    key={item.key}
                                    size={20}
                                    className={classNames({
                                        "text-amber-500": item.calendar.primaryColor === "amber",
                                        "text-green-500": item.calendar.primaryColor === "green",
                                    })} />
                                <span className="text-xs font-mono">
                                    {item.calendar.name.slice(0, 2).toLowerCase()}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            {Categories.map(category => (
                <div className="space-y-4 my-4">
                    <h2 className="text-2xl font-bold font-mono text-center">{category.name}</h2>
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
            ))}
        </div>
    );
}