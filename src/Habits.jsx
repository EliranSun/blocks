import { HabitTile } from "./HabitTile";
import { HandPeaceIcon, MeteorIcon, SparkleIcon, YinYangIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { CalendarIcon } from "@phosphor-icons/react";
import { DateNavigation } from "./components/molecules/DateNavigation";

const Icons = [
    HandPeaceIcon,
    MeteorIcon,
    SparkleIcon,
    YinYangIcon,
];

export const Habits = ({ date, onDateChange, onHabitClick, selectedCategories }) => {
    const RandomIcon = Icons[Math.floor(Math.random() * Icons.length)];


    return (
        <div className="flex flex-col space-y-8 w-full pt-4">
            <DateNavigation date={date} onDateChange={onDateChange} />
            <div className="space-y-4">
                <div className="md:grid-cols-6 max-w-screen-md mx-auto flex-wrap grid grid-cols-3 gap-2">
                    {selectedCategories
                        .flatMap(category => category.calendars).filter(calendar => !calendar.isHidden).map((calendar, index) => {
                            if (calendar.isHeader) {
                                return (
                                    <HabitTile
                                        titleOnly
                                        calendar={{ icon: CalendarIcon, name: calendar.name }}
                                        date={date} />
                                );
                            }

                            return (
                                <div
                                    key={calendar.name + index}
                                    className={classNames({
                                        "col-span-3": calendar.cols === 3,
                                        "col-span-2": calendar.cols === 2,
                                    })}>
                                    <HabitTile
                                        key={calendar.name}
                                        calendar={calendar}
                                        date={date}
                                        showInfo={false}
                                        onHabitClick={() => onHabitClick(calendar)} />
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="flex justify-center items-center my-32">
                <RandomIcon size={120} className="opacity-50" />
            </div>
        </div>
    )
}