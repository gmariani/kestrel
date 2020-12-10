import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    position: absolute;
    pointer-events: none;
    z-index: 5;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: radial-gradient(70.79% 70.79% at 51.61% 17.18%, rgba(0, 0, 0, 0) 0%, #000000 100%);
    mix-blend-mode: normal;
    background: radial-gradient(70.79% 70.79% at 51.61% 17.18%, rgba(0, 0, 0, 0) 0%, #000000 100%);
    opacity: ${({ opacity }) => opacity};
`;

const propTypes = {
    opacity: PropTypes.number,
};

const Shadow = ({ opacity = 0.75 }) => {
    return <Container opacity={opacity.toString()} />;
};

Shadow.propTypes = propTypes;
export default Shadow;
