import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

const Container = styled.div`
    position: relative;
    width: 100%;
    --progressBG: rgba(255, 255, 255, 0.6);
    --trackBG: rgba(255, 255, 255, 0.25);
`;

const ThumbContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 2px;
    left: var(--position);
    top: -5px;
    position: absolute;
    pointer-events: none;
`;

const Thumb = styled.div`
    width: 2px;
    height: 20px;
    background-color: white;
`;

const propTypes = {
    position: PropTypes.number,
    time: PropTypes.string,
    theme: PropTypes.string,
    onSeek: PropTypes.func,
};

function Slider({ position = 0, time = '00:00', theme = 'light', onSeek }) {
    const height = 10;

    function trackClickHandler(event) {
        const trackBounds = event.currentTarget.getBoundingClientRect();
        const mouseX = event.pageX - trackBounds.x;
        const trackWidth = trackBounds.width;
        const seekPercent = mouseX / trackWidth;
        if (onSeek) onSeek(seekPercent);
    }

    return (
        <Container>
            <ThumbContainer style={{ '--position': `${(position * 100).toFixed(2)}%` }}>
                <Thumb height={height} theme={theme} />
                <Timer time={time} />
            </ThumbContainer>

            <ProgressBar
                height={height}
                theme={theme}
                style={{ opacity: 0.7 }}
                value={position * 100}
                onClick={trackClickHandler}
            />
        </Container>
    );
}

Slider.propTypes = propTypes;
export default Slider;
