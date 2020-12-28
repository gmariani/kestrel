export default function getTMDB(type = 'tv', id, seasonNumber, episodeNumber) {
    const apiKey = process.env.REACT_APP_TMDB_KEY;

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

    return fetch(`${getTypeURL()}?api_key=${apiKey}&language=en-US`)
        .then((res) => res.json())
        .then(
            (result) => {
                return {
                    isLoaded: true,
                    data: result,
                };
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                return {
                    isLoaded: true,
                    error,
                };
            }
        );
}
