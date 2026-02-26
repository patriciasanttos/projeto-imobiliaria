export async function fetchGoogleSheetCSV(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch CSV');
  const csv = await response.text();
  return parseCSV(csv);
}

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        fields.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseCSV(csv) {
  // Split into logical rows (handle newlines inside quoted fields)
  const rows = [];
  let current = '';
  let inQuotes = false;
  const chars = csv.trim();

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    }
    if (!inQuotes && (ch === '\n' || (ch === '\r' && chars[i + 1] === '\n'))) {
      rows.push(current);
      current = '';
      if (ch === '\r') i++; // skip \n after \r
    } else {
      current += ch;
    }
  }
  if (current) rows.push(current);

  const [headerLine, ...dataLines] = rows;
  const headers = parseCsvLine(headerLine);

  return dataLines.map(line => {
    const values = parseCsvLine(line);
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    return obj;
  });
}
