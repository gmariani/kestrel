import PropTypes from 'prop-types';

const mediaInterface = PropTypes.shape({
    docId: PropTypes.string,
    backgroundHue: PropTypes.number,
    backgroundURL: PropTypes.string,
    category: PropTypes.string,
    contentRating: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    imdb: PropTypes.string,
    name: PropTypes.string,
    posterURL: PropTypes.string,
    resolution: PropTypes.string,
    seasons: PropTypes.arrayOf(
        PropTypes.shape({
            episodes: PropTypes.arrayOf(
                PropTypes.shape({
                    duration: PropTypes.string,
                    fileURL: PropTypes.string,
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
