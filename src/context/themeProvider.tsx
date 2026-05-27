import { useState, useEffect } from 'react';
import { type ReactNode } from 'react';
import { ThemeContext, ThemeUpdateContext } from './themeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      darkTheme ? 'dark' : 'light'
    );
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
