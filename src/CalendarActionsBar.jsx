import { Calendars } from "./constants";
import classNames from "classnames";
import { Button } from "./Button";
import { CaretLeftIcon, CaretRightIcon, EyeIcon, EyeClosedIcon, UploadSimpleIcon, DownloadSimpleIcon, GridFourIcon, RowsIcon } from "@phosphor-icons/react";
import { Motion, spring, presets } from "react-motion";
import { exportCalendarData, triggerImport } from "./utils/dataManager";
import { useStreak } from "./hooks/useStreak";
import { useHighScore } from "./hooks/useHighScore";
import { useEffect } from "react";

export const CalendarActionsBar = ({
    calendar,
    setCalendar,
    isCondensed,
    setIsCondensed,
    setIsTransitioning,
    showInfo,
    setShowInfo,
    setIsCalendarModalOpen,
    isStreakToggled,
}) => {
    const { streak, calculateStreak } = useStreak(calendar.name, calendar.isGamified && !isCondensed);
    const { highScore, calculateHighScore } = useHighScore(calendar.name, calendar.isGamified && !isCondensed);

    useEffect(() => {
        if (calendar.isGamified && !isCondensed) {
            calculateStreak();
            calculateHighScore();
        }
    }, [calendar, isCondensed, calculateStreak, calculateHighScore, isStreakToggled]);

    const toggleView = () => {
        setIsCondensed(!isCondensed);
    };

    const switchCalendar = (direction) => {
        setIsTransitioning(true);

        setTimeout(() => {
            const currentIndex = Calendars.indexOf(calendar);
            const newIndex = direction === 1
                ? (currentIndex + 1) % Calendars.length
                : (currentIndex - 1 + Calendars.length) % Calendars.length;
            setCalendar(Calendars[newIndex]);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 150);
    };

    const handleExport = () => {
        exportCalendarData();
    };

    const handleImport = () => {
        triggerImport(false);
    };

    return (
        <>

            {calendar.isGamified && (
                <div className="fixed flex flex-col
                font-bold font-mono
                items-center justify-between gap-4 bottom-28 right-5">
                    <Motion style={{ scale: spring(streak === 0 ? 1 : 1.2, presets.wobbly) }}>
                        {interpolated => (
                            <span
                                className="flex flex-col items-center justify-center"
                                style={{ transform: `scale(${interpolated.scale})` }}>
                                <span className="text-sm">🔥</span>
                                <span className="text-xs">{streak}</span>
                            </span>
                        )}
                    </Motion>
                    <Motion style={{ scale: spring(highScore === 0 ? 1 : 1.2, presets.wobbly) }}>
                        {interpolated => (
                            <span
                                className="flex flex-col items-center justify-center"
                                style={{ transform: `scale(${interpolated.scale})` }}>
                                <span className="text-sm">🏆</span>
                                <span className="text-xs">{highScore}</span>
                            </span>
                        )}
                    </Motion>
                </div>
            )}
            <div
                className={classNames({
                    "flex fixed gap-2 mx-auto bottom-2 bg-neutral-900 p-4 max-w-96": true,
                    "items-center justify-between rounded-full z-10 shadow-xl": true,
                    // "w-fit flex-col bottom-0 right-5": isCondensed,
                    "flex-row w-full inset-x-0 bottom-5": true
                })}
            >
                <div className={classNames({
                    "opacity-0": isCondensed,
                    "bg-white rounded-full flex items-center justify-center": true,
                    // "flex-col": isCondensed,
                    // "flex-row": !isCondensed
                })}>
                    <Button
                        onClick={() => switchCalendar(-1)}>
                        <CaretLeftIcon size={15} weight="bold" />
                    </Button>
                    <h1
                        className={classNames("font-bold text-center cursor-pointer font-mono hover:text-blue-400 transition-colors", {
                            // "w-10": isCondensed,
                            "w-15": true
                        })}
                        onClick={() => setIsCalendarModalOpen(true)}>
                        {calendar.icon}
                    </h1>
                    <Button
                        onClick={() => switchCalendar(1)}>
                        <CaretRightIcon size={15} weight="bold" />
                    </Button>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Button onClick={() => setShowInfo(!showInfo)}>
                        {showInfo ? <EyeIcon size={16} /> : <EyeClosedIcon size={16} />}
                    </Button>
                    <Button
                        onClick={handleExport}
                        title="Export calendar data"
                    >
                        <UploadSimpleIcon size={18} />
                    </Button>
                    <Button
                        onClick={handleImport}
                        title="Import calendar data"
                    >
                        <DownloadSimpleIcon size={18} />
                    </Button>
                    <Button
                        onClick={toggleView}
                        title={isCondensed ? "Expand view" : "Condense view"}
                    >
                        {isCondensed ? <GridFourIcon size={18} /> : <RowsIcon size={18} />}
                    </Button>
                </div>
            </div>
        </>
    )
}