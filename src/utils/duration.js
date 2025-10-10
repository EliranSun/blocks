
/**
 * Aggregates duration data by day
 * @param {Array} data - Array of duration entries with 'start date' and 'duration' fields
 * @returns {Object} Object with dates as keys and total hours as values
 * Example: { "2025-01-28": 2.5, "2025-02-08": 3.75 }
 */
export function aggregateDurationsByDay(data) {
  const dailyTotals = {};

  data.forEach(entry => {
    // Extract the date part (YYYY-MM-DD) from the start date
    const date = entry["start date"].split(" ")[0];
    const durationMinutes = entry.duration;

    // Add to the daily total
    if (!dailyTotals[date]) {
      dailyTotals[date] = 0;
    }
    dailyTotals[date] += durationMinutes;
  });

  // Convert minutes to hours and round to 2 decimal places
  const dailyTotalsInHours = {};
  Object.keys(dailyTotals).forEach(date => {
    dailyTotalsInHours[date] = Math.round((dailyTotals[date] / 60) * 100) / 100;
  });

  return dailyTotalsInHours;
}

/**
 * Gets duration data sorted by date
 * @param {Array} data - Array of duration entries
 * @returns {Array} Array of [date, hours] sorted by date
 */
export function getDurationsSortedByDate(data) {
  const aggregated = aggregateDurationsByDay(data);
  return Object.entries(aggregated).sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * Gets total duration across all days
 * @param {Array} data - Array of duration entries
 * @returns {number} Total hours
 */
export function getTotalDuration(data) {
  const aggregated = aggregateDurationsByDay(data);
  return Math.round(Object.values(aggregated).reduce((sum, hours) => sum + hours, 0) * 100) / 100;
}
