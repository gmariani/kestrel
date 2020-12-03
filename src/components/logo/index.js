import React from 'react';
import PropTypes from 'prop-types';
import { Image, Link } from './styles/logo';
import svgLogo from '../../logo.svg';

const propTypes = {
    to: PropTypes.string,
};

function Logo({ to = '' }) {
    const image = <Image src={svgLogo} alt='Kestrel' width='200' height='45' />;
    if (to !== '') return <Link to={to}>{image}</Link>;
    return image;
}

Logo.propTypes = propTypes;
export default Logo;
