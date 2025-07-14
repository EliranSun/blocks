import classNames from "classnames"
import { exportCalendarData, triggerImport } from "./utils/dataManager";

const Title = ({ children, onClick }) => {
    return (
        <h2 onClick={onClick} className={classNames(
            "active:text-amber-500 hover:text-amber-500 transition-colors duration-300",
            "text-6xl"
        )}>{children}</h2>
    )
}
export const Settings = ({ onHomeClick, onHabitsClick, onNotesClick }) => {
    return (
        <div className={classNames(
            "fixed z-20 inset-0 m-auto flex flex-col w-full h-screen",
            "justify-evenly items-start text-6xl",
            "merriweather-500 text-start"
        )}>
            <Title onClick={onHomeClick}>Home</Title>
            <Title onClick={onHabitsClick}>Habits</Title>
                        <Title onClick={onNotesClick}>Calendar</Title>
            <Title onClick={onNotesClick}>Notes</Title>
            <Title onClick={triggerImport}>Import</Title>
            <Title onClick={exportCalendarData}>Export</Title>
            <Title onClick={() => window.location.reload()}>Refresh</Title>
        </div>
    )
}