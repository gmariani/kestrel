import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row, Poster } from '../components';
import * as ROUTES from '../constants/routes';
import { toSlug } from '../utils';

const propTypes = {
    hasFocus: PropTypes.bool,
    selectedCategory: PropTypes.string,
    posters: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
    hasFocus: false,
    posters: [],
};

function PosterContainer({ hasFocus, selectedCategory, posters }) {
    const [selectedPoster, setSelectedPoster] = useState('');
    const history = useHistory();

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
            // (13) Enter
            if (keyCode === 13) {
                history.push(`${ROUTES.DETAILS}${selectedPoster}`);
                event.preventDefault();
            }
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
    }, [history, hasFocus, selectedPoster, posters]);

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
                    //  to={`${ROUTES.DETAILS}${poster.docId}`}
                    to={`/${toSlug(selectedCategory)}/${toSlug(poster.name)}/details`}
                />
            ))}
        </Row>
    );
}

PosterContainer.propTypes = propTypes;
PosterContainer.defaultProps = defaultProps;
export default PosterContainer;
