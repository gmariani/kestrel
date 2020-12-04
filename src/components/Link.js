import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

const StyledLink = styled(ReachRouterLink)`
    background-color: rgba(255, 255, 255, 0.25);
    &.secondary {
        background-color: transparent;
    }
    &.primary {
        background-color: rgba(255, 255, 255, 0.25);
    }
    border-radius: 0.5rem;
    border-color: transparent;
    color: #fff;
    font-family: Tw Cen MT;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: normal;
    line-height: 44px;
    padding: 1rem 6rem;
    transition: all 0.3s;
    text-decoration: none;

    &.player {
        height: 100%;
    }

    &:active,
    &:focus,
    &.focused,
    &:hover {
        color: black;
        background-color: white;
        text-decoration: none;
    }
`;

const propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
};

function Link({ children, to, className = '' }) {
    return (
        <StyledLink className={className} to={to}>
            {children}
        </StyledLink>
    );
}

Link.propTypes = propTypes;
export default Link;
