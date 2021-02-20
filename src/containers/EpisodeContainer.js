import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { FlexCol, Episode } from '../components';
import { getEpisodeProgress, padNumber, toSlug } from '../utils';
import { useTMDB } from '../hooks';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /*justify-content: start;*/
    position: relative;
    flex: 1;
    padding-right: 1rem;
    padding-left: 1rem;
`;

const Column = styled(FlexCol)`
    padding-top: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;

    /* Safari Fix: Improperly displays height */
    /*flex-shrink: 0;*/

    /* Safari Fix: It can't handle column-gap with Flex */
    display: grid;
    grid-template-row: auto;
    /* Fixes rounding error in spatial-navigation */
    grid-row-gap: 1.5rem;

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
    tmdbId: PropTypes.number,
    episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    seasonNumber: PropTypes.number,
    seasonProgress: PropTypes.arrayOf(PropTypes.number),
    routePrefix: PropTypes.string.isRequired,
};

function EpisodeContainer({ setFocus, tmdbId, episodes = [], seasonNumber = 1, seasonProgress = [], routePrefix }) {
    const [selectedEpisode, setSelectedEpisode] = useState(-1);
    const history = useHistory();

    // Grab thumbnails for episodes
    const { tmdb } = useTMDB('season', tmdbId, seasonNumber);

    const scrollIntoView = useCallback(() => {
        const episodeRef = document.querySelector('.episode.selected');
        // If no episodes exist, don't break
        if (episodeRef) episodeRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, []);

    // On focusElement change, move element into view
    useEffect(() => {
        scrollIntoView();
    }, [selectedEpisode, scrollIntoView]);

    return (
        <Container>
            <Column
                rowGap='1.5rem'
                justifyContent='flex-start'
                onMouseEnter={() => {
                    setFocus();
                }}
                focusKey='EPISODES'>
                {episodes.map((episode, i) => {
                    const episodeSlug = toSlug(episode.name);
                    const episodeNumber = Array.isArray(episode.episodeNumber)
                        ? episode.episodeNumber.map((num) => padNumber(num)).join(' & ')
                        : padNumber(episode.episodeNumber ?? padNumber(i + 1)); // padNumber(i + 1)
                    const episodeProgress = getEpisodeProgress(seasonProgress?.[i], episode.duration);

                    // TMDB is zero based index
                    const episodeTMDBNumber =
                        (Array.isArray(episode.episodeNumber)
                            ? episode.episodeNumber[0]
                            : episode.episodeNumber ?? i + 1) - 1;

                    const episodeThumbnail =
                        tmdb.success === true &&
                        tmdb.episodes &&
                        tmdb.episodes[episodeTMDBNumber] &&
                        tmdb.episodes[episodeTMDBNumber].still_path
                            ? `https://image.tmdb.org/t/p/w227_and_h127_bestv2${tmdb.episodes[episodeTMDBNumber].still_path}`
                            : episode.thumbnail;

                    return (
                        <Episode
                            focusKey={`EPISODE-${episodeSlug.toUpperCase()}`}
                            key={episodeSlug}
                            onBecameFocused={(layout, props, details) => {
                                // If necessary, lock down to just KeyboardEvent
                                if (details.event) scrollIntoView();
                                setSelectedEpisode(i);
                            }}
                            onEnterPress={() => {
                                // console.log(`Go to watch episode ${routePrefix}${episodeSlug}/watch`);
                                history.push(`${routePrefix}${episodeSlug}/watch`);
                            }}
                            to={`${routePrefix}${episodeSlug}/watch`}
                            selected={i === selectedEpisode}
                            imagePath={episodeThumbnail}
                            title={episode.name}
                            episodeNumber={episodeNumber}
                            progress={episodeProgress}
                        />
                    );
                })}
            </Column>
        </Container>
    );
}

EpisodeContainer.propTypes = propTypes;
export default withFocusable()(EpisodeContainer);
