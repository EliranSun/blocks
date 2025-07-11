/* eslint-disable */

import { Calendars } from "./constants";
import classNames from "classnames";
import { Button } from "./Button";
import { UploadSimpleIcon, DownloadSimpleIcon, ArrowClockwiseIcon } from "@phosphor-icons/react";
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

    const Icon = calendar.icon;

    return (
        <>

            {/* {calendar.isGamified && (
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
            )} */}
            <div
                className={classNames({
                    "fixed gap-2 p-2 bg-black/20": true,
                    "flex rounded-full z-10": true,
                    "w-fit bottom-3 left-4": true
                })}
            >
                {/* <div className={classNames({
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
                        onClick={() => setIsCalendarModalOpen(true)}
                        className={classNames("font-bold text-center cursor-pointer font-mono hover:text-blue-400 transition-colors", {
                            // "w-10": isCondensed,
                            "flex items-center justify-center": true,
                            "w-15": true
                        })}>
                        <Icon size={20} color="black" weight="bold" />
                    </h1>
                    <Button
                        onClick={() => switchCalendar(1)}>
                        <CaretRightIcon size={15} weight="bold" />
                    </Button>
                </div> */}
                <div className="flex items-center justify-center gap-2">
                    {/* <Button onClick={() => setShowInfo(!showInfo)}>
                        {showInfo ? <EyeIcon size={16} /> : <EyeClosedIcon size={16} />}
                    </Button> */}
                    <Button
                        onClick={handleExport}
                        title="Export calendar data"
                    >
                        <UploadSimpleIcon size={16} />
                    </Button>
                    <Button
                        onClick={handleImport}
                        title="Import calendar data"
                    >
                        <DownloadSimpleIcon size={16} />
                    </Button>
                    <Button
                        onClick={() => window.location.reload()}
                        title="Reload calendar data"
                    >
                        <ArrowClockwiseIcon size={16} />
                    </Button>
                    {/* <Button
                        onClick={toggleView}
                        title={isCondensed ? "Expand view" : "Condense view"}
                    >
                        {isCondensed ? <GridFourIcon size={18} /> : <RowsIcon size={18} />}
                    </Button> */}
                </div>
            </div>
        </>
    )
}