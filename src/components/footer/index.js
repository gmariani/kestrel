import React from 'react';
import PropTypes from 'prop-types';
import Container from './styles/footer';

const propTypes = {
    children: PropTypes.node.isRequired,
};

function Footer({ children }) {
    return <Container>{children}</Container>;
}

Footer.propTypes = propTypes;
export default Footer;
