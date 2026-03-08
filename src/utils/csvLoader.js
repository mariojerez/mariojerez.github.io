import { useState, useEffect } from 'react';

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(text) {
  const lines = text.trim().split('\n').filter(l => l.trim());
  if (lines.length === 0) return [];
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? '').trim()]));
  });
}

export async function loadCSV(filename) {
  const response = await fetch(`/data/${filename}`);
  if (!response.ok) throw new Error(`Failed to load /data/${filename}`);
  const text = await response.text();
  return parseCSV(text);
}

export function parseList(str) {
  if (!str) return [];
  return str.split('|').map(s => s.trim()).filter(Boolean);
}

export function useCSV(filename) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCSV(filename)
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filename]);

  return { data, loading };
}
