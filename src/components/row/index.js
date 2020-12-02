import React from 'react';
import PropTypes from 'prop-types';
import Container from './styles/row';

const propTypes = {
    children: PropTypes.node,
    height: PropTypes.string,
};

const defaultProps = {
    children: null,
    height: 'auto',
};

function Row({ children, height }) {
    return <Container height={height}>{children}</Container>;
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;
export default Row;
