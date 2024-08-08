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

export const handleFavourite = (
  photo: FlickrPhoto,
  favourites: FlickrPhoto[],
  setFavourites: (favs: FlickrPhoto[]) => void,
  storage: { setItem: (key: string, value: string) => void }) => {

  let updatedFavourites: FlickrPhoto[];

  if (favourites.some((fav) => fav.id === photo.id)) {
    updatedFavourites = favourites.filter((fav) => fav.id !== photo.id);
  } else {
    updatedFavourites = [...favourites, photo];
  }

  setFavourites(updatedFavourites);
  storage.setItem('favourites', JSON.stringify(updatedFavourites));
};