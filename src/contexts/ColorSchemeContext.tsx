import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ColorScheme = "system" | "dark" | "light";

export type ColorSchemeContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
};

export const ColorSchemeContext = createContext<ColorSchemeContextType | null>(
  null
);

const PREFERS_COLOR_SCHEME_DARK = "(prefers-color-scheme: dark)";

export const ColorSchemeProvider = ({
  children,
  defaultScheme = "system",
}: {
  children: ReactNode;
  defaultScheme?: ColorScheme;
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isPrefersDark, setIsPrefersDark] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultScheme);

  const toggleColorScheme: ColorSchemeContextType["toggleColorScheme"] =
    useCallback(() => {
      switch (colorScheme) {
        case "system":
          setColorScheme("light");
          break;
        case "light":
          setColorScheme("dark");
          break;
        case "dark":
          setColorScheme("system");
          break;
      }
    }, [colorScheme]);

  useEffect(() => {
    setIsPrefersDark(window.matchMedia(PREFERS_COLOR_SCHEME_DARK).matches);
    const onColorSchemeChange = (e: MediaQueryListEvent) => {
      setIsPrefersDark(e.matches);
    };
    const storedColorScheme = localStorage.getItem("color-scheme");
    if (storedColorScheme) {
      setColorScheme(storedColorScheme as ColorScheme);
    }
    setIsInitialized(true);
    window
      .matchMedia(PREFERS_COLOR_SCHEME_DARK)
      .addEventListener("change", onColorSchemeChange);
    return () => {
      window
        .matchMedia(PREFERS_COLOR_SCHEME_DARK)
        .removeEventListener("change", onColorSchemeChange);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("color-scheme", colorScheme);
    switch (colorScheme) {
      case "system":
        setIsDark(isPrefersDark);
        break;
      case "light":
        setIsDark(false);
        break;
      case "dark":
        setIsDark(true);
        break;
    }
  }, [colorScheme, isPrefersDark, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, isInitialized]);

  return (
    <ColorSchemeContext.Provider
      value={{ colorScheme, setColorScheme, toggleColorScheme }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw "useColorScheme must use inside ColorSchemeProvider";
  }
  return context;
};
