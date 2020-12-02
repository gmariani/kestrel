import React from 'react';
import PropTypes from 'prop-types';
import { Image, Link, LogoText } from './styles/logo';
import svgLogo from '../../logo.svg';

export default function Logo() {
    // return <LogoText {...restProps}>Kestrel</LogoText>;
    return <Image src={svgLogo} alt='Kestrel' width='200' height='45' />;
}

Logo.Link = function LogoLink({ to }) {
    return (
        <Link to={to}>
            <Logo src={svgLogo} alt='Kestrel' width='200' height='45' />
        </Link>
    );
};
Logo.Link.propTypes = {
    to: PropTypes.string,
};
Logo.Link.defaultProps = {
    to: '/',
};
