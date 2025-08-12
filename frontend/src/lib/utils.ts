export function formatDate(date: Date) {
  return date.toLocaleDateString("eng-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
