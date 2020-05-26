import * as React from 'react';
import styles from './item.scss';

interface ItemProps {
    title?: string;
    backgroundImage?: string;
}

export default class Item extends React.Component<ItemProps> {
    static defaultProps = {
        onClick: () => {},
        title: 'No Title',
        backgroundImage: 'https://via.placeholder.com/300x155',
    };

    render() {
        return (
            <div className={styles['item']}>
                <a className={styles['item__thumbnail']}>
                    <div className={styles['item__image-container']}>
                        <img
                            className={styles['item__image']}
                            src={this.props.backgroundImage}
                            alt={`Cover art for ${this.props.title}`}
                        />
                    </div>
                </a>
                <div className={styles['item__content']}>
                    <a className={styles['item__title']}>{this.props.title}</a>
                </div>
            </div>
        );
    }
}
