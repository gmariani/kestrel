import { useEffect, useState } from 'react';

export default function useTMDB(type = 'tv', id, seasonNumber = null) {
    const [tmdb, setTMDB] = useState([]);
    const apiKey = process.env.REACT_APP_TMDB_KEY;

    useEffect(() => {
        const getTypeURL = () => {
            switch (type) {
                case 'movie':
                    return `https://api.themoviedb.org/3/movie/${id}`;
                case 'season':
                    return `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`;
                case 'tv':
                default:
                    return `https://api.themoviedb.org/3/tv/${id}`;
            }
        };

        fetch(`${getTypeURL()}?api_key=${apiKey}&language=en-US`)
            .then((res) => res.json())
            .then(
                (result) => {
                    setTMDB({
                        isLoaded: true,
                        data: result,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setTMDB({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }, [apiKey, type, id, seasonNumber]);

    return { tmdb };
}
