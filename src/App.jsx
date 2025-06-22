import DateNavigation from "./DateNavigation";
import { useState } from "react";
import CalendarView from "./CalendarView";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <section className="w-full flex flex-col items-center justify-center">
      {/* <DateNavigation date={date} setDate={setDate} /> */}
      <CalendarView date={date} />
    </section>
  )
}

export default App
