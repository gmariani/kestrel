import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    /*height: 100%;*/
    padding: 6.25rem;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 100vh;
`;

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const TempContainer = ({ children, className }) => {
    return <Container className={className}>{children}</Container>;
};
TempContainer.propTypes = propTypes;
export default TempContainer;
