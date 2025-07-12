import classNames from "classnames";
import { Button } from "./Button";
import { HouseSimpleIcon, GridFourIcon, GearIcon, NoteIcon } from "@phosphor-icons/react";
// import { exportCalendarData, triggerImport } from "./utils/dataManager";

export const CalendarActionsBar = ({
    onHomeClick,
    onHabitsClick,
    onSettingsClick,
}) => {
    // const handleExport = () => {
    //     exportCalendarData();
    // };

    // const handleImport = () => {
    //     triggerImport(false);
    // };

    return (
        <>
            <div
                className={classNames({
                    "fixed gap-2 p-2 bg-white/40": true,
                    "flex rounded-full z-10": true,
                    "w-fit bottom-4 right-4": true
                })}
            >
                <div className="flex items-center justify-center gap-2">
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
                    {/* <Button
                        onClick={() => window.location.reload()}
                        title="Reload calendar data"
                    >
                        <ArrowClockwiseIcon size={16} />
                    </Button> */}
                </div>
            </div>
        </>
    )
}