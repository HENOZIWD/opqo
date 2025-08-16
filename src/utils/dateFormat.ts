interface DateFormatOptionParams {
  locale?: string;
  timeZone?: string;
}

export function formatDateString(
  dateStr: string,
  options?: DateFormatOptionParams,
) {
  const date = new Date(dateStr);

  return date.toLocaleDateString(options?.locale, { timeZone: options?.timeZone });
}

export function formatDateTimeString(
  dateStr: string,
  options?: DateFormatOptionParams,
) {
  const date = new Date(dateStr);

  return date.toLocaleString(options?.locale, { timeZone: options?.timeZone });
}
