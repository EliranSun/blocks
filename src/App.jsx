import DateNavigation from "./DateNavigation";
import { useState } from "react";
import CalendarView from "./CalendarView";

function App() {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      {/* <DateNavigation date={date} setDate={setDate} /> */}
      <CalendarView />
    </section>
  )
}

export default App
