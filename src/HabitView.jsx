import { useState, useEffect, useRef } from "react";
import { HabitTile } from "./HabitTile";
import { Categories } from "./constants";
import { useHabitsByDay } from "./hooks/useHabitsByDay";
import classNames from "classnames";
import { HandPeaceIcon } from "@phosphor-icons/react";
import { Quotes } from "./Quotes";
// import TagGroup from "./TagGroup";
import { HabitHeader } from "./habit/Header";
import { HabitFocus } from "./HabitFocus";
import { formatDate } from "./utils/strorage";

const Thought = ({ category, date }) => {
    const [isThinking, setIsThinking] = useState(false);
    const [thought, setThought] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        const thought = localStorage.getItem(`thought_${category.name}_${formatDate(date)}`);
        setThought(thought || "");
    }, [date, category.name]);

    useEffect(() => {
        if (isThinking && textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [isThinking]);

    if (isThinking) {
        return (
            <textarea
                ref={textareaRef}
                value={thought}
                autoFocus
                onChange={(e) => setThought(e.target.value)}
                placeholder={`My thoughts for today on ${category.name}...`}
                className="w-full border merriweather-500 h-[33vh] text-xl rounded-xl p-4"
                onBlur={() => {
                    setIsThinking(false);
                    localStorage.setItem(`thought_${category.name}_${formatDate(date)}`, thought);
                }}
            />
        )
    }

    return (
        <h3
            onClick={() => setIsThinking(true)}
            className={classNames(
                "text-xl merriweather-500 p-2 w-full",
                {
                    "opacity-70": thought,
                    "opacity-40": !thought,
                }
            )}>
            {thought || `My thoughts for today on ${category.name}...`}
        </h3>
    )
};

const Habits = ({ date }) => {
    return (
        <>
            {Categories.map((category, index) => (
                <>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold merriweather-500 text-center">
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
                        {/* <TagGroup groupName={category.name.toLowerCase()} date={date} /> */}
                    </div>
                    <Thought category={category} date={date} />

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
        <>
            <HabitHeader
                date={date}
                setDate={setDate}
                habitsByDay={habitsByDay}
                onHabitClick={(habitName) => habitFocusView
                    ? setHabitFocusView("")
                    : setHabitFocusView(habitName)}
            />
            <div className="flex flex-col space-y-8 w-full justify-center items-center">

                {habitFocusView
                    ? <HabitFocus habitName={habitFocusView} />
                    : <Habits date={date} />}
            </div>
        </>
    );
}