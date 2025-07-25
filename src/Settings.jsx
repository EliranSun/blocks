import classNames from "classnames"
import { exportCalendarData, triggerImport } from "./utils/dataManager";

const Title = ({ children, onClick }) => {
    return (
        <h2 onClick={onClick} className={classNames(
            "active:text-amber-500 hover:text-amber-500 transition-colors duration-300",
            "text-5xl border-b"
        )}>{children}</h2>
    )
}
export const Settings = ({
    onHomeClick,
    onHabitsClick,
    onNotesClick,
    onCalendarClick,
    onSearchClick,
    onWordCloudClick,
    onAtlyClick,
}) => {
    return (
        <div className={classNames(
            "fixed z-20 inset-0 m-auto flex flex-col w-full h-screen",
            "justify-evenly items-start",
            "merriweather-500 text-start px-8"
        )}>
            <Title onClick={onHomeClick}>Home</Title>
            <Title onClick={onHabitsClick}>Habits</Title>
            <Title onClick={onCalendarClick}>Calendar</Title>
            <Title onClick={onNotesClick}>Thoughts</Title>
            <Title onClick={onWordCloudClick}>Cloud</Title>
            <Title onClick={onSearchClick}>Search</Title>
            <Title onClick={triggerImport}>Import</Title>
            <Title onClick={exportCalendarData}>Export</Title>
            <Title onClick={() => window.location.reload()}>Refresh</Title>
            <Title onClick={onAtlyClick}>Atly</Title>
        </div>
    )
}