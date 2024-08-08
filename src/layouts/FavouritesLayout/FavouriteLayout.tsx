import styles from './favouriteLayout.module.scss';
import ImageCard from '../../components/ImageCard/ImageCard';
import { useEffect, useState } from 'react';

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

const FavouriteLayout = () => {

  const [favourites, setFavourites] = useState<FlickrPhoto[]>([])

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
  };

  return (
    <div className={styles.container}>
      <div className={styles.favouriteLayoutWrapper}>
        <h1>Favourite images</h1>
        <div className={styles.favouriteCards}>
          {favourites.length === 0 ? (
            <p>No favourites yet!</p>
          ) : (
            favourites.map((photo) => {
              const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
              return (
                <ImageCard
                  key={photo.id}
                  imageUrl={imageUrl}
                  title={photo.title}
                  isFavourite={true}
                  onClick={() => handleFavourite(photo)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default FavouriteLayout