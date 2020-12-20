import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { Column, Episode } from '../components';
import { getEpisodeProgress, padNumber, toSlug } from '../utils';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /*justify-content: start;*/
    position: relative;
    flex: 1;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow: hidden;
`;

const propTypes = {
    hasFocus: PropTypes.bool,
    episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    seasonProgress: PropTypes.arrayOf(PropTypes.number),
    seasonPath: PropTypes.string.isRequired,
    onClickEpisode: PropTypes.func,
};

function EpisodeContainer({ hasFocus = false, seasonProgress = [], episodes = [], seasonPath, onClickEpisode }) {
    const history = useHistory();
    const [selectedEpisode, setSelectedEpisode] = useState(0);

    // Check if selected episode is available in this season, if not
    // reset it to the first episode
    const isEpisodeFound = !!episodes.filter((episode, i) => i === selectedEpisode).length;
    if (!isEpisodeFound && episodes.length) {
        setSelectedEpisode(0);
    }

    // TODO Find a better way to pass all these variables to the callback
    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            if (!hasFocus) return;

            // (13) Enter
            if (keyCode === 13) {
                onClickEpisode(selectedEpisode);
                history.push(`${seasonPath}${toSlug(episodes[selectedEpisode].name)}`);
                event.preventDefault();
            }
            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 38) {
                    setSelectedEpisode((selectedEpisode - 1 + episodes.length) % episodes.length);
                } else if (keyCode === 40) {
                    setSelectedEpisode((selectedEpisode + 1) % episodes.length);
                }
                event.preventDefault();
            }
        },
        [hasFocus, history, onClickEpisode, selectedEpisode, setSelectedEpisode, seasonPath, episodes]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);

    useEffect(() => {
        const episodeRef = document.querySelector('.episode.selected');
        if (episodeRef) episodeRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, [selectedEpisode]);

    return (
        <Container>
            <Column>
                {episodes.map((episode, i) => {
                    const isSelected = i === selectedEpisode;
                    const classSelected = isSelected ? 'selected' : '';
                    const classFocused = isSelected && hasFocus ? 'focused' : '';
                    const episodeSlug = toSlug(episode.name);
                    const episodeProgress = getEpisodeProgress(seasonProgress?.[i], episode.duration);

                    return (
                        <Episode
                            key={episodeSlug}
                            to={`${seasonPath}${episodeSlug}`}
                            className={`episode ${classSelected} ${classFocused}`}
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
        </Container>
    );
}

EpisodeContainer.propTypes = propTypes;
export default EpisodeContainer;
