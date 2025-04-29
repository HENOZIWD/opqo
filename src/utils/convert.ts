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
