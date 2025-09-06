import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Définition d'un type générique <T> qui peut être n'importe quel type de données
// Le hook accepte une URL qui est une chaîne de caractères
function useFetch<T>(url: string): UseFetchResult<T> {
  // L'état 'data' peut être de type T ou null
  const [data, setData] = useState<T | null>(null);
  
  // L'état 'loading' est un boolean
  const [loading, setLoading] = useState<boolean>(true);
  
  // L'état 'error' est de type Error ou null
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error ! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (e: any) {
        setError(e as Error); // L'erreur peut être de type inconnu, on la "cast" en Error
        setData(null);
      } finally {
        setLoading(false);
      }
    };
  
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [url]); // L'effet se relance si l'URL change

  const refetch = () => {
    fetchData();
  };

  // Le hook retourne un objet avec des types clairement définis
  return { data, loading, error, refetch };
}

export default useFetch;