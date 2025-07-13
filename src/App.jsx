import { useState } from "react";
import { CalendarActionsBar } from "./CalendarActionsBar";
import { Habits } from "./Habits";
import { HabitsMainScreen } from "./HabitsMainScreen";
import { Settings } from "./Settings";
import { NotesView } from "./NotesView";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import classNames from "classnames";

function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("home");


  const isToday = date.toDateString() === new Date().toDateString();
  const isNight = date.getHours() < 6 || date.getHours() > 18;

  return (
    <>
      <div className="w-full flex items-center justify-between py-4 sticky top-0 bg-[#ece1d4] dark:bg-[#242424] z-10">
        <h1 className={classNames({
          "text-4xl font-bold merriweather-500 flex items-center gap-4": true,
          "opacity-70": view === "habits",
          "opacity-0": view !== "habits",
        })}>
          {isNight ? <MoonIcon size={40} /> : <SunIcon size={40} />}
          {isToday ? "Today" : date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h1>
        <CalendarActionsBar onSettingsClick={() => view === "settings"
          ? setView("home")
          : setView("settings")} />
      </div>
      {view === "home" && <HabitsMainScreen date={date} onDateChange={setDate} />}
      {view === "habits" && <Habits date={date} onDateChange={setDate} />}
      {view === "settings" && <Settings
        onHomeClick={() => setView("home")}
        onHabitsClick={() => setView("habits")}
        onNotesClick={() => setView("notes")} />}
      {view === "notes" && <NotesView />}


    </>
  )
}

export default App
