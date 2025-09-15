import classNames from "classnames"
import { exportCalendarData, triggerImport } from "./utils/dataManager";
import { useState } from "react";
import { Calendars } from "./constants";
const Title = ({ children, onClick }) => {
    return (
        <h2 onClick={onClick} className={classNames(
            "active:text-amber-500 hover:text-amber-500 transition-colors duration-300",
            "text-5xl border-b flex items-center gap-2"
        )}>{children}</h2>
    )
}

const MenuWrapper = ({ children }) => {
    return (
        <div className={classNames(
            "fixed z-20 inset-0 m-auto flex flex-col w-full h-dvh overflow-y-auto",
            "justify-start items-start gap-8 my-8 pb-40",
            "merriweather-500 text-start px-8"
        )}>
            {children}
        </div>
    )
}
export const Settings = ({
    onHabitsClick,
    onSearchClick,
    onWordCloudClick,
    // onAtlyClick,
    onThoughtsClick,
    onHabitClick,
}) => {
    const [isCalendarsMenuOpen, setIsCalendarsMenuOpen] = useState(false);
    if (isCalendarsMenuOpen) {
        return (
            <MenuWrapper>
                <Title onClick={() => setIsCalendarsMenuOpen(false)}>Close</Title>
                {Calendars.filter(calendar => !calendar.isHidden).map((calendar) => (
                    <Title key={calendar.name} onClick={() => {
                        onHabitClick(calendar);
                    }}>
                        {calendar.icon && <calendar.icon size={42} />} {calendar.name.toUpperCase().slice(0, 6)}
                    </Title>
                ))}
            </MenuWrapper>
        )
    }
    return (
        <MenuWrapper>
            <Title onClick={() => window.location.reload()}>Refresh</Title>
            <Title onClick={onHabitsClick}>Habits</Title>
            <Title onClick={() => setIsCalendarsMenuOpen(true)}>Calendars</Title>
            <Title onClick={onThoughtsClick}>Thoughts</Title>
            <Title onClick={onWordCloudClick}>Cloud</Title>
            <Title onClick={onSearchClick}>Search</Title>
            <Title onClick={triggerImport}>Import</Title>
            <Title onClick={() => exportCalendarData(`calendar-data-${new Date().toISOString().split('T')[0]}.json`)}>Export</Title>
        </MenuWrapper>
    )
}