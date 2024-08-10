import { useCallback, useEffect, useState } from 'react';
import useFetch, { Key } from '../../api/useFetch';
import styles from './imageCardWrapper.module.scss';
import ImageCard from '../ImageCard/ImageCard';

export interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

interface FlickrResponse {
  photos: {
    photo: FlickrPhoto[]
  }
}

const ImageCardWrapper = () => {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);
  const [favourites, setFavourites] = useState<FlickrPhoto[]>([]);
  const { data, loading, error } = useFetch<FlickrResponse>(Key.API_KEY, page)

  const loadMorePhotos = useCallback(() => {
    if (data) {
      setPhotos((prevPhotos) => {
        const newPhotos = data.photos.photo.filter((newPhoto) => !prevPhotos.some((photo) => photo.id === newPhoto.id));
        return [...prevPhotos, ...newPhotos];
      });
    }
  }, [data]);

// Adjustment for scroll on mobile devices
const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
// Adjustment for scroll on mobile devices

  // useEffect(() => {
  //   loadMorePhotos();

  //   const handleScroll = () => {
  //     if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [data, loadMorePhotos]);

  useEffect(() => {
    const handleScroll = () => {
      const buffer = 200;
      const scrollPosition = window.scrollY + window.innerHeight + buffer;
      const bottomPosition = document.documentElement.scrollHeight;
  
      if (scrollPosition >= bottomPosition) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    const throttledHandleScroll = throttle(handleScroll, 200);
  
    window.addEventListener('scroll', throttledHandleScroll);
  
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [data, loadMorePhotos]);

  useEffect(() => {
    loadMorePhotos();
  }, [data, loadMorePhotos]);
// Adjustment for scroll on mobile devices

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(storedFavourites);
  }, []);

  const handleFavourite = (photo: FlickrPhoto) => {
    let updatedFavourites: FlickrPhoto[];
    if (favourites.some((fav) => fav.id === photo.id)) {
      updatedFavourites = favourites.filter((fav) => fav.id !== photo.id);
    } else {
      updatedFavourites = [...favourites, photo];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  }

  if (loading && page === 1) {
    return <div className={styles.loader}></div>;
  }

  if (error) {
    return <div>Error loading the data.</div>;
  }

  if (photos.length === 0 && !loading) {
    return <div>No data available.</div>;
  }

  return (
    <div className={styles.imageCardWrapper}>
      {photos?.map((photo) => {
        const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const isFavourite = favourites.some((fav) => fav.id === photo.id);
        return (
          <ImageCard key={photo.id} imageUrl={imageUrl} title={photo.title} isFavourite={isFavourite} onClick={() => handleFavourite(photo)} />
        )
      })}
      {loading &&
        <div className={styles.loadingIndicator}>
          <div className={styles.loader}></div>
        </div>}
    </div>
  )
}

export default ImageCardWrapper