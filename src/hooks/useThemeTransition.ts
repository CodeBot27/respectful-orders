import { useTheme } from "next-themes";

export const useThemeTransition = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Check if View Transitions API is supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      });
    } else {
      // Fallback for browsers that don't support View Transitions
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return { theme, toggleTheme };
};
