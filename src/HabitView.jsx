import { useState } from "react";
import { DayNavigation } from "./habit/DayNavigation";
import { Habits } from "./Habits";
import { HabitsMainScreen } from "./HabitsMainScreen";

export const HabitView = () => {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <HabitsMainScreen
                date={date}
                onDateChange={setDate}
            />
            {/* <DayNavigation
                date={date}
                setDate={setDate}
            /> */}
            {/* <div className="flex flex-col space-y-8 w-full justify-center items-center">
                <Habits date={date} />
            </div> */}
        </>
    );
}