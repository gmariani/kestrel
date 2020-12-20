import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FaPlay, FaHistory } from 'react-icons/fa';
import Link from './Link';
import Row from './Row';
import ProgressBar from './ProgressBar';
import { secondsToHuman, capitalize, durationToSeconds } from '../utils';

const Container = styled.div`
    display: flex;
    font-size: 2rem;
    color: white;
    flex-direction: column;
    justify-content: end;
    flex: 1;
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
`;

const Controls = styled.div`
    display: flex;
    column-gap: 2rem;
    row-gap: 10px;
    margin-top: 2rem;
    flex-direction: column;
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

    const seasonNum = lastSeason + 1;
    const episodeNum = lastEpisode + 1;
    if (hasProgress) {
        // Resume Episode: S# E#
        return `Resume Episode: S${seasonNum} E${episodeNum}`;
    }
    if (lastEpisode) {
        // Watch Next Episode: S# E#
        return `Watch Next Episode: S${seasonNum} E${episodeNum}`;
    }
    // Start Watching: S1 E1
    return `Start Watching: S1 E1`;
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
    season: PropTypes.number,
    episode: PropTypes.number,
    series: PropTypes.shape({
        year: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    }),
    progress: PropTypes.shape({
        percent: PropTypes.number,
        currentSeconds: PropTypes.number,
        totalSeconds: PropTypes.number,
    }),
    episodeRoute: PropTypes.string.isRequired,
    onClickRestart: PropTypes.func.isRequired,
};

// Actual object to avoid mutable object from invalidating component
const defaultProgress = {
    percent: 0,
    currentSeconds: 0,
    totalSeconds: 0,
};
const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };

function EpisodeDetail({
    hasFocus = false,
    isSingle = false,
    season = 0,
    episode = 0,
    series = defaultSeries,
    progress = defaultProgress,
    episodeRoute,
    onClickRestart,
}) {
    const hasProgress = progress.percent > 0;
    const timeRemaining = hasProgress
        ? `${secondsToHuman(progress.totalSeconds - progress.currentSeconds)} left`
        : secondsToHuman(progress.totalSeconds);
    const selectElements = progress ? ['watch', 'restart'] : ['watch'];

    // Hooks
    const history = useHistory();
    const [selected, setSelected] = useState(0);
    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            if (!hasFocus) return;

            // (13) Enter
            if (keyCode === 13) {
                history.push(episodeRoute);
                event.preventDefault();
            }
            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 38) {
                    setSelected((selected - 1 + selectElements.length) % selectElements.length);
                } else if (keyCode === 40) {
                    setSelected((selected + 1) % selectElements.length);
                }
                event.preventDefault();
            }
        },
        [hasFocus, history, episodeRoute, selected, setSelected, selectElements.length]
    );

    if (!hasProgress && selected > 0) {
        setSelected(0);
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);
    // console.log('EpisodeDetail', series);
    return (
        <Container>
            <Title>{series.name}</Title>
            <Description>{series.description}</Description>
            <Meta>
                {getMetaLabel(
                    isSingle,
                    series?.contentRating,
                    series?.year,
                    series?.duration,
                    series?.genres,
                    series?.category
                )}
            </Meta>

            {hasProgress ? (
                <Row className='align-items-center'>
                    <ProgressBar value={progress.percent} /> <Timer>{timeRemaining}</Timer>
                </Row>
            ) : null}

            <Controls>
                <Link
                    to={episodeRoute}
                    // prettier-ignore
                    className={`${selectElements[selected] === 'watch' ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}>
                    <FaPlay /> {getWatchLabel(isSingle, hasProgress, season, episode)}
                </Link>
                {hasProgress ? (
                    <Link
                        to={episodeRoute}
                        // prettier-ignore
                        className={`${selectElements[selected] === 'restart' ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
                        onClick={onClickRestart}>
                        <FaHistory /> {isSingle ? 'Restart Movie' : 'Restart Episode'}
                    </Link>
                ) : null}
            </Controls>
        </Container>
    );
}

EpisodeDetail.propTypes = propTypes;
export default EpisodeDetail;
