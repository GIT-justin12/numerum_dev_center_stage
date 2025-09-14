// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

// 1. Définition du type pour les props du composant
interface ProtectedRouteProps {
  children: ReactNode; // 'ReactNode' est le type pour tout ce qui est rendu par React (JSX, chaînes, etc.)
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

  // Si l'utilisateur n'est pas connecté
  if (!auth.user) {
    // On le redirige vers la page de connexion
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est connecté, on rend le composant enfant
  return children;
};

export default ProtectedRoute;