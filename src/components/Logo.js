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
};

function Logo({ focused, to = '' }) {
    const image = (
        <Image
            src={svgLogo}
            alt='Kestrel'
            width={12.5 * 16} // 12.5rem
            height={2.8125 * 16} // 2.8125rem
            style={{ '--width': '12.5rem', '--height': '2.8125rem' }}
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
