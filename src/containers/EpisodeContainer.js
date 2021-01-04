import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Redirect } from 'react-router-dom';
import { Column, Episode } from '../components';
import { getEpisodeProgress, padNumber, toSlug } from '../utils';
import { useFocus, useTMDB } from '../hooks';

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
    tmdbId: PropTypes.number,
    episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    seasonNumber: PropTypes.number,
    seasonProgress: PropTypes.arrayOf(PropTypes.number),
    routePrefix: PropTypes.string.isRequired,
};

function EpisodeContainer({
    hasFocus = false,
    tmdbId,
    episodes = [],
    seasonNumber = 1,
    seasonProgress = [],
    routePrefix,
}) {
    // Manage focused element
    const [focusElement, focusKey] = useFocus(
        episodes.map((episode, i) => i),
        'vertical',
        hasFocus
    );

    // Grab thumbnails for episodes
    const { tmdb } = useTMDB('season', tmdbId, seasonNumber);

    // On focusElement change, move element into view
    useEffect(() => {
        const episodeRef = document.querySelector('.episode.selected');
        // If no episodes exist, don't break
        if (episodeRef) episodeRef.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }, [focusElement]);

    // Go to watch episode
    if (focusKey === 'Enter' && episodes.length) {
        console.log(`Go to ${routePrefix}${toSlug(episodes[focusElement].name)}`);
        return <Redirect to={`${routePrefix}${toSlug(episodes[focusElement].name)}`} />;
    }

    return (
        <Container>
            <Column>
                {episodes.map((episode, i) => {
                    const isSelected = i === focusElement;
                    const classSelected = isSelected ? 'selected' : '';
                    const classFocused = isSelected && hasFocus ? 'focused' : '';
                    const episodeSlug = toSlug(episode.name);
                    const episodeProgress = getEpisodeProgress(seasonProgress?.[i], episode.duration);
                    const episodeThumbnail =
                        tmdb.success === true
                            ? `https://image.tmdb.org/t/p/w227_and_h127_bestv2/${tmdb.episodes[i].still_path}`
                            : episode.thumbnail;

                    return (
                        <Episode
                            key={episodeSlug}
                            to={`${routePrefix}${episodeSlug}`}
                            className={`episode ${classSelected} ${classFocused}`}
                            imagePath={episodeThumbnail}
                            title={episode.name}
                            episodeNumber={padNumber(i + 1)}
                            progress={episodeProgress}
                        />
                    );
                })}
            </Column>
        </Container>
    );
}

EpisodeContainer.propTypes = propTypes;
export default EpisodeContainer;
