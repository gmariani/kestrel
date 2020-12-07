import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Column, Season } from '../components';

const propTypes = {
    hasFocus: PropTypes.bool,
    seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickSeason: PropTypes.func,
};

function SeasonContainer({ hasFocus = false, seasons, onClickSeason }) {
    const [selectedSeason, setSelectedSeason] = useState(0);
    const numSeasons = seasons.length;

    // Check if selected season is available in this series, if not
    // reset it to the first season
    const isSeasonFound = !!seasons.filter((episode, i) => i === selectedSeason).length;
    if (!isSeasonFound && seasons.length) {
        setSelectedSeason(0);
    }

    console.log('INFO', 'SeasonContainer', selectedSeason);

    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            if (!hasFocus) return;

            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 38) {
                    setSelectedSeason((selectedSeason - 1 + numSeasons) % numSeasons);
                } else if (keyCode === 40) {
                    setSelectedSeason((selectedSeason + 1) % numSeasons);
                }
                event.preventDefault();
            }
        },
        [hasFocus, selectedSeason, setSelectedSeason, numSeasons]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);

    return (
        <Column>
            {seasons.map((season, i) => {
                return (
                    // Will not be sorted, or added to dynamically so it's safe to use array index
                    <Season
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        title={season.name}
                        numEpisodes={season.episodeCount}
                        className={`${i === selectedSeason ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
                        onClick={() => onClickSeason(i)}
                    />
                );
            })}
        </Column>
    );
}

SeasonContainer.propTypes = propTypes;
export default SeasonContainer;
