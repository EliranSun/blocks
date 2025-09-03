import classNames from "classnames";
import { useHabitsByDay } from "./hooks/useHabitsByDay";
import { Calendars } from "./constants";
import React, { useState } from "react";
import { useDateSwipeNavigation } from "./hooks/useDateSwipeNavigation";
import { Quotes } from "./Quotes";
import { Button } from "./Button";

const HabitsIconGrid = ({ date, onDateChange }) => {
    const habitsByDay = useHabitsByDay(date);
    const handlers = useDateSwipeNavigation(date, onDateChange);

    return (
        <div {...handlers} className="grid grid-cols-5 w-fit h-fit m-auto gap-5">
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
    )
};

export const HabitsMainScreen = ({ onContinue }) => {
    const [isClosed, setIsClosed] = useState(false);
    return (
        <div className={classNames("h-[calc(100%-16px-40px)]", {
            "transition-opacity duration-300": true,
            "flex flex-col gap-8 justify-center items-center": true,
            "opacity-0": isClosed,
            "opacity-100": !isClosed,
        })}>
            <Quotes />
            <Button onClick={() => {
                setIsClosed(true);
                onContinue();
            }}>
                Continue
            </Button>
        </div>
    )
}