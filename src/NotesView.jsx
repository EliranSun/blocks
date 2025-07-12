import { useMemo } from "react";
import { formatDate, getStorageBySuffix } from "./utils/strorage";
import { getDayOfYear, format } from "date-fns";
import { Thought } from "./Thought";
import { Categories, Calendars } from "./constants";
import classNames from "classnames";

export const NotesView = () => {
    const days = useMemo(() => {
        ;

        const dayOfYear = getDayOfYear(new Date());
        return new Array(dayOfYear).fill(0).map((_, index) => {
            const date = new Date(2025, 0, index + 1);
            const colorIndex = localStorage.getItem(`mood_${formatDate(date)}`);
            const color = Calendars.find(c => c.name === "mood")?.colors[colorIndex];
            const formattedDate = formatDate(date);
            const habitsByDay = getStorageBySuffix(formattedDate);

            return {
                date,
                backgroundColor: color.className,
                colorClassName: color.colorClassName,
                habitsByDay
            }
        }).reverse();
    }, []);

    return (
        <div>
            {days.map(({ date, colorClassName, habitsByDay }, index) => (
                <div key={index} className="py-4 space-y-4">
                    <h1 className={classNames("puritan-bold text-3xl uppercase", colorClassName)}>
                        {format(date, "MMMM dd, EEEE")}</h1>
                    <div className="flex gap-2">
                        {habitsByDay.map((habit) => {
                            const Icon = habit.calendar.icon;
                            return (
                                <Icon size={18} />
                            )
                        })}
                    </div>
                    <div>
                        {Categories.map((category) => (
                            <Thought
                                key={category.name}
                                showCategoryName
                                hideIfEmpty
                                category={category}
                                date={date} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}