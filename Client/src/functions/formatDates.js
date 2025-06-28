export function formatDates(dateStr) {
  if (dateStr.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateStr); // Create Date object

  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
}
