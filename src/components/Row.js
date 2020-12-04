import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
    display: flex;
    height: ${({ height }) => height};
    column-gap: 2rem;
`;

const propTypes = {
    children: PropTypes.node,
    height: PropTypes.string,
};

function Row({ children, height = 'auto' }) {
    return <Container height={height}>{children}</Container>;
}

Row.propTypes = propTypes;
export default Row;
