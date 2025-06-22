import { addDays, subDays } from "date-fns";

export default function DateNavigation({ date, setDate }) {
    const handlePreviousDay = () => {
        setDate(subDays(date, 1));
    };

    const handleNextDay = () => {
        setDate(addDays(date, 1));
    };

    return (
        <div className="w-full flex items-center justify-center gap-4 sticky top-1 bg-[#242424]">
            <button onClick={handlePreviousDay}>⬅️</button>
            <h1
                onClick={() => setDate(new Date())}
                className="w-full text-center">
                {date.toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </h1>
            <button onClick={handleNextDay}>➡️</button>
        </div>
    )
}