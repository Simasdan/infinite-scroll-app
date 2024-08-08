import styles from './imageCard.module.scss';

export interface ImageCardProps {
  imageUrl: string;
  title: string;
  isFavourite: boolean;
  onClick: () => void;
}

const ImageCard = ({ imageUrl, title, isFavourite, onClick }: ImageCardProps) => {
  return (
    <div className={styles.cardWrapper}>
      <figure className={styles.imageCard}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </figure>
      <div className={styles.hoveredImageCard}>
        <h3>{title}</h3>
        <div className={styles.seperator}></div>
        <button onClick={onClick}>{isFavourite ? 'Unfavourite' : 'Favourite'}</button>
      </div>
    </div>
  )
}

export default ImageCard