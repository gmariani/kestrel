import React from 'react';
import PropTypes from 'prop-types';
import Container from './styles/row';

const propTypes = {
    children: PropTypes.node,
    height: PropTypes.string,
};

function Row({ children, height = 'auto' }) {
    return <Container height={height}>{children}</Container>;
}

Row.propTypes = propTypes;
export default Row;
