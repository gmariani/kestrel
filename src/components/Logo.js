import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import svgLogo from '../logo.svg';

const Image = styled.img``;

const Link = styled(ReachRouterLink)`
    margin-top: -2.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    transition: all 0.3s;
    &:focus {
        border-radius: 0.5rem;
        border-color: white;
    }
`;

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
