import { useEffect, useState } from 'react';

export default function useTMDB(type = 'tv', id, season_number = null) {
    const [tmdb, setTMDB] = useState([]);
    const api_key = process.env.REACT_APP_TMDB_KEY;

    const getTypeURL = (type, id, season_number = null) => {
        switch (type) {
            case 'movie':
                return `https://api.themoviedb.org/3/movie/${id}`;
            case 'season':
                return `https://api.themoviedb.org/3/tv/${id}/season/${season_number}`;
            case 'tv':
            default:
                return `https://api.themoviedb.org/3/tv/${id}`;
        }
    };

    useEffect(() => {
        console.log(`Hello ${getTypeURL(type, id, season_number)}?api_key=${api_key}&language=en-US`);
        fetch(`${getTypeURL(type, id, season_number)}?api_key=${api_key}&language=en-US`)
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
    }, [api_key, type, id, season_number]);

    return { tmdb };
}
