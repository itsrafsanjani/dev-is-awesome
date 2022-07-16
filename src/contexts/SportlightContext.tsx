import Spotlight from "@/components/Spotlgiht/Spotlight";
import { useContext, useEffect } from "react";
import { createContext, ReactNode, useCallback, useState } from "react";

type SpotlightContextType = {
  isVisible: boolean;
  openSpotlight: () => void;
  closeSpotlight: () => void;
};

export const SpotlightContext = createContext<SpotlightContextType | null>(
  null
);

export const SpotlightProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openSpotlight = useCallback(() => {
    if (isVisible) return;
    setIsVisible(true);
  }, [isVisible]);

  const closeSpotlight = useCallback(() => {
    if (!isVisible) return;
    setIsVisible(false);
  }, [isVisible]);

  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (isVisible) return;

      if (ev.code === "KeyK" && ev.metaKey) {
        ev.preventDefault();
        setIsVisible(true);
      } else if (ev.code === "Slash") {
        ev.preventDefault();
        setIsVisible(true);
      }
    },
    [isVisible]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <SpotlightContext.Provider
      value={{ isVisible, openSpotlight, closeSpotlight }}
    >
      {children}
      {isVisible && <Spotlight />}
    </SpotlightContext.Provider>
  );
};

export const useSpotlight = () => {
  const context = useContext(SpotlightContext);

  if (!context) {
    throw "useSpotlight must use inside SpotlightProvider";
  }

  return context;
};
