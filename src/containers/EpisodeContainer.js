import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Fade, Column, Episode } from '../components';
import { getEpisodeProgress, padNumber, toSlug } from '../utils';

const propTypes = {
    hasFocus: PropTypes.bool,
    episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    seasonProgress: PropTypes.arrayOf(PropTypes.number),
    seasonPath: PropTypes.string.isRequired,
    onClickEpisode: PropTypes.func,
};

function EpisodeContainer({ hasFocus = false, seasonProgress = [], episodes, seasonPath, onClickEpisode }) {
    const [selectedEpisode, setSelectedEpisode] = useState(0);
    const numEpisodes = episodes.length;

    // Check if selected episode is available in this season, if not
    // reset it to the first episode
    const isEpisodeFound = !!episodes.filter((episode, i) => i === selectedEpisode).length;
    if (!isEpisodeFound && episodes.length) {
        setSelectedEpisode(0);
    }

    // TODO: When using keyboard don't set selectedEpisode, but just 'preview'. actually select on Enter

    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            if (!hasFocus) return;

            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 38) {
                    setSelectedEpisode((selectedEpisode - 1 + numEpisodes) % numEpisodes);
                } else if (keyCode === 40) {
                    setSelectedEpisode((selectedEpisode + 1) % numEpisodes);
                }
                event.preventDefault();
            }
        },
        [hasFocus, selectedEpisode, setSelectedEpisode, numEpisodes]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);

    return (
        <Column>
            <Fade />
            <Column>
                {episodes.map((episode, i) => {
                    const isSelected = i === selectedEpisode;
                    const classSelected = isSelected ? 'selected' : '';
                    const classFocused = isSelected && hasFocus ? 'focused' : '';
                    const episodeSlug = toSlug(episode.name);
                    const episodeProgress = getEpisodeProgress(seasonProgress?.[i], episode.duration);
                    // console.log('selectedSeason', selectedSeason, 'selectedEpisode', selectedEpisode, i);
                    return (
                        <Episode
                            key={episodeSlug}
                            to={`${seasonPath}/${episodeSlug}`}
                            className={`${classSelected} ${classFocused}`}
                            imagePath={episode.thumbnail}
                            title={episode.name}
                            episodeNumber={padNumber(i + 1)}
                            progress={episodeProgress}
                            onClick={() => {
                                onClickEpisode(i);
                                setSelectedEpisode(i);
                            }}
                        />
                    );
                })}
            </Column>
        </Column>
    );
}

EpisodeContainer.propTypes = propTypes;
export default EpisodeContainer;
