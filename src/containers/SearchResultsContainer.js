import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { Poster, GridFocusable } from '../components';
import { toName } from '../utils';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 2;
    overflow-y: auto;

    /* Entire scrollbar */
    &::-webkit-scrollbar {
        width: 0.35rem;
    }

    /* The track (progress bar) of the scrollbar */
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: transparent;
    }

    /* the draggable scrolling handle */
    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
    }
`;

const Row = styled(GridFocusable)`
    position: relative;
    padding: 2.25rem;
`;

const propTypes = {
    results: PropTypes.arrayOf(PropTypes.string),
};

function SearchResultsContainer({ results }) {
    const [selectedPoster, setSelectedPoster] = useState(null);
    const history = useHistory();

    // When selectedPoster changes, scroll poster into view
    useEffect(() => {
        const poster = document.querySelector('.poster.selected');
        // If no episodes exist, don't break
        if (poster) poster.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, [selectedPoster]);

    return (
        <Container>
            {results && (
                <Row
                    focusKey='RESULTS'
                    trackChildren
                    gridTemplateColumns='repeat(auto-fit, 20rem)'
                    gridRowGap='20px'
                    gridColumnGap='20px'>
                    {results.map((route, i) => {
                        const [category, mediaSlug] = route.split('/');
                        return (
                            <Poster
                                onBecameFocused={() => {
                                    console.log('Poster.onBecameFocused', route);
                                    setSelectedPoster(mediaSlug);
                                }}
                                onEnterPress={() => {
                                    console.log('Poster.onEnterPress', route);
                                    history.push(route);
                                }}
                                focusKey={`RESULT-${i}`}
                                key={mediaSlug}
                                selected={mediaSlug === selectedPoster}
                                categorySlug={category}
                                mediaSlug={mediaSlug}
                                title={toName(mediaSlug)}
                                to={route}
                            />
                        );
                    })}
                </Row>
            )}
        </Container>
    );
}

SearchResultsContainer.propTypes = propTypes;
export default SearchResultsContainer;
