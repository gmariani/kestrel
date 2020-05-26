import * as React from 'react';
import Item from './item';
import ItemSkeleton from './item-skeleton';
import styles from './medialist.scss';
import { useAsync } from 'react-async';

interface Props {
    source?: string;
    className?: string;
}

interface MediaResult {
    id: number;
    user_id: number;
    s3_key: string;
    name: string;
    thumbnail_url: string;
    metadata: string;
    created_at: string;
    updated_at: string;
    url: string;
}

// Then we'll fetch user data from this API
const loadMedia = async () =>
    await fetch('http://kestrel.test:8081/api/v1/media')
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());

function MediaList(props: Props) {
    const { data, error, isLoading } = useAsync({ promiseFn: loadMedia });

    if (isLoading) {
        return (
            <ul className={`${styles.component} ${styles.container}`}>
                {[...Array(18)].map((e, i) => (
                    <li>
                        <ItemSkeleton />
                    </li>
                ))}
            </ul>
        );
    }
    if (error) return <div>Something went wrong: {error.message}</div>;
    if (data) {
        return (
            <ul className={`${styles.component} ${styles.container}`}>
                {data.map((media: MediaResult) => (
                    <li>
                        <Item title={media.name} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default MediaList;
