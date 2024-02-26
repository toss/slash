export const isAndroid = (() => {
  return () => {
    return /Android/.test(navigator.userAgent);
  };
})();
