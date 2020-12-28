import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row, Poster } from '../components';
import * as ROUTES from '../constants/routes';
import { toSlug, capitalize } from '../utils';
import { useAWSCategoryMedia } from '../hooks';

const propTypes = {
    hasFocus: PropTypes.bool,
    selectedCategory: PropTypes.string,
};

function PosterContainer({ hasFocus = false, selectedCategory }) {
    const [selectedPoster, setSelectedPoster] = useState('');
    const history = useHistory();
    const { media: posters, category, baseURL } = useAWSCategoryMedia(`${selectedCategory}/`);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (!hasFocus) return;

            const keyCode = event.which || event.keyCode;
            const foundIndex = posters.findIndex((poster) => poster === selectedPoster);

            // (13) Enter
            if (keyCode === 13) {
                history.push(`${ROUTES.DETAILS}${selectedPoster}`);
                event.preventDefault();
            }

            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 37) {
                    setSelectedPoster(posters[(foundIndex - 1 + posters.length) % posters.length]);
                } else if (keyCode === 38) {
                    //
                } else if (keyCode === 39) {
                    setSelectedPoster(posters[(foundIndex + 1) % posters.length]);
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
            {posters.map((mediaDirectory) => {
                const mediaSlug = mediaDirectory.slice(0, -1); // Remove ending slash
                return (
                    <Poster
                        key={mediaDirectory}
                        mediaPath={`${baseURL}${category}${mediaDirectory}`}
                        title={capitalize(mediaSlug.replaceAll('_', ' '))}
                        // prettier-ignore
                        className={`${mediaDirectory === selectedPoster ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
                        to={`/${toSlug(selectedCategory)}/${mediaSlug}/details`}
                    />
                );
            })}
        </Row>
    );
}

PosterContainer.propTypes = propTypes;
export default PosterContainer;
