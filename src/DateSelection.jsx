import classNames from "classnames";
import { format } from "date-fns";

export const DateSelection = ({ onDateChange }) => {
    return (
        <div className={classNames(
            "fixed top-0 left-0 w-full h-dvh bg-[#ece1d4] dark:bg-[#242424] z-50",
            "grid grid-cols-3 grid-rows-4 gap-4 p-4 merriweather-500 items-center justify-center"
        )}>
            {new Array(12).fill(0).map((_, index) => (
                <h1
                    onClick={() => onDateChange(new Date(2025, index, 1))}
                    className="text-4xl font-bold text-center">{format(new Date(2025, index, 1), "MMM")}</h1>
            ))}
        </div>
    );
};