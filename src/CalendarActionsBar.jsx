import { Button } from "./Button";
import { ListIcon } from "@phosphor-icons/react";

export const CalendarActionsBar = ({
    onSettingsClick,
}) => {
    return (
        <Button
            isTransparent={true}
            onClick={onSettingsClick}
            title="Settings"
        >
            <ListIcon size={24} weight="bold" />
        </Button>
    )
}