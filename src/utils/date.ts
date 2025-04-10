export function formatDateString(isoDateStr: string) {
  const date = new Date(isoDateStr);

  return date.toLocaleDateString();
}

export function formatDateTimeString(isoDateStr: string) {
  const date = new Date(isoDateStr);

  return date.toLocaleTimeString();
}
