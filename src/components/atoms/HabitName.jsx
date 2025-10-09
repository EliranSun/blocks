const HabitName = ({ calendar, todayValue, sliceTitle }) => {
    return (
        <h1 className="text-base uppercase font-bold">
            {todayValue !== "-1" && calendar.colors[todayValue].name
                ? calendar.colors[todayValue].name
                : sliceTitle ? calendar.name.slice(0, 6) : calendar.name}
        </h1>
    )
};

export default HabitName;