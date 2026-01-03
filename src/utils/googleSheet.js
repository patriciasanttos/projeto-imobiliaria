export async function fetchGoogleSheetCSV(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch CSV');
  const csv = await response.text();
  return parseCSV(csv);
}


function parseCSV(csv) {
  const [headerLine, ...lines] = csv.trim().split('\n');
  const headers = headerLine.split(',');
  return lines.map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i]?.trim();
    });
    return obj;
  });
}
