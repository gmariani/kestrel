import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
    display: flex;
    height: ${({ height }) => height};

    /* Safari Fix: It can't handle column-gap with Flex */
    /*column-gap: 2rem;*/
    & > * {
        margin-right: 2rem;
    }
    & > :last-child {
        margin-right: 0;
    }
`;

const propTypes = {
    children: PropTypes.node,
    height: PropTypes.string,
    className: PropTypes.string,
};

function Row({ children, height = 'auto', className = '' }) {
    return (
        <Container height={height} className={className}>
            {children}
        </Container>
    );
}

Row.propTypes = propTypes;
export default Row;
