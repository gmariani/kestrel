import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Slider from './Slider';
import IconButton from './IconButton';
import Resolution from './Resolution';
import Timer from './Timer';
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

const Track = styled.div`
    display: flex;
    column-gap: 1rem;
    align-items: center;
    margin-bottom: 2rem;
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
    resolution: PropTypes.string,
    time: PropTypes.number,
    totalTime: PropTypes.number,
    isPlaying: PropTypes.bool,
    isBuffering: PropTypes.bool,
    onSeek: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
};

function PlayerControls({
    progress = 0,
    resolution = 'sd',
    time = 0,
    totalTime = 0,
    isPlaying = false,
    isBuffering = false,
    onSeek,
    onPlay,
    onPause,
}) {
    // const style = { opacity: disabled ? 0.5 : 1 };
    return (
        <Container>
            <Track>
                <Slider position={progress / 100} time={secondsToDuration(time)} onSeek={onSeek} />
                <Timer time={`-${secondsToDuration(totalTime - time)}`} />
            </Track>

            <Controls>
                <Spacer>
                    <Resolution type={resolution} />
                </Spacer>

                <Buttons>
                    <IconButton label='Start Over' icon='prev' />
                    {isPlaying ? (
                        <IconButton label='Pause' icon='pause' disabled={isBuffering} onClick={onPause} />
                    ) : (
                        <IconButton label='Play' icon='play' disabled={isBuffering} onClick={onPlay} />
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
