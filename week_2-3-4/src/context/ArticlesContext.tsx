import { createContext, useCallback, useContext, type ReactNode } from 'react';
import type { Article, Articles } from '../types/article';
import useFetch from '../hooks/useFetch';


// Type pour le contexte
interface ArticlesContextType {
  data: Articles | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  getArticleById: (id: string) => Article | undefined;
}

// Création du contexte
const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useArticles = (): ArticlesContextType => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};

// Props du Provider
interface ArticlesProviderProps {
  children: ReactNode;
  subject?: string;
  language?: string;
}

// Composant Provider
export const ArticlesProvider: React.FC<ArticlesProviderProps> = ({ 
  children, 
  subject = 'World',
  language = 'fr',
}) => {
  const isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
  const API_KEY = isDev ? import.meta.env.VITE_GNEWS_API_KEY : import.meta.env.GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/top-headlines?category=${subject}&lang=${language}&apikey=${API_KEY}`;

  const { data, loading, error, refetch } = useFetch<Articles>(url);

  // Fonction pour trouver un article par ID
  const getArticleById = useCallback((id: string): Article | undefined => {
    if (!data || !data.articles) return undefined;
    return data.articles.find(article => 
      article.id === id
    );
  }, [data]);

  const value: ArticlesContextType = {
    data,
    loading,
    error,
    refetch,
    getArticleById
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;