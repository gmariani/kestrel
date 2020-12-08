import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: relative;
    row-gap: 1.5rem;
`;

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

function Column({ children, className = '' }) {
    return <Container className={className}>{children}</Container>;
}

Column.propTypes = propTypes;
export default Column;
