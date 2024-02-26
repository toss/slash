export const isIOS = (() => {
  return () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };
})();
