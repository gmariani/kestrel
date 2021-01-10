import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { Poster, Loading, FlexRow } from '../components';
import { toName } from '../utils';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    overflow: hidden;
`;

const Row = styled(FlexRow)`
    overflow: hidden;
    padding: 2rem 1rem;
    position: relative;
`;

const propTypes = {
    navigateByDirection: PropTypes.func,
    media: PropTypes.arrayOf(PropTypes.string),
    mediaCategory: PropTypes.string,
    selectedCategory: PropTypes.string,
};

function PosterContainer({ navigateByDirection, media, mediaCategory, selectedCategory }) {
    const [selectedPoster, setSelectedPoster] = useState(0);
    const history = useHistory();
    const scrollRef = useRef();

    useEffect(() => {
        // TODO: lodash throttle
        // https://github.com/NoriginMedia/react-spatial-navigation/blob/master/src/App.js

        function onWheel(event) {
            event.preventDefault();
            const { deltaY, deltaX } = event;

            if (deltaY > 1) {
                navigateByDirection('down');
            } else if (deltaY < 0) {
                navigateByDirection('up');
            } else if (deltaX > 1) {
                navigateByDirection('right');
            } else if (deltaX < 1) {
                navigateByDirection('left');
            }
        }
        document.addEventListener('wheel', onWheel, false);
        return () => {
            document.removeEventListener('wheel', onWheel, false);
        };
    });

    useEffect(() => {
        const posterRef = document.querySelector('.poster.selected');
        // If no episodes exist, don't break
        console.log(posterRef);
        if (posterRef) posterRef.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, [selectedPoster]);

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
        <Container>
            <Row innerRef={scrollRef} flexWrap='wrap' focusKey='POSTERS'>
                {media.map((mediaSlug, i) => {
                    const route = `/${selectedCategory}/${mediaSlug}/details`;
                    return (
                        <Poster
                            onBecameFocused={(layout) => {
                                // console.log('Poster.onBecameFocused', route);
                                // const el = scrollRef.current;
                                // const el = containerRef.current;
                                // el.scrollTo({ left: 0, top: layout.y, behavior: 'smooth' });
                                // el.style = `top:-${layout.y}px`;
                                setSelectedPoster(i);
                            }}
                            onEnterPress={() => {
                                // console.log('Poster.onEnterPress', route);
                                history.push(route);
                            }}
                            focusKey={`POSTERS-${i}`}
                            key={mediaSlug}
                            selected={i === selectedPoster}
                            categorySlug={selectedCategory}
                            mediaSlug={mediaSlug}
                            title={toName(mediaSlug)}
                            to={route}
                        />
                    );
                })}
            </Row>
        </Container>
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
export default withFocusable()(PosterContainer);
