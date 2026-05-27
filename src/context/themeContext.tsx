import { createContext, useContext } from 'react';

type ThemeUpdateContextProps = () => void;

export const ThemeContext = createContext<boolean>(false);
export const ThemeUpdateContext = createContext<ThemeUpdateContextProps>(
  () => {}
);

export const useTheme = (): boolean => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = (): (() => void) => {
  return useContext(ThemeUpdateContext);
};
