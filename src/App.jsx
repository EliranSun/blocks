import CalendarView from "./CalendarView";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#242424');
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <CalendarView />
    </section>
  )
}

export default App
