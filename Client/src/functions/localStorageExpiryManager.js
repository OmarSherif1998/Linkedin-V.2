// Set an item with expiry
export function setWithExpiry(key, value, ttl) {
  const now = Date.now();
  const item = {
    value,
    expiry: now + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Get item and check if it's still valid
export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}
