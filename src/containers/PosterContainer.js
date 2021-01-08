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
    const history = useHistory();
    const scrollRef = useRef();

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
                const route = `/${selectedCategory}/${mediaSlug}/details`;
                return (
                    <Poster
                        onBecameFocused={(layout) => {
                            // console.log('Poster.onBecameFocused', route);
                            scrollRef.current.scrollTo({ left: 0, top: layout.y, behavior: 'smooth' });
                        }}
                        onEnterPress={() => {
                            // console.log('Poster.onEnterPress', route);
                            history.push(route);
                        }}
                        focusKey={`POSTERS-${mediaSlug.toUpperCase()}`}
                        key={mediaSlug}
                        categorySlug={selectedCategory}
                        mediaSlug={mediaSlug}
                        title={toName(mediaSlug)}
                        to={route}
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
