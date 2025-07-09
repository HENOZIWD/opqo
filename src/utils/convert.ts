function toFixedTrim(num: number, digits: number) {
  return parseFloat(num.toFixed(digits)).toString();
}

export function numberToFileSize(byte: number) {
  if (byte < 1024) {
    return byte === 1 ? `${byte} Byte` : `${byte} Bytes`;
  }

  if (byte < 1024 * 1024) {
    return `${toFixedTrim(byte / 1024, 2)} KB`;
  }

  if (byte < 1024 * 1024 * 1024) {
    return `${toFixedTrim(byte / (1024 * 1024), 2)} MB`;
  }

  if (byte < 1024 * 1024 * 1024 * 1024) {
    return `${toFixedTrim(byte / (1024 * 1024 * 1024), 2)} TB`;
  }
}

export function numberToTime(second: number) {
  if (Number.isNaN(Number(second)) || second < 0) {
    return null;
  }

  if (second > 3600) {
    return `${(second / 3600) >> 0}:${(((second % 3600) / 60) >> 0).toString().padStart(2, '0')}:${((second % 60) >> 0).toString().padStart(2, '0')}`;
  }

  return `${(second / 60) >> 0}:${((second % 60) >> 0).toString().padStart(2, '0')}`;
}
