import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexRow from './FlexRow';

const Container = styled(FlexRow)`
    background-color: hsla(var(--hue), 50%, 40%, 0.5);
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 10;

    .show & {
        opacity: 1;
    }
`;

const propTypes = {
    children: PropTypes.node,
    backgroundHue: PropTypes.number,
    onClick: PropTypes.func,
};

function SubOverlay({ children, backgroundHue, onClick }) {
    return (
        <Container
            justifyContent='flex-end'
            style={{ '--hue': backgroundHue > 0 ? backgroundHue : 0 }}
            onClick={onClick}>
            {children}
        </Container>
    );
}

SubOverlay.propTypes = propTypes;
export default SubOverlay;
