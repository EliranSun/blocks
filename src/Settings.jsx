import classNames from "classnames"
import { exportCalendarData, triggerImport } from "./utils/dataManager";

export const Settings = () => {
    return (
        <div className={classNames(
            "flex flex-col w-full h-[calc(100dvh-5.5rem)]",
            "justify-evenly items-center text-7xl",
            "merriweather-500 text-center"
        )}>
            <h1 onClick={triggerImport}>Import</h1>
            <h1 onClick={exportCalendarData}>Export</h1>
            <h1 onClick={() => window.location.reload()}>Refresh</h1>
        </div>
    )
}