import * as React from 'react';
import styles from './item-skeleton.scss';

export default class ItemSkeleton extends React.Component {
    render() {
        return (
            <div className={styles['item-skeleton']}>
                <div className={styles['item-skeleton__image-container']}></div>
                <div className={styles['item-skeleton__content']}></div>
            </div>
        );
    }
}
