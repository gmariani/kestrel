import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { secondsToHuman } from '../utils';

const Container = styled(ReachRouterLink)`
    background-color: black;
    border-width: 0;
    border-color: transparent;
    border-radius: 2rem;
    cursor: pointer;
    display: flex;
    /* height: auto;
     min-height: 145px;
     flex-basis: 200px;
     flex-grow: 1;
     flex-shrink: 1;*/
    opacity: 0.75;
    padding: 0;
    text-align: left;
    transform: scale(1);
    transition: all 0.3s;
    text-decoration: none;
    &:hover {
        text-decoration: none;
    }

    &.focused,
    &:focus,
    &:hover {
        opacity: 1;
    }

    &.selected.focused,
    &:focus,
    &:hover {
        transform: scale(1.025);
    }

    &.selected,
    &.focused,
    &:focus,
    &:hover {
        background-color: white;
    }

    &.selected .episode__meta,
    &.focused .episode__meta,
    &:focus .episode__meta,
    &:hover .episode__meta {
        color: rgba(85, 85, 85, 1);
    }

    &.selected .episode__title,
    &.focused .episode__title,
    &:focus .episode__title,
    &:hover .episode__title {
        color: black;
    }
`;

const Thumbnail = styled.div`
    width: 30%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    background-image: ${({ src }) => `url(${src});`};
    background-size: cover;
    background-position: center;
    /* Fix slight pixel render error */
    transform: translateX(-1px);
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    color: rgba(184, 183, 183, 1);
    user-select: none;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 2rem 2rem;
    flex: 1;
`;

const Title = styled.div`
    font-size: 1.875rem;
    color: white;
    flex-grow: 1;
    user-select: none;
`;

const Counter = styled.div``;

const Timer = styled.div``;

const propTypes = {
    imagePath: PropTypes.string,
    to: PropTypes.string,
    title: PropTypes.string,
    episodeNumber: PropTypes.string,
    progress: PropTypes.shape({
        percent: PropTypes.number,
        currentSeconds: PropTypes.number,
        totalSeconds: PropTypes.number,
    }),
    className: PropTypes.string,
    onClickEpisode: PropTypes.func,
};
const defaultProgress = {
    percent: 0,
    currentSeconds: 0,
    totalSeconds: 0,
};

function Episode({
    imagePath,
    to,
    title = 'No Title',
    episodeNumber = '0',
    progress = defaultProgress,
    className = '',
    onClickEpisode,
}) {
    const timer =
        progress.percent > 0
            ? `${secondsToHuman(progress.totalSeconds - progress.currentSeconds)} left`
            : secondsToHuman(progress.totalSeconds);
    // Title and Meta have classnames so we can target them at the parent level with CSS
    return (
        <Container onClick={onClickEpisode} to={to} className={className}>
            {imagePath ? <Thumbnail src={imagePath} /> : null}
            <Info>
                <Meta className='episode__meta'>
                    <Counter>Episode {episodeNumber}</Counter>
                    <Timer>{timer}</Timer>
                </Meta>
                <Title className='episode__title'>{title}</Title>
                {progress.percent > 0 ? <ProgressBar value={progress.percent} theme='dark' /> : null}
            </Info>
        </Container>
    );
}

Episode.propTypes = propTypes;
export default Episode;
