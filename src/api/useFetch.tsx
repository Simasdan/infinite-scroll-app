import { useState, useEffect } from 'react';

export enum Key {
  API_KEY = '88b3f29b4e0276a374f0969df44c5025'
}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

function useFetch<T>(key: Key): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${key}&gallery_id=72157722769669046&format=json&nojsoncallback=1`;
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
  }, [key]);

  return { data, loading, error };
}

export default useFetch;

// API KEY: 88b3f29b4e0276a374f0969df44c5025