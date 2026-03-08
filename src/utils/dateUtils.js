const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function parseDate(dateStr) {
  if (!dateStr || dateStr === 'present') return new Date(9999, 11);
  const parts = dateStr.split('-');
  if (parts.length >= 2) return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1);
  return new Date(parseInt(parts[0]), 0);
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === 'present') return 'Present';
  const parts = dateStr.split('-');
  if (parts.length >= 2) return `${MONTHS[parseInt(parts[1]) - 1]} ${parts[0]}`;
  return parts[0];
}

export function formatYear(dateStr) {
  if (!dateStr || dateStr === 'present') return 'Now';
  return dateStr.split('-')[0];
}

export function formatDateRange(start, end) {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function sortByDateDesc(entries, field = 'end_date') {
  return [...entries].sort((a, b) => {
    const da = parseDate(a[field]);
    const db = parseDate(b[field]);
    if (db - da !== 0) return db - da;
    return parseDate(b.start_date) - parseDate(a.start_date);
  });
}
