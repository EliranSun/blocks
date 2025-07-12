import { useMemo } from "react";
import { formatDate } from "./utils/strorage";
import { getDayOfYear, format } from "date-fns";
import { Thought } from "./Thought";
import { Categories, Calendars } from "./constants";
import classNames from "classnames";

export const NotesView = () => {
    const days = useMemo(() => {
        const dayOfYear = getDayOfYear(new Date());
        return new Array(dayOfYear).fill(0).map((_, index) => {
            const date = new Date(2025, 0, index + 1);
            const colorIndex = localStorage.getItem(`mood_${formatDate(date)}`);
            const color = Calendars.find(c => c.name === "mood")?.colors[colorIndex];

            return {
                date,
                backgroundColor: color.className,
                colorClassName: color.colorClassName
            }
        }).reverse();
    }, []);

    return (
        <div>
            {days.map(({ date, colorClassName }, index) => (
                <div key={index}>
                    <h1 className={classNames("puritan-bold text-3xl uppercase py-4 text-center", colorClassName)}>
                        {format(date, "MMMM dd, EEEE")}</h1>
                    {Categories.map((category) => (
                        <Thought
                            key={category.name}
                            showCategoryName
                            hideIfEmpty
                            category={category}
                            date={date} />
                    ))}
                </div>
            ))}
        </div>
    )
}