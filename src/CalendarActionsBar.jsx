import classNames from "classnames";
import { Button } from "./Button";
import { HouseSimpleIcon, GridFourIcon, GearIcon, NoteIcon } from "@phosphor-icons/react";

export const CalendarActionsBar = ({
    onHomeClick,
    onHabitsClick,
    onSettingsClick,
}) => {
    return (
        <div
            className={classNames({
                "fixed gap-2 p-2 bg-white/40 dark:bg-black/40": true,
                "flex rounded-full z-10": true,
                "w-fit bottom-4 right-4": true
            })}
        >
            <Button
                onClick={onHomeClick}
                title="Home"
            >
                <HouseSimpleIcon size={16} />
            </Button>
            <Button
                onClick={onHabitsClick}
                title="Habits"
            >
                <GridFourIcon size={16} />
            </Button>
            <Button
                // onClick={onHabitsClick}
                title="Notes"
            >
                <NoteIcon size={16} />
            </Button>
            <Button
                onClick={onSettingsClick}
                title="Settings"
            >
                <GearIcon size={16} />
            </Button>
        </div>
    )
}