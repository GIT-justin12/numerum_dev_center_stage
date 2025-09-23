import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/User";


// Définition du type pour le contexte d'authentification
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, users: User[]) => Boolean;
  logout: () => Promise<void>;
}

// Crée le contexte avec son type
const AuthContext = createContext<AuthContextType | null>(null);

// Le fournisseur de contexte qui enveloppe votre application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Spécifie explicitement que l'état peut être de type 'User' ou 'null'
    const [user, setUser] = useState<User | null>(null);

// Fonction de connexion typée
const login = (username: string, password: string, users: User[]): Boolean => {
  const userData = users.filter(user => (user.username === username && user.password === password));
  if (userData.length === 1) {
      setUser(userData[0]);
      return true;
  }
  return false;
};

  // Fonction de déconnexion typée
  const logout = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        resolve();
      }, 500);
    });
  };

  // Les données et fonctions qui seront partagées
  const auth = { user, login, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
