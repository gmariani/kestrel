import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { FlexCol, Episode } from '../components';
import { getEpisodeProgress, padNumber, toSlug } from '../utils';

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
    episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    extraProgress: PropTypes.arrayOf(PropTypes.number),
    routePrefix: PropTypes.string.isRequired,
};

function ExtraContainer({ setFocus, episodes = [], extraProgress = [], routePrefix }) {
    const [selectedEpisode, setSelectedEpisode] = useState(-1);
    const history = useHistory();

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
                    const episodeProgress = getEpisodeProgress(extraProgress?.[i], episode.duration);
                    const episodeThumbnail = episode.thumbnail;

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
                                history.push(`${routePrefix}${episodeSlug}/watch`);
                            }}
                            to={`${routePrefix}${episodeSlug}/watch`}
                            selected={i === selectedEpisode}
                            imagePath={episodeThumbnail}
                            title={episode.name}
                            titlePrefix='Extra Content'
                            episodeNumber={episodeNumber}
                            progress={episodeProgress}
                        />
                    );
                })}
            </Column>
        </Container>
    );
}

ExtraContainer.propTypes = propTypes;
export default withFocusable()(ExtraContainer);
