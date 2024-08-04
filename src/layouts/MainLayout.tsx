import ImageCardWrapper from '../components/ImageCardWrapper/ImageCardWrapper';
import styles from './mainLayout.module.scss';

const mainLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.mainLayoutWrapper}>
                <h1>Infinite scroll app</h1>
                <ImageCardWrapper/>
            </div>
        </div>
    )
}

export default mainLayout