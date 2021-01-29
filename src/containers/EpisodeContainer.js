import React, { useState, useEffect } from 'react';
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
    overflow: hidden;
    padding-top: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
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
    const [selectedEpisode, setSelectedEpisode] = useState(0);
    // Grab thumbnails for episodes
    const { tmdb } = useTMDB('season', tmdbId, seasonNumber);

    // On focusElement change, move element into view
    useEffect(() => {
        const episodeRef = document.querySelector('.episode.selected');
        // If no episodes exist, don't break
        if (episodeRef) episodeRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, [selectedEpisode]);

    return (
        <Container>
            <Column
                rowGap='1.5rem'
                justifyContent='start'
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
                            onBecameFocused={() => {
                                // console.log('Episode.onBecameFocused', i);
                                setSelectedEpisode(i);
                            }}
                            onEnterPress={() => {
                                // console.log(`Go to watch episode ${routePrefix}${episodeSlug}`);
                            }}
                            to={`${routePrefix}${episodeSlug}`}
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
