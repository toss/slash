export const isAndroid = (function () {
  // if (isServer) {
  //   return false;
  // }

  return navigator.userAgent.match(/Android/i) != null;
})();
