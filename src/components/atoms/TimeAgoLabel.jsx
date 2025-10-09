
const TimeAgoLabel = ({ calendar, diffDays, alwaysShow }) => {
    if (!calendar.showTimeAgo && !alwaysShow || diffDays === 0) {
        return null;
    }

    if (diffDays === "Never" && !alwaysShow) {
        return "無"; // mo - none
    }

    return (
        <span className="">
            {diffDays}永
        </span>
    )
}

export default TimeAgoLabel;