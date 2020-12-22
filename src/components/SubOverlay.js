import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexRow from './FlexRow';

// TODO overlay is in series color
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
};

function SubOverlay({ children, backgroundHue }) {
    return (
        <Container justifyContent='end' style={{ '--hue': backgroundHue > 0 ? backgroundHue : 0 }}>
            {children}
        </Container>
    );
}

SubOverlay.propTypes = propTypes;
export default SubOverlay;
