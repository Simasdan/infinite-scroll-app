import styles from './imageCard.module.scss';

export interface ImageCardProps {
  imageUrl: string;
  title: string;
}

const ImageCard = ({ imageUrl, title }: ImageCardProps) => {
  return (
    <div className={styles.cardWrapper}>
      <figure className={styles.imageCard}>
        <img className={styles.image} src={imageUrl} alt={title} />
      </figure>
      <div className={styles.hoveredImageCard}>
        <h3>{title}</h3>
        <button>Favourite</button>
      </div>
    </div>
  )
}

export default ImageCard