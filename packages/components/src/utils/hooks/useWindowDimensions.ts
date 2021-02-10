import { useEffect, useState } from "react";

export type WindowDimensionsType = {
  width: number;
  height: number;
};

export const getWindowDimensions = (): WindowDimensionsType => {
  return {
    width: document.documentElement.clientWidth || window.innerWidth,
    height: document.documentElement.clientHeight || window.innerHeight,
  };
};

export const useWindowDimensions = (): WindowDimensionsType => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensionsType>();

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    const res = getWindowDimensions();
    if (windowDimensions !== res) {
      setWindowDimensions(res);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions || { width: 0, height: 0 };
};
