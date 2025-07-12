/* eslint-disable */
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import { Button } from "../Button";

export const DayNavigation = ({ date, setDate }) => {
    return (

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
    );
};