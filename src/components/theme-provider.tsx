import React, { createContext, useContext, useLayoutEffect } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (_theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: ThemeProviderProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;

    // hard-force light mode
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";

    // wipe any stale saved theme values from older builds
    try {
      localStorage.removeItem("vite-ui-theme");
      localStorage.removeItem("theme");
    } catch {}
  }, []);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme: "light",
        setTheme: () => {},
        toggleTheme: () => {},
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);
