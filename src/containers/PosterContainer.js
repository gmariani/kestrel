import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Poster } from '../components';
import * as ROUTES from '../constants/routes';

const propTypes = {
    hasFocus: PropTypes.bool,
    posters: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
    hasFocus: false,
    posters: [],
};

function PosterContainer({ hasFocus, posters }) {
    const [selectedPoster, setSelectedPoster] = useState('');

    // Check if selected poster is available in this category, if not
    // reset it to the first poster
    const isPosterFound = !!posters.filter((poster) => poster.docId === selectedPoster).length;
    if (!isPosterFound && posters.length) {
        setSelectedPoster(posters[0].docId);
    }

    useEffect(() => {
        const onKeyDown = (event) => {
            if (!hasFocus) return;

            const keyCode = event.which || event.keyCode;
            const findPosterIndex = (selectedDocId) => {
                const foundPosters = posters
                    .map((poster, i) => ({ docId: poster.docId, index: i }))
                    .filter((poster) => poster.docId === selectedDocId);
                return foundPosters.length ? foundPosters[0].index : 0;
            };
            const foundIndex = findPosterIndex(selectedPoster);
            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 37) {
                    setSelectedPoster(posters[(foundIndex - 1 + posters.length) % posters.length].docId);
                } else if (keyCode === 38) {
                    //
                } else if (keyCode === 39) {
                    setSelectedPoster(posters[(foundIndex + 1) % posters.length].docId);
                } else if (keyCode === 40) {
                    //
                }
                event.preventDefault();
            }
        };

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [hasFocus, selectedPoster, posters]);

    return (
        <Row>
            {posters.map((poster) => (
                <Poster
                    key={poster.docId}
                    imagePath={poster.posterPath}
                    title={poster.name}
                    year={poster.year}
                    genres={poster.genres}
                    // prettier-ignore
                    className={`${poster.docId === selectedPoster ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
                    to={`${ROUTES.DETAILS}${poster.docId}`}
                />
            ))}
        </Row>
    );
}

PosterContainer.propTypes = propTypes;
PosterContainer.defaultProps = defaultProps;
export default PosterContainer;
