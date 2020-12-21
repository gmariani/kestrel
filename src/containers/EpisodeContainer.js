import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Redirect } from 'react-router-dom';
import { Column, Episode } from '../components';
import { getEpisodeProgress, padNumber, toSlug } from '../utils';
import { useFocus } from '../hooks';

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
    routePrefix: PropTypes.string.isRequired,
};

function EpisodeContainer({ hasFocus = false, episodes = [], seasonProgress = [], routePrefix }) {
    // Manage focused element
    const [focusElement, focusKey] = useFocus(
        episodes.map((episode, i) => i),
        'vertical',
        hasFocus
    );

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

                    return (
                        <Episode
                            key={episodeSlug}
                            to={`${routePrefix}${episodeSlug}`}
                            className={`episode ${classSelected} ${classFocused}`}
                            imagePath={episode.thumbnail}
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
