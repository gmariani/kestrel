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
