import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FaPlay, FaHistory } from 'react-icons/fa';
import FlexCol from './FlexCol';
import FlexRow from './FlexRow';
import ProgressBar from './ProgressBar';
import ButtonLink from './ButtonLink';
import mediaInterface from '../interfaces/media';
import { secondsToHuman, capitalize, durationToSeconds } from '../utils';
import { useFocus } from '../hooks';

const Container = styled(FlexCol)`
    font-size: 2rem;
    color: white;
    flex: 1;
    --progressBG: rgba(255, 255, 255, 0.6);
    --trackBG: rgba(255, 255, 255, 0.25);
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    font-size: 1.25rem;
`;

const Title = styled.div`
    font-size: 8rem;
    line-height: 8rem;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 2rem;
    max-width: 800px;
`;

const Timer = styled.span`
    text-transform: uppercase;
    font-size: 1rem;
    user-select: none;
`;

/**
 * Gets the label based on progress and media type
 * @param {number} lastSeason
 * @param {number} lastEpisode
 */
function getWatchLabel(isSingle = false, hasProgress = false, lastSeason = 0, lastEpisode = 0) {
    if (isSingle) {
        // Watch Movie
        // Resume Movie
        return hasProgress ? 'Resume Movie' : 'Watch Movie';
    }

    const suffix = `S${lastSeason + 1} E${lastEpisode + 1}`;
    if (hasProgress) {
        // Resume Episode: S# E#
        return `Resume Episode: ${suffix}`;
    }
    if (lastEpisode) {
        // Watch Next Episode: S# E#
        return `Watch Next Episode: ${suffix}`;
    }
    // Start Watching: S1 E1
    return `Start Watching: ${suffix}`;
}

function getMetaLabel(isSingle = false, contentRating, year, duration, genres, category) {
    // Rating - Year - Total run time- genre - Movie
    // For tv
    // rating- year - genrea - TV Series
    const items = [];
    if (contentRating) items.push(contentRating);
    if (year) items.push(year);
    if (isSingle && duration) {
        const totalSeconds = durationToSeconds(duration);
        items.push(secondsToHuman(totalSeconds));
    }

    if (genres) items.push(genres.join(', '));
    if (category) {
        if (category === 'tv') {
            items.push('TV Series');
        } else if (category === 'movies') {
            items.push('Movie');
        } else {
            items.push(capitalize(category));
        }
    }
    return items.join(' • ');
}

const propTypes = {
    hasFocus: PropTypes.bool,
    isSingle: PropTypes.bool,
    startSeasonIndex: PropTypes.number,
    startEpisodeIndex: PropTypes.number,
    media: mediaInterface,
    startEpisodeProgress: PropTypes.shape({
        percent: PropTypes.number,
        currentSeconds: PropTypes.number,
        totalSeconds: PropTypes.number,
    }),
    startEpisodeRoute: PropTypes.string,
    onClickWatch: PropTypes.func.isRequired,
    onClickRestart: PropTypes.func.isRequired,
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };

function EpisodeDetail({
    hasFocus = false,
    isSingle = false,
    media = defaultSeries,
    startSeasonIndex = 0,
    startEpisodeIndex = 0,
    startEpisodeProgress,
    startEpisodeRoute,
    onClickWatch,
    onClickRestart,
}) {
    const hasProgress = startEpisodeProgress && startEpisodeProgress.percent > 0;
    const hasEpisode = !!startEpisodeRoute;

    // Manage focused element
    const WATCH_ELEMENT = 'watch';
    const RESTART_ELEMENT = 'restart';
    const focusElements = hasProgress ? [WATCH_ELEMENT, RESTART_ELEMENT] : [WATCH_ELEMENT];
    const [focusElement, focusKey] = useFocus(focusElements, 'vertical', hasFocus);

    // Play the episode on Enter key
    if (focusKey === 'Enter' && hasEpisode) {
        if (focusElement === RESTART_ELEMENT) onClickRestart(false);
        return <Redirect to={startEpisodeRoute} />;
    }

    return (
        <Container justifyContent='start'>
            <Title>{media.name}</Title>
            <Description>{media.season.description}</Description>
            <Meta>
                {getMetaLabel(
                    isSingle,
                    media?.contentRating,
                    media.season?.year ?? media?.year,
                    media?.duration,
                    media?.genres,
                    media?.category
                )}
            </Meta>

            {hasProgress && (
                <FlexRow alignItems='center'>
                    <ProgressBar value={startEpisodeProgress.percent} usePointer={false} />
                    <Timer>
                        {
                            // prettier-ignore
                            hasProgress ? `${secondsToHuman(startEpisodeProgress.totalSeconds - startEpisodeProgress.currentSeconds)} left` : secondsToHuman(startEpisodeProgress.totalSeconds)
                        }
                    </Timer>
                </FlexRow>
            )}

            {hasEpisode && (
                <FlexCol rowGap='2rem' style={{ marginTop: '2rem' }}>
                    <ButtonLink
                        onClick={onClickWatch}
                        // prettier-ignore
                        className={`${hasFocus && focusElement === WATCH_ELEMENT ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}>
                        <FaPlay /> {getWatchLabel(isSingle, hasProgress, startSeasonIndex, startEpisodeIndex)}
                    </ButtonLink>
                    {hasProgress && (
                        <ButtonLink
                            // prettier-ignore
                            className={`${hasFocus && focusElement === RESTART_ELEMENT ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
                            onClick={() => onClickRestart(true)}>
                            <FaHistory /> {isSingle ? 'Restart Movie' : 'Restart Episode'}
                        </ButtonLink>
                    )}
                </FlexCol>
            )}
        </Container>
    );
}

EpisodeDetail.propTypes = propTypes;
export default EpisodeDetail;
