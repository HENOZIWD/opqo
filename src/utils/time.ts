export function numberToTime(second: number) {
  if (Number.isNaN(Number(second))) {
    return null;
  }

  if (second > 3600) {
    return `${(second / 3600) >> 0}:${(((second % 3600) / 60) >> 0).toString().padStart(2, '0')}:${((second % 60) >> 0).toString().padStart(2, '0')}`;
  }

  return `${(second / 60) >> 0}:${((second % 60) >> 0).toString().padStart(2, '0')}`;
}
