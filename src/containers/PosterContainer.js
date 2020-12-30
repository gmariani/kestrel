import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row, Poster } from '../components';
import * as ROUTES from '../constants/routes';
import { toName } from '../utils';

const propTypes = {
    media: PropTypes.arrayOf(PropTypes.string),
    hasFocus: PropTypes.bool,
    selectedCategory: PropTypes.string,
};

function PosterContainer({ media, hasFocus = false, selectedCategory }) {
    const [selectedPoster, setSelectedPoster] = useState('');
    const history = useHistory();
    console.log('PosterContainer', selectedCategory, media);
    useEffect(() => {
        const onKeyDown = (event) => {
            if (!hasFocus) return;

            const keyCode = event.which || event.keyCode;
            const foundIndex = media.findIndex((poster) => poster === selectedPoster);

            // (13) Enter
            if (keyCode === 13) {
                history.push(`${ROUTES.DETAILS}${selectedPoster}`);
                event.preventDefault();
            }

            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 37) {
                    setSelectedPoster(media[(foundIndex - 1 + media.length) % media.length]);
                } else if (keyCode === 38) {
                    //
                } else if (keyCode === 39) {
                    setSelectedPoster(media[(foundIndex + 1) % media.length]);
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
    }, [history, hasFocus, selectedPoster, media]);

    return (
        <Row>
            {media.map((mediaSlug) => {
                return (
                    <Poster
                        key={mediaSlug}
                        categorySlug={selectedCategory}
                        mediaSlug={mediaSlug}
                        title={toName(mediaSlug)}
                        // prettier-ignore
                        className={`${mediaSlug === selectedPoster ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
                        to={`/${selectedCategory}/${mediaSlug}/details`}
                    />
                );
            })}
        </Row>
    );
}

PosterContainer.propTypes = propTypes;
export default PosterContainer;
