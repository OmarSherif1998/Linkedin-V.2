export default function timeAgo(timestamp) {
  const now = Date.now();
  const time = new Date(timestamp).getTime(); // ✅ ensure timestamp is a number
  const diffMs = now - time;

  if (isNaN(diffMs)) return "Invalid date"; // Optional safety check

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}
