function generateRandomId() {
  return Math.random().toString(36).substring(2, 15); // simple random string
}

export default generateRandomId;
