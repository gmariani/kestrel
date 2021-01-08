import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Row, Poster, Loading, FlexRow } from '../components';
import * as ROUTES from '../constants/routes';
import { toName } from '../utils';

const propTypes = {
    media: PropTypes.arrayOf(PropTypes.string),
    mediaCategory: PropTypes.string,
    hasFocus: PropTypes.bool,
    selectedCategory: PropTypes.string,
};

function PosterContainer({ media, mediaCategory, hasFocus = false, selectedCategory }) {
    const [selectedPoster, setSelectedPoster] = useState('');
    const history = useHistory();
    useEffect(() => {
        // const onKeyDown = (event) => {
        //     if (!hasFocus) return;

        //     const keyCode = event.which || event.keyCode;
        //     const foundIndex = media.findIndex((poster) => poster === selectedPoster);

        //     // (13) Enter
        //     if (keyCode === 13) {
        //         history.push(`${ROUTES.DETAILS}${selectedPoster}`);
        //         event.preventDefault();
        //     }

        //     if (keyCode >= 37 && keyCode <= 41) {
        //         // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
        //         if (keyCode === 37) {
        //             setSelectedPoster(media[(foundIndex - 1 + media.length) % media.length]);
        //         } else if (keyCode === 38) {
        //             //
        //         } else if (keyCode === 39) {
        //             setSelectedPoster(media[(foundIndex + 1) % media.length]);
        //         } else if (keyCode === 40) {
        //             //
        //         }
        //         event.preventDefault();
        //     }
        // };

        // document.addEventListener('keydown', onKeyDown, false);
        return () => {
            // document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [history, hasFocus, selectedPoster, media]);

    // On selectedPoster change, move element into view
    // useEffect(() => {
    //     const posterRef = document.querySelector('.poster.selected');
    //     // If no posters exist, don't break
    //     if (posterRef) posterRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    // }, [selectedPoster]);

    const scrollRef = useRef();
    const onPosterFocused = (layout, { mediaSlug }) => {
        // eslint-disable-next-line no-console
        // console.log(
        //     'Poster.onBecameFocused',
        //     scrollRef.current,
        //     { x: 0, y: layout.y, behavior: 'smooth' },
        //     `/${selectedCategory}/${mediaSlug}/details`
        // );

        const classID = scrollRef.current.classList[0];
        const tempRef = document.querySelector(`.${classID}`);
        // console.log(tempRef, scrollRef.current, tempRef === scrollRef.current);
        tempRef.scrollTo({ x: 0, y: layout.y, behavior: 'smooth' });
        // scrollRef.current.scrollTo({ x: 0, y: layout.y, behavior: 'smooth' });
    };

    // If switching categories, wait until 'media' has loaded and matches the selected category
    if (mediaCategory !== null && mediaCategory !== selectedCategory) {
        // TODO show spinner
        return (
            <Row>
                <Loading />
            </Row>
        );
    }

    return (
        <FlexRow innerRef={scrollRef} flexWrap='wrap' focusKey='POSTERS' style={{ overflow: 'auto' }}>
            {media.map((mediaSlug) => {
                return (
                    <Poster
                        onBecameFocused={onPosterFocused}
                        onEnterPress={() => {
                            // console.log('Poster.onEnterPress', `/${selectedCategory}/${mediaSlug}/details`);
                            history.replace(`/${selectedCategory}/${mediaSlug}/details`);
                        }}
                        focusKey={`POSTERS-${mediaSlug.toUpperCase()}`}
                        key={mediaSlug}
                        categorySlug={selectedCategory}
                        mediaSlug={mediaSlug}
                        title={toName(mediaSlug)}
                        to={`/${selectedCategory}/${mediaSlug}/details`}
                    />
                );
            })}
        </FlexRow>
    );

    /**
     * Breaks an array into chunks
     * @param {array} array The array to chunk
     * @param {int} size THe interval to chunk at
     * @returns {array}
     */
    // const chunk = (array, size) =>
    //     array.reduce((acc, _, i) => {
    //         if (i % size === 0) acc.push(array.slice(i, i + size));
    //         return acc;
    //     }, []);

    // Break posters into rows of 4
    // const rows = chunk(media, 4);
    // return rows.map((mediaChunk) => {
    //     return (
    //         <Row>
    //             {mediaChunk.map((mediaSlug) => {
    //                 return (
    //                     <Poster
    //                         key={mediaSlug}
    //                         categorySlug={selectedCategory}
    //                         mediaSlug={mediaSlug}
    //                         title={toName(mediaSlug)}
    //                         // prettier-ignore
    //                         className={`${mediaSlug === selectedPoster ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
    //                         to={`/${selectedCategory}/${mediaSlug}/details`}
    //                     />
    //                 );
    //             })}
    //         </Row>
    //     );
    // });
}

PosterContainer.propTypes = propTypes;
export default PosterContainer;
