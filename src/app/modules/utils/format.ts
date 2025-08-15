export function getLocale() {
  return new Intl.DateTimeFormat().resolvedOptions().locale;
}

export function getTimeZone() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
