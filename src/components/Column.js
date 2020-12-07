import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: relative;

    /* from episode container
    flex: 1;
    row-gap: 1.5rem;
    overflow: hidden;
    padding-right: 1rem;
    padding-left: 1rem;*/
`;

const propTypes = {
    children: PropTypes.node,
};

function Column({ children }) {
    return <Container>{children}</Container>;
}

Column.propTypes = propTypes;
export default Column;
