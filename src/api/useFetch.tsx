import { useState, useEffect } from 'react';

enum Endpoint {

}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

function useFetch<T>(endpoint: Endpoint, id?: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `https://lunchapp-backend-production.up.railway.app/${endpoint}${id ? `/${id}` : ''}`;
        const response = await fetch(url);
        const responseData: T = await response.json()
        setData(responseData);
      } catch (fetchError) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;

// API KEY: 88b3f29b4e0276a374f0969df44c5025