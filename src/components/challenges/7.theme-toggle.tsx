
"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

 export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeButton() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("ThemeContext missing");

  const { theme, toggleTheme } = context;

  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}
