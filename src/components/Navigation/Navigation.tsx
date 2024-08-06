import styles from './navigation.module.scss';
import Link from '../Router/Link';

const Navigation = () => {
  return (
    <nav className={styles.navigationWrapper}>
        <Link to='/'>Infinite scroll app</Link>
        <Link to='/favourites'>Favourites</Link>
    </nav>
  )
}

export default Navigation