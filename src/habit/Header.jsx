import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import classNames from "classnames";

export const HabitHeader = ({ date, setDate, habitsByDay, onHabitClick }) => {
    return (
        <div className="w-full sticky top-0 bg-[#ece1d4] dark:bg-[#242424] z-10 flex flex-col justify-center items-center space-y-2 py-2">
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
                                onClick={() => onHabitClick(item.calendar.name)}
                                className={classNames({
                                    "text-amber-500": item.calendar.primaryColor === "amber",
                                    "text-green-500": item.calendar.primaryColor === "green",
                                })} />
                            {/* <span className="text-xs font-mono">
                                    {item.calendar.name.slice(0, 2).toLowerCase()}
                                </span>*/}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};