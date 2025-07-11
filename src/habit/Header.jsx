/* eslint-disable */
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { Button } from "../Button";

export const HabitHeader = ({ date, setDate, habitsByDay, onHabitClick }) => {
    return (
        <>
            <div className="flex flex-col mt-20 mb-28 justify-center items-center">
                <h1 className="text-3xl font-bold font-mono opacity-80 text-center merriweather-500">
                    {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric"
                    })}
                </h1>
                <div className="grid grid-cols-4 w-fit my-4 gap-2 rounded-full px-4">
                    {habitsByDay.map(item => {
                        const Icon = item.calendar.icon;
                        return (
                            <Icon
                                key={item.key}
                                size={42}
                                onClick={() => onHabitClick(item.calendar.name)}
                                className={classNames({
                                    "text-amber-500": item.calendar.primaryColor === "amber",
                                    "text-green-500": item.calendar.primaryColor === "green",
                                })} />
                        );
                    })}
                </div>
            </div>
            <div className={classNames(
                "fixed bottom-4 right-4 bg-black/20 rounded-full w-fit",
                "px-4 z-10 flex flex-col justify-center items-center py-2",
                "flex-row gap-4"
            )}>

                <Button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>
                    <ArrowLeftIcon size={20} />
                </Button>
                <Button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>
                    <ArrowRightIcon size={20} />
                </Button>

            </div>
        </>
    );
};