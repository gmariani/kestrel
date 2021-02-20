import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexCol from './FlexCol';

const Container = styled(FlexCol)`
    background: rgba(0, 0, 0, 0.25);
    background-image: linear-gradient(rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0));
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s;
    padding: 4rem;
    z-index: var(--zIndex);
    cursor: none;
    pointer-events: none;

    &.show {
        opacity: 1;
    }
`;

const propTypes = {
    children: PropTypes.node,
    zIndex: PropTypes.number,
    className: PropTypes.string,
};

function PreRollOverlay({ children, className, zIndex = 5 }) {
    return (
        <Container justifyContent='space-between' className={className} style={{ '--zIndex': zIndex }}>
            {children}
        </Container>
    );
}

PreRollOverlay.propTypes = propTypes;
export default PreRollOverlay;
