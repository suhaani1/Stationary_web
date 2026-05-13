import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

function ThemeProvider({
  children,
}) {

  const [darkMode,
    setDarkMode] =
    useState(() => {

      const savedTheme =
        localStorage.getItem(
          "darkMode"
        );

      return savedTheme
        ? JSON.parse(savedTheme)
        : false;
    });

  useEffect(() => {

    localStorage.setItem(
      "darkMode",

      JSON.stringify(
        darkMode
      )
    );

    if (darkMode) {

      document.body.classList.add(
        "dark"
      );

    } else {

      document.body.classList.remove(
        "dark"
      );
    }

  }, [darkMode]);

  const toggleTheme = () => {

    setDarkMode(
      !darkMode
    );
  };

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

export default ThemeProvider;