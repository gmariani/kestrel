import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Slider from './Slider';
import Timer from './Timer';
import FlexRow from './FlexRow';
import { secondsToDuration } from '../utils';

const Container = styled(FlexRow)`
    align-items: center;
    margin-bottom: 2rem;
`;

const propTypes = {
    position: PropTypes.number,
    currentSeconds: PropTypes.number,
    totalSeconds: PropTypes.number,
    onChange: PropTypes.func,
};

function TrackBar({ position = 0, currentSeconds = 0, totalSeconds = 0, onChange }) {
    return (
        <Container>
            <Slider position={position / 100} time={secondsToDuration(currentSeconds)} onSeek={onChange} />
            <Timer time={`-${secondsToDuration(totalSeconds - currentSeconds)}`} />
        </Container>
    );
}

TrackBar.propTypes = propTypes;
export default TrackBar;
