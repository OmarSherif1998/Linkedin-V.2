export function formatTimeToHHMM(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0"); // Ensure 2 digits (e.g., "09")
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
