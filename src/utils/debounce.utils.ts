export const debounce = (cb: (...args: unknown[]) => void, delay = 1000) => {
  let timeout: number;

  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
