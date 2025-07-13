import classNames from "classnames";
import { Button } from "./Button";
import { HouseSimpleIcon, GridFourIcon, GearIcon, NoteIcon, ListIcon } from "@phosphor-icons/react";

export const CalendarActionsBar = ({
    onSettingsClick,
    // onHomeClick,
    // onHabitsClick,
    // onNotesClick
}) => {
    return (
        <div
            className={classNames({
                "gap-1": true,
                "flex rounded-full z-20": true,
                // "w-fit bottom-4 right-4": true
            })}
        >
            {/* <Button
                isTransparent={true}
                onClick={onHomeClick}
                title="Home"
            >
                <HouseSimpleIcon size={24} weight="bold" />
            </Button>
            <Button
                isTransparent={true}
                onClick={onHabitsClick}
                title="Habits"
            >
                <GridFourIcon size={24} weight="bold" />
            </Button>
            <Button
                isTransparent={true}
                onClick={onNotesClick}
                title="Notes"
            >
                <NoteIcon size={24} weight="bold" />
            </Button> */}
            <Button
                isTransparent={true}
                onClick={onSettingsClick}
                title="Settings"
            >
                <ListIcon size={24} weight="bold" />
            </Button>
        </div>
    )
}