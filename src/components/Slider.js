import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

const Container = styled.div`
    position: relative;
    width: 100%;
`;

const ThumbContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 2px;
    left: ${({ value }) => `${value}%;`};
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
    const trackRef = useRef(null);
    const height = 10;

    function trackClickHandler(event) {
        const trackBounds = event.currentTarget.getBoundingClientRect();
        const mouseX = event.pageX - trackBounds.x;
        const trackWidth = trackBounds.width;
        const seekPercent = mouseX / trackWidth;
        if (onSeek) onSeek(seekPercent);
    }

    // function getThumbPosition(percent) {
    //     if (!trackRef || !trackRef.current) return 0;

    //     const track = trackRef.current;
    //     const trackBounds = track.getBoundingClientRect();
    //     return percent * trackBounds.width;
    // }
    // style={{ left: `${getThumbPosition(position)}px` }}
    return (
        <Container>
            <ThumbContainer value={position * 100}>
                <Thumb height={height} theme={theme} />
                <Timer time={time} />
            </ThumbContainer>

            <ProgressBar
                ref={trackRef}
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
