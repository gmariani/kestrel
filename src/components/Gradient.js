import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    z-index: 0;
    top: 0;
    left: 0;
    background: ${({ startColor, endColor }) => `linear-gradient(128.4deg, ${startColor} 18.25%, ${endColor} 84.73%)`};
    mix-blend-mode: ${({ blendMode }) => blendMode};
    opacity: ${({ opacity }) => opacity};
`;

const propTypes = {
    opacity: PropTypes.number,
    startColor: PropTypes.string,
    endColor: PropTypes.string,
    blendMode: PropTypes.string,
};

const Gradient = ({ startColor = '#EE6B4D', endColor = '#FF3000', blendMode = 'normal', opacity = 0.8 }) => (
    <Container blendMode={blendMode} opacity={opacity.toString()} startColor={startColor} endColor={endColor} />
);
Gradient.propTypes = propTypes;
export default Gradient;
