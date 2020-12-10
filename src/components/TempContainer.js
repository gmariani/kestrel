import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    height: 100%;
    padding: 6.25rem;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
    bototm: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const propTypes = {
    children: PropTypes.node,
};

const TempContainer = ({ children }) => {
    return <Container>{children}</Container>;
};
TempContainer.propTypes = propTypes;
export default TempContainer;
