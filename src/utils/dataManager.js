/**
 * Calendar Data Export/Import Utilities
 * Handles exporting and importing calendar data from localStorage
 */

/**
 * Exports all calendar-related data from localStorage to a JSON file
 * @param {string} filename - Optional filename for the download
 */
export const exportCalendarData = (filename = `calendar-data-${new Date().toISOString().split('T')[0]}.json`) => {
    try {
        // Get all localStorage data
        const allData = {};

        // Iterate through all localStorage keys
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            // Only export calendar-related data (keys that match the pattern: calendarName_YYYY-MM-DD)
            if (key && key.includes('_') && key.match(/\d{4}-\d{2}-\d{2}$/)) {
                allData[key] = localStorage.getItem(key);
            }
        }

        // Create export object with metadata
        const exportData = {
            exportDate: new Date().toISOString(),
            version: "1.0",
            data: allData
        };

        // Create and download the file
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = filename;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        console.log(`Calendar data exported successfully to ${filename}`);
        return true;
    } catch (error) {
        console.error('Error exporting calendar data:', error);
        alert('Failed to export calendar data. Please try again.');
        return false;
    }
};

/**
 * Imports calendar data from a JSON file
 * @param {File} file - The uploaded JSON file
 * @param {boolean} overwrite - Whether to overwrite existing data or merge
 * @returns {Promise<boolean>} - Success status
 */
export const importCalendarData = (file, overwrite = false) => {
    return new Promise((resolve) => {
        if (!file) {
            alert('Please select a file to import.');
            resolve(false);
            return;
        }

        if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
            alert('Please select a valid JSON file.');
            resolve(false);
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target.result;
                const importData = JSON.parse(content);

                // Validate the import data structure
                if (!importData.data || typeof importData.data !== 'object') {
                    throw new Error('Invalid file format: missing or invalid data object');
                }

                let importCount = 0;
                let skipCount = 0;

                // Import each data entry
                Object.entries(importData.data).forEach(([key, value]) => {
                    // Validate key format (should be calendarName_YYYY-MM-DD)
                    if (key.includes('_') && key.match(/\d{4}-\d{2}-\d{2}$/)) {
                        const existingValue = localStorage.getItem(key);

                        if (!existingValue || overwrite) {
                            localStorage.setItem(key, value);
                            importCount++;
                        } else {
                            skipCount++;
                        }
                    }
                });

                const message = `Import completed!\n${importCount} entries imported${skipCount > 0 ? `\n${skipCount} entries skipped (already exist)` : ''}`;
                alert(message);
                console.log(message);

                resolve(true);
            } catch (error) {
                console.error('Error importing calendar data:', error);
                alert('Failed to import calendar data. Please check that the file is valid.');
                resolve(false);
            }
        };

        reader.onerror = () => {
            console.error('Error reading file');
            alert('Error reading file. Please try again.');
            resolve(false);
        };

        reader.readAsText(file);
    });
};

/**
 * Triggers file input for importing data
 * @param {boolean} overwrite - Whether to overwrite existing data
 * @param {Function} onSuccess - Callback function called on successful import
 */
export const triggerImport = (overwrite = false, onSuccess = null) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (e) => {
        const file = e.target.files[0];
        const success = await importCalendarData(file, overwrite);

        if (success && onSuccess) {
            onSuccess();
        }
    };

    input.click();
};

/**
 * Gets a summary of calendar data in localStorage
 * @returns {Object} Summary object with stats
 */
export const getDataSummary = () => {
    const calendars = new Set();
    let totalEntries = 0;
    const dateRange = { earliest: null, latest: null };

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.includes('_') && key.match(/\d{4}-\d{2}-\d{2}$/)) {
            totalEntries++;

            const [calendarName, dateStr] = key.split('_');
            calendars.add(calendarName);

            const date = new Date(dateStr);
            if (!dateRange.earliest || date < dateRange.earliest) {
                dateRange.earliest = date;
            }
            if (!dateRange.latest || date > dateRange.latest) {
                dateRange.latest = date;
            }
        }
    }

    return {
        totalEntries,
        calendarsCount: calendars.size,
        calendars: Array.from(calendars),
        dateRange
    };
}; 