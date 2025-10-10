import fs from 'fs';

// Read the CSV file
const csv = fs.readFileSync('export_2025_detailed (1).csv', 'utf8');

// Split into lines
const lines = csv.trim().split('\n');

// Parse CSV, handling quoted fields
const result = lines.slice(1).filter(line => line.trim()).map(line => {
  const regex = /(?:"([^"]*(?:""[^"]*)*)"|([^,]*))/g;
  const values = [];
  let match;
  
  while ((match = regex.exec(line)) !== null) {
    values.push(match[1] ? match[1].replace(/""/g, '"') : match[2]);
  }
  
  return {
    startDate: values[0],
    endDate: values[1],
    duration: parseFloat(values[2]) || 0,
    name: values[3] || '',
    notes: values[4] || ''
  };
});

// Write to JSON file
fs.writeFileSync('read-data.json', JSON.stringify(result, null, 2));

console.log(`Conversion complete! Created read-data.json with ${result.length} entries.`);

