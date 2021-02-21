import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { FlexCol, Season } from '../components';
import { toSlug } from '../utils';

const Container = styled.div`
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

const propTypes = {
    setFocus: PropTypes.func,
    seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func,
};

function SeasonContainer({ setFocus, seasons, onClick }) {
    const [selectedSeason, setSelectedSeason] = useState(0);

    // Check if selected season is available in this series, if not
    // reset it to the first season
    const isSeasonFound = !!seasons.filter((episode, i) => i === selectedSeason).length;
    if (!isSeasonFound && seasons.length) {
        setSelectedSeason(0);
    }

    // Scroll selected season into view
    useEffect(() => {
        const episodeRef = document.querySelector('.season.selected');
        episodeRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, [selectedSeason]);

    return (
        <Container>
            <FlexCol
                style={{ marginBottom: '3rem' }}
                rowGap='0.5rem'
                justifyContent='flex-start'
                onMouseEnter={() => {
                    // console.log('FlexCol.onMouseEnter', selectedSeason);
                    setFocus(`SEASON-${selectedSeason}`);
                }}
                focusKey='SEASONS'>
                {seasons.map((season, i) => {
                    // Will not be sorted, or added to dynamically so it's safe to use array index
                    return (
                        <Season
                            focusKey={`SEASON-${i}`}
                            key={`${toSlug(season.name).toUpperCase()}`}
                            onBecameFocused={() => {
                                // console.log('Season.onBecameFocused', i);
                                setSelectedSeason(i);
                                onClick(i);
                            }}
                            title={season.name}
                            episodeCount={season.episodes.length}
                            selected={i === selectedSeason}
                            onClick={() => {
                                // console.log('Season.onClick', i);
                                setFocus(`SEASON-${i}`);
                                setSelectedSeason(i);
                                onClick(i);
                            }}
                        />
                    );
                })}
            </FlexCol>
        </Container>
    );
}

SeasonContainer.propTypes = propTypes;
export default withFocusable()(SeasonContainer);
