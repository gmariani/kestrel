import * as React from 'react';
import styles from './directory-movie.scss';

interface Props {
    title?: string;
    backgroundImage?: string;
}

function DirectoryMovie(props: Props) {
    const classes: string = `${styles.movie}`;
    const backgroundImage: string = props.backgroundImage ? `url(${props.backgroundImage})` : '';
    const thumbStyle = {
        backgroundImage,
    };
    const title: string = props.title ?? 'No Title';
    return (
        <div className={classes}>
            <h1 className={styles.movie__title}>{title}</h1>
            <div className={styles.movie__background} style={thumbStyle} />
            <div className='tint' />
        </div>
    );
}

// Auto select current photo
DirectoryMovie.defaultProps = {
    onClick: () => {},
};

export default DirectoryMovie;
