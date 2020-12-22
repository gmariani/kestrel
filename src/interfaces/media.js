import PropTypes from 'prop-types';

const mediaInterface = PropTypes.shape({
    docId: PropTypes.string,
    backgroundHue: PropTypes.number,
    backgroundPath: PropTypes.string,
    category: PropTypes.string,
    contentRating: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    imdb: PropTypes.string,
    name: PropTypes.string,
    posterPath: PropTypes.string,
    resolution: PropTypes.string,
    seasons: PropTypes.arrayOf(
        PropTypes.shape({
            episodeCount: PropTypes.number,
            episodes: PropTypes.arrayOf(
                PropTypes.shape({
                    duration: PropTypes.string,
                    filePath: PropTypes.string,
                    thumbnail: PropTypes.string,
                    name: PropTypes.string,
                })
            ),
            name: PropTypes.string,
            seasonNumber: PropTypes.number,
        })
    ),
    slug: PropTypes.string,
    tmdb: PropTypes.number,
    year: PropTypes.number,
});

export default mediaInterface;
