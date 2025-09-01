const SECOND_PER_MINUTE = 60;
const SECOND_PER_HOUR = 60 * SECOND_PER_MINUTE;

export function formatElapsedTime(second: number) {
  const hourString = `${Math.floor(second / SECOND_PER_HOUR)}`.padStart(2, '0');
  const minuteString = `${Math.floor((second % SECOND_PER_HOUR) / SECOND_PER_MINUTE)}`.padStart(2, '0');
  const secondString = `${second % SECOND_PER_MINUTE}`.padStart(2, '0');

  return `${hourString}:${minuteString}:${secondString}`;
}
