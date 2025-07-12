import { useState } from "react";
import { CalendarActionsBar } from "./CalendarActionsBar";
import { Habits } from "./Habits";
import { HabitsMainScreen } from "./HabitsMainScreen";
import { Settings } from "./Settings";
import { NotesView } from "./NotesView";

function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("home");

  return (
    <>
      {view === "home" && <HabitsMainScreen date={date} onDateChange={setDate} />}
      {view === "habits" && <Habits date={date} onDateChange={setDate} />}
      {view === "settings" && <Settings />}
      {view === "notes" && <NotesView />}

      <CalendarActionsBar
        onHomeClick={() => setView("home")}
        onHabitsClick={() => setView("habits")}
        onSettingsClick={() => setView("settings")}
        onNotesClick={() => setView("notes")}
      />
    </>
  )
}

export default App
