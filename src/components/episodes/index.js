import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Fade, EpisodeContainer, Thumbnail, Meta, Info, Title, Counter, Timer } from './styles/episodes';
import ProgressBar from '../ProgressBar';
import * as ROUTES from '../../constants/routes';
import { getEpisodeProgress, toSlug, padNumber, secondsToHuman } from '../../utils';

const propTypes = {
    focusId: PropTypes.number.isRequired,
    episodes: PropTypes.arrayOf(PropTypes.object),
    selectedSeries: PropTypes.string,
    selectedSeason: PropTypes.number,
    selectedEpisode: PropTypes.number,
    progress: PropTypes.arrayOf(PropTypes.array),
    focusTarget: PropTypes.number.isRequired,
    onClickEpisode: PropTypes.func,
};

const defaultProps = {
    episodes: PropTypes.object,
    selectedSeries: '',
    selectedSeason: 0,
    selectedEpisode: 0,
    progress: [],
    onClickEpisode: null,
};

function Episodes({
    focusId,
    focusTarget,
    episodes,
    selectedSeries,
    selectedSeason = 0,
    selectedEpisode = 0,
    progress = [],
    onClickEpisode,
}) {
    const hasFocus = focusId === focusTarget;
    const activeEpisodeRef = useRef(null);
    const firstRenderRef = useRef(true);

    useEffect(() => {
        // After render, don't do anything, just remember we've seen the render
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
        } else if (activeEpisodeRef.current) {
            activeEpisodeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            });
        }
    }, [selectedEpisode]);

    return (
        <>
            <Fade />
            <Container>
                {episodes.map((episode, i) => {
                    // console.log('selectedSeason', selectedSeason, 'selectedEpisode', selectedEpisode, i);
                    const episodeNumber = padNumber(i + 1);
                    const episodeSlug = toSlug(episode.name);
                    const episodeProgress = getEpisodeProgress(progress?.[selectedSeason]?.[i], episode.duration);
                    const isSelected = i === selectedEpisode;
                    const classSelected = isSelected ? 'selected' : '';
                    const classFocused = isSelected && hasFocus ? 'focused' : '';
                    const timer =
                        episodeProgress.percent > 0
                            ? `${secondsToHuman(episodeProgress.totalSeconds - episodeProgress.currentSeconds)} left`
                            : secondsToHuman(episodeProgress.totalSeconds);
                    return (
                        <EpisodeContainer
                            key={episodeSlug}
                            ref={isSelected ? activeEpisodeRef : null}
                            onClick={() => {
                                onClickEpisode(i);
                            }}
                            to={`${ROUTES.WATCH}${selectedSeries}/${selectedSeason}/${episodeSlug}`}
                            className={`${classSelected} ${classFocused}`}>
                            {episode.thumbnail ? <Thumbnail src={episode.thumbnail} /> : null}
                            <Info>
                                <Meta className='episode__meta'>
                                    <Counter>Episode {episodeNumber}</Counter>
                                    <Timer>{timer}</Timer>
                                </Meta>
                                <Title className='episode__title'>{episode.name}</Title>
                                {episodeProgress.percent > 0 ? (
                                    <ProgressBar value={episodeProgress.percent} theme='dark' />
                                ) : null}
                            </Info>
                        </EpisodeContainer>
                    );
                })}
            </Container>
        </>
    );
}

Episodes.propTypes = propTypes;
Episodes.defaultProps = defaultProps;
export default Episodes;
