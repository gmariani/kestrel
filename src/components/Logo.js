import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import svgLogo from '../logo.svg';

const Image = styled.img`
    width: ${(props) => props.widthVal};
    height: ${(props) => props.heightVal};
`;

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
    const image = <Image src={svgLogo} alt='Kestrel' widthVal='12.5rem' heightVal='2.8125rem' />;
    if (to !== '') return <Link to={to}>{image}</Link>;
    return image;
}

Logo.propTypes = propTypes;
export default Logo;
