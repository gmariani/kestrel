import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Column, Season } from '../components';

const Container = styled.div`
    overflow: hidden;
`;

const propTypes = {
    hasFocus: PropTypes.bool,
    seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func,
};

function SeasonContainer({ hasFocus = false, seasons, onClick }) {
    const [selectedSeason, setSelectedSeason] = useState(0);
    const numSeasons = seasons.length;

    // Check if selected season is available in this series, if not
    // reset it to the first season
    const isSeasonFound = !!seasons.filter((episode, i) => i === selectedSeason).length;
    if (!isSeasonFound && seasons.length) {
        setSelectedSeason(0);
    }

    // Handle focus in a non-standard way
    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            if (!hasFocus) return;

            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                let newSelectedSeason = selectedSeason;
                if (keyCode === 38) {
                    newSelectedSeason = (selectedSeason - 1 + numSeasons) % numSeasons;
                } else if (keyCode === 40) {
                    newSelectedSeason = (selectedSeason + 1) % numSeasons;
                }
                setSelectedSeason(newSelectedSeason);
                onClick(newSelectedSeason);
                event.preventDefault();
            }
        },
        [hasFocus, onClick, selectedSeason, setSelectedSeason, numSeasons]
    );
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);

    // Scroll selected season into view
    useEffect(() => {
        const episodeRef = document.querySelector('.season.selected');
        episodeRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, [selectedSeason]);

    return (
        <Container>
            <Column>
                {seasons.map((season, i) => (
                    // Will not be sorted, or added to dynamically so it's safe to use array index
                    <Season
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        title={season.name}
                        episodeCount={season.episodeCount}
                        className={`season ${i === selectedSeason ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
                        onClick={() => onClick(i)}
                    />
                ))}
            </Column>
        </Container>
    );
}

SeasonContainer.propTypes = propTypes;
export default SeasonContainer;
