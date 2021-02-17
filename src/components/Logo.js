import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import svgLogo from '../logo.svg';

const Image = styled.img`
    width: var(--width);
    height: var(--height);
`;

const Link = styled(ReachRouterLink)`
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    transition: all 0.3s;
    &:focus,
    &.focused {
        border-radius: 0.5rem;
        border-color: white;
    }
`;

const propTypes = {
    to: PropTypes.string,
    focused: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
};

function Logo({ focused, width = 12.5, height = 2.8125, to = '' }) {
    const image = (
        <Image
            src={svgLogo}
            alt='Kestrel'
            width={width * 16} // 12.5rem
            height={height * 16} // 2.8125rem
            style={{ '--width': `${width}rem`, '--height': `${height}rem` }}
        />
    );
    if (to !== '')
        return (
            <Link className={`${focused ? 'focused' : ''}`} to={to}>
                {image}
            </Link>
        );
    return image;
}

Logo.propTypes = propTypes;
// export default Logo;
export default withFocusable()(Logo);
