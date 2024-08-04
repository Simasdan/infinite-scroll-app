import styles from './mainLayout.module.scss';

const mainLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.mainLayoutWrapper}>
                <h1>Vinted Homework Assignment</h1>
            </div>
        </div>
    )
}

export default mainLayout