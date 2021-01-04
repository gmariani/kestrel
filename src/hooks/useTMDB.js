import { useEffect, useState } from 'react';

export default function useTMDB(type = 'tv', id, seasonNumber, episodeNumber) {
    const [tmdb, setTMDB] = useState([]);
    const apiKey = process.env.REACT_APP_TMDB_KEY;

    useEffect(() => {
        if (!id) {
            setTMDB({
                success: false,
                status_message: `Invalid id: "${id}"`,
            });
            return;
        }

        const getTypeURL = () => {
            switch (type) {
                case 'movie':
                    return `https://api.themoviedb.org/3/movie/${id}`;
                case 'season':
                    return `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`;
                case 'episode':
                    return `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`;
                case 'tv':
                default:
                    return `https://api.themoviedb.org/3/tv/${id}`;
            }
        };

        fetch(`${getTypeURL()}?api_key=${apiKey}&language=en-US`)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.success === false) {
                        setTMDB({ ...result });
                    } else {
                        setTMDB({
                            success: true,
                            ...result,
                        });
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setTMDB({
                        success: false,
                        ...error,
                    });
                }
            );
    }, [apiKey, type, id, seasonNumber, episodeNumber]);

    return { tmdb };
}
