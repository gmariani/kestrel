import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import ProgressBar from './ProgressBar';
import IconButton from './IconButton';
import { secondsToDuration } from '../utils';

const Container = styled.div`
    display: flex;
    flex-direction: column;

    font-family: Tw Cen MT;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    width: 100%;
`;

const Timer = styled.div`
    color: #eeeeee;
    font-family: Tw Cen MT;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: normal;
    line-height: 52px;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    user-select: none;
`;

const Track = styled.div`
    display: flex;
    column-gap: 1rem;
    align-items: center;
`;
const Controls = styled.div`
    display: flex;
`;
const Spacer = styled.div`
    flex: 1;
`;
const Buttons = styled.div`
    display: flex;
    align-content: end;
    color: white;
    column-gap: 1rem;
`;
const Settings = styled.div`
    flex: 1;
    color: white;
    justify-content: end;
    align-content: center;
    display: flex;
    column-gap: 1rem;
`;

const propTypes = {
    progress: PropTypes.number,
    playing: PropTypes.bool,
    buffering: PropTypes.bool,
    currentTime: PropTypes.number,
    totalTime: PropTypes.number,
    onSeek: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
};

function PlayerControls({
    progress = 0,
    playing = false,
    buffering = false,
    currentTime = 0,
    totalTime = 0,
    onSeek,
    onPlay,
    onPause,
}) {
    const onClickSeek = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const seekX = event.pageX - rect.x;
        const trackWidth = rect.width;
        const seekPercent = seekX / trackWidth;
        if (onSeek) onSeek(seekPercent);
        // player.seekTo(seekPercent);
    };
    // const style = { opacity: disabled ? 0.5 : 1 };
    return (
        <Container>
            <Track>
                <ProgressBar width='50%' height='10px' value={progress} onClick={onClickSeek} />
                <Timer>-{secondsToDuration(totalTime - currentTime)}</Timer>
            </Track>

            <Controls>
                <Spacer />
                <Buttons>
                    <IconButton label='Start Over' icon='prev' />
                    {playing ? (
                        <IconButton label='Pause' icon='pause' disabled={buffering} onClick={onPause} />
                    ) : (
                        <IconButton label='Play' icon='play' disabled={buffering} onClick={onPlay} />
                    )}
                    <IconButton label='Play Next' icon='next' />
                </Buttons>
                <Settings>
                    <IconButton label='Settings' icon='cog' />
                    <IconButton label='Info' icon='info' />
                </Settings>
            </Controls>
        </Container>
    );
}

PlayerControls.propTypes = propTypes;
export default PlayerControls;
