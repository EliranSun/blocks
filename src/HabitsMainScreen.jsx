import classNames from "classnames";
import { useHabitsByDay } from "./hooks/useHabitsByDay";
import { Calendars } from "./constants";
import { useSwipeable } from "react-swipeable";
import React from "react";

export const HabitsMainScreen = ({ date, onDateChange }) => {
    const habitsByDay = useHabitsByDay(date);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            // Go to next day
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);
            onDateChange(nextDate);
        },
        onSwipedRight: () => {
            // Go to previous day
            const prevDate = new Date(date);
            prevDate.setDate(date.getDate() - 1);
            onDateChange(prevDate);
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div {...handlers} className="flex h-[calc(100dvh-5.5rem)] justify-center items-center w-full">
            <div className="grid grid-cols-4 w-fit items-center gap-5">
                {Calendars.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = habitsByDay.some(habit => habit.calendar.name === item.name);
                    return (
                        <React.Fragment key={`${item.key}-${index}`}>
                            {(index === Math.round((Calendars.length - 2) / 2)) ?
                                <h1 className="text-3xl font-bold col-span-2
                                font-mono opacity-80 text-center merriweather-500">
                                    {date.toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </h1> : null
                            }
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
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    )
}