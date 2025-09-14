import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

// Définir le type (facultatif si tu n’es pas en TS)
interface ThemeContextType {
  theme: boolean;
  toggleTheme: () => void;
}

// Créer le context (avec une valeur par défaut vide)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(true); // false pour le mode sombre, true pour le mode clair

  const toggleTheme = () => {
    setTheme(prev => !prev); 
    console.log(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  }
  return context;
};
