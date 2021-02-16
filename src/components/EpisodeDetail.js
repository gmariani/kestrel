import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { FaPlay, FaHistory } from 'react-icons/fa';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import shave from 'shave';
import FlexCol from './FlexCol';
import FlexRow from './FlexRow';
import ProgressBar from './ProgressBar';
import ButtonLink from './ButtonLink';
import Rating from './Rating';
import mediaInterface from '../interfaces/media';
import { secondsToHuman, capitalize, durationToSeconds } from '../utils';

const Container = styled(FlexCol)`
    font-size: 2rem;
    /* Not suppored in Firefox TV or Chrome yet */
    /*justify-content: end;*/
    justify-content: flex-end;
    color: white;
    margin-bottom: 2.25rem;
    flex: 1;
    --progressBG: rgba(255, 255, 255, 0.6);
    --trackBG: rgba(255, 255, 255, 0.25);
`;

const Meta = styled.div`
    display: flex;
    /*justify-content: space-between;*/
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.875rem;
`;

const Title = styled.div`
    font-size: 6rem;
    line-height: 6rem;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 2rem;
    max-width: 800px;
    /*overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;*/
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
    // rating- year - genre - TV Series
    const items = [];
    // if (contentRating) items.push('');
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
    isSingle = false,
    media = defaultSeries,
    startSeasonIndex = 0,
    startEpisodeIndex = 0,
    startEpisodeProgress,
    startEpisodeRoute,
    onClickWatch,
    onClickRestart,
}) {
    const [selectedButton, setSelectedButton] = useState('ACTION-PLAY');
    const hasProgress = startEpisodeProgress && startEpisodeProgress.percent > 0;
    const hasEpisode = !!startEpisodeRoute;

    function getDescription() {
        if (isSingle) {
            return media?.description;
        }
        if (media?.season?.description && media.season.description !== '') {
            return media.season.description;
        }
        return media?.description;
    }

    // Auto truncate description as necessary
    useEffect(() => {
        function handleResize() {
            // Quickly see what height would be temporarily
            // if truncated without the ellipsis.
            const element = document.querySelector('.js-shave');
            element.style.overflow = 'hidden';
            const compStyles = window.getComputedStyle(element);
            const { height } = compStyles;
            element.style.overflow = 'visible';
            shave('.js-shave', parseInt(height, 10));
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <Container justifyContent='flex-start'>
            <Title>{media.name}</Title>
            <Description className='js-shave'>{getDescription()}</Description>
            <Meta>
                {media.contentRating && <Rating rating={media.contentRating} />}
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
                <FlexCol rowGap='2rem' style={{ marginTop: '2rem' }} focusKey='ACTIONS'>
                    <ButtonLink
                        focusKey='ACTION-PLAY'
                        onClick={onClickWatch}
                        onEnterPress={() => {
                            // console.log('onEnterPress onClickWatch()');
                            onClickWatch();
                        }}
                        onBecameFocused={() => {
                            setSelectedButton('ACTION-PLAY');
                        }}
                        selected={selectedButton === 'ACTION-PLAY'}>
                        <FaPlay /> {getWatchLabel(isSingle, hasProgress, startSeasonIndex, startEpisodeIndex)}
                    </ButtonLink>
                    {hasProgress && (
                        <ButtonLink
                            focusKey='ACTION-RESTART'
                            onEnterPress={() => {
                                // console.log('onEnterPress onClickRestart()');
                                onClickRestart(true);
                            }}
                            onBecameFocused={() => {
                                setSelectedButton('ACTION-RESTART');
                            }}
                            selected={selectedButton === 'ACTION-RESTART'}
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
export default withFocusable()(EpisodeDetail);
