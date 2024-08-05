import { useEffect, useState } from 'react';
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
  const {data, loading, error} = useFetch<FlickrResponse>(Key.API_KEY)
  const photoArray = data?.photos.photo;

  useEffect(() => {
    if (data) {
      console.log(photoArray)
    }
  }, [data])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data.</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <div className={styles.imageCardWrapper}>
      {photoArray?.map((photo) => {
        const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        return (
          <ImageCard key={photo.id} imageUrl={imageUrl} title={photo.title}/>
        )
      })}
    </div>
  )
}

export default ImageCardWrapper