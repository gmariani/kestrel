import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    padding: 6.25rem;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
`;

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

const TempContainer = ({ children, className, style }) => {
    return (
        <Container className={className} style={style}>
            {children}
        </Container>
    );
};
TempContainer.propTypes = propTypes;
export default TempContainer;
