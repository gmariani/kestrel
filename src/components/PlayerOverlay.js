import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexCol from './FlexCol';

const Container = styled(FlexCol)`
    background: rgba(0, 0, 0, 0.5);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s;
    padding: 4rem;
    z-index: 5;

    .show & {
        opacity: 1;
    }
`;

const propTypes = {
    children: PropTypes.node,
};

function PlayerOverlay({ children }) {
    return <Container justifyContent='space-between'>{children}</Container>;
}

PlayerOverlay.propTypes = propTypes;
export default PlayerOverlay;
