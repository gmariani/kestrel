import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { FlexCol, Season } from '../components';
import { toSlug } from '../utils';

const Container = styled.div`
    overflow: hidden;
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
        // const episodeRef = document.querySelector('.season.selected');
        // episodeRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, [selectedSeason]);

    return (
        <Container>
            <FlexCol
                rowGap='1.5rem'
                justifyContent='start'
                onMouseEnter={() => {
                    console.log('setfocus?');
                    setFocus();
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
                            onClick={() => onClick(i)}
                        />
                    );
                })}
            </FlexCol>
        </Container>
    );
}

SeasonContainer.propTypes = propTypes;
export default withFocusable()(SeasonContainer);
