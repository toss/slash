import React from "react";

/** @tossdocs-ignore */
export const useDeviceInfo = ()=> {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isIOS, setIsIOS] = React.useState<boolean>(false);
  const [isAOS, setIsAOS] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(isMobile);
    if (isMobile) {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsIOS(isIOS);
      const isAOS = /Android/i.test(navigator.userAgent);
      setIsAOS(isAOS);
    }
  }, []);

  return {
    isMobile,
    isIOS,
    isAOS,
  };
};
