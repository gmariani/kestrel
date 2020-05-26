import * as React from 'react';
import MediaList from '../../components/medialist';
import styles from './home.scss';

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={`${styles.container} ${styles['home__title-container']}`}>
                <h1 className={styles.home__title}>Home</h1>
            </div>
            <MediaList source='s3' />
        </div>
    );
}
