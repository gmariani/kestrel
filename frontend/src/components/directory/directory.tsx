import * as React from 'react';
import Movie from './movie';
import styles from './directory.scss';
import { useAsync } from 'react-async';

interface Props {
    source?: string;
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
const loadMovies = async () =>
    await fetch('http://kestrel.test:8081/api/v1/media')
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());

function Directory(props: Props) {
    const { data, error, isLoading } = useAsync({ promiseFn: loadMovies });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>`Something went wrong: ${error.message}`</div>;
    if (data) {
        return (
            <ul>
                {data.map((movie: MediaResult) => (
                    <li>
                        <Movie title={movie.name} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default Directory;
