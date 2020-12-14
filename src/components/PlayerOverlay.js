import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    background: rgba(0, 0, 0, 0.5);
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s;
    padding: 4rem;
    justify-content: space-between;
    flex-direction: column;

    .show & {
        opacity: 1;
    }
`;

const propTypes = {
    children: PropTypes.node,
};

function PlayerOverlay({ children }) {
    return <Container>{children}</Container>;
}

PlayerOverlay.propTypes = propTypes;
export default PlayerOverlay;
