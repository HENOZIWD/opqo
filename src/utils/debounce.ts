export function debounce<T extends (...args: unknown[]) => void>(
  callbackFn: T,
  delay: number,
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => callbackFn(...args), delay);
  };
}
