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
import { AtlyFive } from "./AtlyFive";
import { HabitView } from "./HabitView";
import { Categories } from "./constants";
import GlassNavigation from "./components/molecules/GlassNavigation";

const PageCategories = [
  {
    name: "self", label: "I", categories: Categories.filter(category =>
      category.name === "Mood" ||
      category.name === "Health" ||
      category.name === "Creative" ||
      category.name === "Avoid")
  },

  {
    name: "together", label: "II", categories: Categories.filter(category =>
      category.name === "Wife" ||
      category.name === "House")
  },

  { name: "outside", label: "III", categories: Categories.filter(category => category.name === "Social") },

];

function App() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.HOME);
  const [habit, setHabit] = useState(null);
  const [isDateSelectionOpen, setIsDateSelectionOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(PageCategories[0].name);

  return (
    <>
      <GlassNavigation
        categories={PageCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Header
        date={date}
        view={view}
        title={selectedCategory}
        setView={setView}
        habitName={habit?.name}
        habitIcon={habit?.icon}
        setIsDateSelectionOpen={setIsDateSelectionOpen}
        onTitleClick={() => {
          setView(Views.HABITS);
          setHabit(null);
        }}
      />
      <div className="mt-32" /> {/* This is to offset the header height */}
      {(() => {
        switch (view) {
          case Views.HOME: {
            return (
              <HabitsMainScreen
                date={date}
                onDateChange={setDate}
                onContinue={() => setView(Views.HABITS)} />
            );
          }

          case Views.ATLY:
            return <AtlyFive />;

          case Views.HABITS:
            return (
              <Habits
                date={date}
                onDateChange={setDate}
                selectedCategories={PageCategories.find(category => {
                  return category.name === selectedCategory;
                }).categories}
                onHabitClick={calendar => {
                  setHabit(calendar);
                  setView(Views.HABIT);
                }}
              />
            );

          case Views.HABIT:
            return habit !== null ? (
              <HabitView date={date} setView={setView} habit={habit} setDate={setDate} />
            ) : null;

          case Views.NOTES:
            return <NotesView />;

          case Views.SEARCH:
            return <SearchView />;

          case Views.WORDCLOUD:
            return <WordCloud />;

          case Views.CALENDAR:
            return (
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
                    onDateChange={setDate}
                  />
                ))}
              </div>
            );

          case Views.SETTINGS:
            return (
              <Settings
                onHomeClick={() => setView(Views.HOME)}
                onHabitsClick={() => setView(Views.HABITS)}
                onThoughtsClick={() => setView(Views.NOTES)}
                onCalendarClick={() => setView(Views.CALENDAR)}
                onSearchClick={() => setView(Views.SEARCH)}
                onAtlyClick={() => setView(Views.ATLY)}
                onWordCloudClick={() => setView(Views.WORDCLOUD)}
                onHabitClick={calendar => {
                  setHabit(calendar);
                  setView(Views.HABIT);
                }}
              />
            );

          default:
            return null;
        }
      })()}

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
