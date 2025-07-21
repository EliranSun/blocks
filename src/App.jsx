import { useState } from "react";
import { Habits } from "./Habits";
import { HabitsMainScreen } from "./HabitsMainScreen";
import { Settings } from "./Settings";
import { NotesView } from "./NotesView";
import { WordCloud } from "./WordCloud";
import CalendarView from "./CalendarView";
import { Calendars, Views } from "./constants";
import { SearchView } from "./SearchView";
import { DateSelection } from "./DateSelection";
import { Header } from "./Header";

function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.HOME);
  const [isDateSelectionOpen, setIsDateSelectionOpen] = useState(false);

  return (
    <>
      <Header
        date={date}
        view={view}
        setView={setView}
        setIsDateSelectionOpen={setIsDateSelectionOpen}
      />
      {view === Views.HOME && <HabitsMainScreen date={date} onDateChange={setDate} />}
      {view === Views.HABITS && <Habits date={date} onDateChange={setDate} />}
      {view === Views.NOTES && <NotesView />}
      {view === Views.SEARCH && <SearchView />}
      {view === Views.WORDCLOUD && <WordCloud />}
      {view === Views.CALENDAR &&
        <div className="flex flex-col gap-4">
          {Calendars.map((calendar, index) => (
            <CalendarView
              key={index}
              date={date}
              isCondensed
              horizontal
              isOpaque
              showLegend
              showFullYear={false}
              calendar={calendar}
              onDateChange={setDate} />
          ))}</div>}

      {view === Views.SETTINGS &&
        <Settings
          onHomeClick={() => setView(Views.HOME)}
          onHabitsClick={() => setView(Views.HABITS)}
          onNotesClick={() => setView(Views.NOTES)}
          onCalendarClick={() => setView(Views.CALENDAR)}
          onSearchClick={() => setView(Views.SEARCH)}
          onWordCloudClick={() => setView(Views.WORDCLOUD)} />}

      {isDateSelectionOpen &&
        <DateSelection
          onDateChange={date => {
            setDate(date);
            setIsDateSelectionOpen(false);
          }} />}

    </>
  )
}

export default App
