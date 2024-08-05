import { useCallback, useEffect, useState } from 'react';
import useFetch, {Key} from '../../api/useFetch';
import styles from './imageCardWrapper.module.scss';
import ImageCard from '../ImageCard/ImageCard';

interface FlickrPhoto {
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
  const {data, loading, error} = useFetch<FlickrResponse>(Key.API_KEY, page)

  const loadMorePhotos = useCallback(() => {
    if (data) {
      setPhotos((prevPhotos) => {
        const newPhotos = data.photos.photo.filter((newPhoto) => !prevPhotos.some((photo) => photo.id === newPhoto.id));
        return [...prevPhotos, ...newPhotos];
      });
    }
  }, [data]);

  useEffect(() => {
    loadMorePhotos();
  }, [data, loadMorePhotos]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading && page === 1) {
    return <div>Loading...</div>;
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
        return (
          <ImageCard key={photo.id} imageUrl={imageUrl} title={photo.title}/>
        )
      })}
      {loading && <div className={styles.loadingIndicator}>Loading more...</div>}
    </div>
  )
}

export default ImageCardWrapper