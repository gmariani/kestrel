import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import ProgressBar from './ProgressBar';
import { secondsToHuman } from '../utils';

const Title = styled.div`
    font-size: 1.875rem;
    color: white;
    flex-grow: 1;
    user-select: none;
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    color: rgba(184, 183, 183, 1);
    user-select: none;
`;

const Container = styled(ReachRouterLink)`
    background-color: black;
    border-width: 0;
    border-style: solid;
    border-color: transparent;
    border-radius: 2rem;
    cursor: pointer;
    display: flex;
    opacity: 0.75;
    padding: 0;
    text-align: left;
    transform: scale(1);
    transition: all 0.3s;
    text-decoration: none;
    &:hover {
        text-decoration: none;
    }
    --progressBG: rgba(255, 255, 255, 0.6);
    --trackBG: rgba(255, 255, 255, 0.25);

    &.focused,
    &:focus,
    &:hover {
        opacity: 1;
    }

    &.selected,
    &.selected.focused,
    &:focus,
    &:hover {
        transform: scale(1.025);
        --progressBG: rgba(0, 0, 0, 0.6);
        --trackBG: rgba(0, 0, 0, 0.25);
    }

    &.selected,
    &.focused,
    &:focus,
    &:hover {
        background-color: white;
    }

    &.selected ${Meta}, &.focused ${Meta}, &:focus ${Meta}, &:hover ${Meta} {
        color: rgba(85, 85, 85, 1);
    }

    &.selected ${Title}, &.focused ${Title}, &:focus ${Title}, &:hover ${Title} {
        color: black;
    }
`;

const ThumbnailContainer = styled.div`
    width: 30%;
    background-color: rgba(100, 100, 100, 0.5);
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    /* Fix slight pixel render error */
    transform: translateX(-1px);
    overflow: hidden;
`;
const ThumbnailImage = styled.img`
    height: 100%;
    width: auto;
    object-fit: cover;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 2rem 2rem;
    flex: 1;
`;

const propTypes = {
    focused: PropTypes.bool,
    selected: PropTypes.bool,
    realFocusKey: PropTypes.string,
    imagePath: PropTypes.string,
    to: PropTypes.string,
    title: PropTypes.string,
    episodeNumber: PropTypes.string,
    progress: PropTypes.shape({
        percent: PropTypes.number,
        currentSeconds: PropTypes.number,
        totalSeconds: PropTypes.number,
    }),
};
const defaultProgress = {
    percent: 0,
    currentSeconds: 0,
    totalSeconds: 0,
};

function Episode({
    focused,
    selected,
    realFocusKey,
    imagePath,
    to,
    title = 'No Title',
    episodeNumber = '0',
    progress = defaultProgress,
}) {
    // console.log('Episode', `focused: ${focused}`, `selected: ${selected}`, realFocusKey);
    const timer =
        progress.percent > 0
            ? `${secondsToHuman(progress.totalSeconds - progress.currentSeconds)} left`
            : secondsToHuman(progress.totalSeconds);

    // Use style attribute to avoid mutating the css class

    function getThumbnail() {
        if (imagePath) {
            const ref = React.createRef(null);
            // const style = { backgroundImage: `url('${imagePath}')` };
            // const result = <Thumbnail ref={ref} style={style} />;
            const result = (
                <ThumbnailContainer>
                    <ThumbnailImage ref={ref} src={imagePath} />
                </ThumbnailContainer>
            );
            console.log('getThumbnail showing', realFocusKey, ref);
            return result;
        }
        // console.log('getThumbnail hidden', realFocusKey);
        return null;
    }
    return (
        <Container to={to} className={`episode ${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`}>
            {getThumbnail()}
            <Info>
                <Meta>
                    <div>Episode {episodeNumber}</div>
                    <div>{timer}</div>
                </Meta>
                <Title>{title}</Title>
                {progress.percent > 0 ? (
                    <ProgressBar value={progress.percent} theme={selected ? 'dark' : 'light'} />
                ) : null}
            </Info>
        </Container>
    );
}

Episode.propTypes = propTypes;
export default withFocusable()(Episode);
