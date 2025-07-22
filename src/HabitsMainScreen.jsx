import classNames from "classnames";
import { useHabitsByDay } from "./hooks/useHabitsByDay";
import { Calendars } from "./constants";
import React from "react";
import { useDateSwipeNavigation } from "./hooks/useDateSwipeNavigation";
import { Quotes } from "./Quotes";

export const HabitsMainScreen = ({ date, onDateChange }) => {
    const habitsByDay = useHabitsByDay(date);
    const handlers = useDateSwipeNavigation(date, onDateChange);

    return (
        <div className="flex flex-col justify-between h-full gap-8">
            {/* <h1 className="text-3xl font-bold col-span-2
        font-mono opacity-80 text-center merriweather-500">
                {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </h1> */}
            <Quotes />
            <div {...handlers} className="grid grid-cols-5 w-fit h-full m-auto gap-5">
                {Calendars.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = habitsByDay.some(habit => habit.calendar.name === item.name);
                    return (
                        <div className="flex justify-center items-center">
                            <Icon
                                key={`${item.key}-${date.toISOString()}`}
                                size={42}
                                className={classNames(
                                    "transition-opacity duration-500",
                                    {
                                        "partial-animate-fade-in": !isSelected,
                                        "full-animate-fade-in": isSelected,
                                        "text-amber-500": item.primaryColor === "amber",
                                        "text-green-500": item.primaryColor === "green",
                                    }
                                )}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    opacity: 0 // Start with opacity 0
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}