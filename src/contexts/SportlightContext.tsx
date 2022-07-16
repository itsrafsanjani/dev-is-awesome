import Spotlight from "@/components/Spotlgiht/Spotlight";
import { useContext, useEffect, useRef } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);

  const chagneContentFocus = useCallback(
    (shouldFocusable: boolean) => {
      if (!contentRef.current) return;
      const childs = getFocusableElements(contentRef.current);
      childs.forEach((child) => {
        if (shouldFocusable) {
          const tabindex = child.getAttribute("data-tabindex");
          if (tabindex) {
            child.setAttribute("tabindex", tabindex);
          } else {
            child.removeAttribute("tabindex");
          }
          child.removeAttribute("data-tabindex");
        } else {
          const tabindex = child.getAttribute("tabindex");
          if (tabindex) {
            child.setAttribute("data-tabindex", tabindex);
          }
          child.setAttribute("tabindex", "-1");
        }
      });
    },
    [contentRef]
  );

  const openSpotlight = useCallback(() => {
    if (isVisible) return;
    setIsVisible(true);
    chagneContentFocus(false);
  }, [isVisible, chagneContentFocus]);

  const closeSpotlight = useCallback(() => {
    if (!isVisible) return;
    setIsVisible(false);
    chagneContentFocus(true);
  }, [isVisible, chagneContentFocus]);

  const onKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (isVisible) return;

      if (ev.code === "KeyK" && ev.metaKey) {
        ev.preventDefault();
        openSpotlight();
      } else if (ev.code === "Slash") {
        ev.preventDefault();
        openSpotlight();
      }
    },
    [isVisible, openSpotlight]
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
      <div ref={contentRef}>{children}</div>
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

const getFocusableElements = (node: HTMLElement) => {
  return [
    ...node.querySelectorAll("a"),
    ...node.querySelectorAll("button"),
    ...node.querySelectorAll("input"),
    ...node.querySelectorAll("[tabindex]"),
  ];
};
