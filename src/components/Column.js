import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: relative;
`;

const propTypes = {
    children: PropTypes.node,
};

function Column({ children }) {
    return <Container>{children}</Container>;
}

Column.propTypes = propTypes;
export default Column;
