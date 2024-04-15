function formatDate(timestamp) {
  // Create a Date object from the Unix timestamp (in milliseconds)
  const date = new Date(timestamp * 1000);

  // Year (YYYY format)
  const year = date.getFullYear();

  // Month (0-indexed, so we need + 1 and padding)
  const month = String(date.getMonth() + 1).padStart(2, '0');

  // Day (pad with leading zero if needed)
  const day = String(date.getDate()).padStart(2, '0');

  // Return the formatted date
  return `${year}-${month}-${day}`;
}

export { formatDate };