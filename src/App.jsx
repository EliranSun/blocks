import CalendarView from "./CalendarView";
import { Calendars } from "./constants";
import { useState } from "react";
import CalendarSelectionModal from "./CalendarSelectionModal";
import { CalendarActionsBar } from "./CalendarActionsBar";
import classNames from "classnames";

function App() {
  const [calendar, setCalendar] = useState(Calendars[0]);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(true);
  const [isCondensed, setIsCondensed] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isStreakToggled, setStreakToggled] = useState(false);

  const CalendarProps = {
    isCondensed,
    isTransitioning,
    showInfo,
    onCellMark: () => setStreakToggled(!isStreakToggled)
  }

  return (
    <>
      <section className={classNames("w-full flex items-center overflow-x-auto", {
        "justify-start gap-4": isCondensed,
        "justify-center": !isCondensed
      })}>
        {isCondensed ?
          Calendars.map((c) => <CalendarView key={c.name} calendar={c} isCondensed {...CalendarProps} />) :
          <CalendarView {...CalendarProps} calendar={calendar} />}
      </section>
      <CalendarActionsBar
        calendar={calendar}
        setCalendar={setCalendar}
        isCondensed={isCondensed}
        setIsCondensed={setIsCondensed}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        isStreakToggled={isStreakToggled}
        setIsCalendarModalOpen={setIsCalendarModalOpen} />

      <CalendarSelectionModal
        isCalendarModalOpen={isCalendarModalOpen}
        setIsCalendarModalOpen={setIsCalendarModalOpen}
        setCalendar={setCalendar} />
    </>
  )
}

export default App
