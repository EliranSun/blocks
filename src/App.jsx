import { useMemo, useState } from "react";
import { CalendarActionsBar } from "./CalendarActionsBar";
import { Habits } from "./Habits";
import { HabitsMainScreen } from "./HabitsMainScreen";
import { Settings } from "./Settings";
import { NotesView } from "./NotesView";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import CalendarView from "./CalendarView";
import classNames from "classnames";
import { Calendars } from "./constants";
import { SearchView } from "./SearchView";

const Views = {
  HOME: "home",
  HABITS: "habits",
  NOTES: "notes",
  CALENDAR: "calendar",
  SETTINGS: "settings",
}

function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.HOME);

  const isNight = date.getHours() < 6 || date.getHours() > 18;

  const title = useMemo(() => {
    const isToday = date.toDateString() === new Date().toDateString();
    if (isToday) {
      if (isNight) return "Tonight"
      return "Today";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
    });
  }, [date, isNight]);

  return (
    <>
      <div className="w-full flex items-center justify-between py-4 sticky top-0 bg-[#ece1d4] dark:bg-[#242424] z-10">
        <h1 className={classNames({
          "text-4xl font-bold merriweather-500 flex items-center gap-4": true,
          "opacity-70": view === Views.HABITS,
          "opacity-0": view !== Views.HABITS,
        })}>
          {isNight ? <MoonIcon size={40} /> : <SunIcon size={40} />}
          {title}
        </h1>
        <CalendarActionsBar
          onSettingsClick={() => view === Views.SETTINGS
            ? setView(Views.HOME)
            : setView(Views.SETTINGS)} />
      </div>
      {view === Views.HOME && <HabitsMainScreen date={date} onDateChange={setDate} />}
      {view === Views.HABITS && <Habits date={date} onDateChange={setDate} />}
      {view === Views.NOTES && <NotesView />}
      {view === Views.SEARCH && <SearchView />}
      {view === Views.CALENDAR &&
        <div className="flex flex-col gap-4">
          {Calendars.map((calendar, index) => (
            <CalendarView
              date={date}
              isCondensed
              horizontal
              isOpaque
              showFullYear={false}
              calendar={calendar}
              onDateChange={setDate}
              key={index} />
          ))}</div>}
      {view === Views.SETTINGS &&
        <Settings
          onHomeClick={() => setView(Views.HOME)}
          onHabitsClick={() => setView(Views.HABITS)}
          onNotesClick={() => setView(Views.NOTES)}
          onCalendarClick={() => setView(Views.CALENDAR)}
          onSearchClick={() => setView(Views.SEARCH)} />}
    </>
  )
}

export default App
