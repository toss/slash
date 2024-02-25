export const isIOS = (function () {
  // if (isServer) {
  //   return false;
  // }

  return navigator.userAgent.match(/iPhone|iPad|iPod/i) != null;
})();
