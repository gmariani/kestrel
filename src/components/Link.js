import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

const StyledLink = styled(ReachRouterLink)`
    color: rgba(255, 255, 255, 0.5);
    background-color: transparent;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 2rem;
    transition: all 0.3s;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    max-width: 500px;

    & svg {
        margin-left: 1rem;
    }

    &.selected {
        color: white;
        background-color: rgba(255, 255, 255, 0.25);
    }

    &:not([disabled]):active,
    &:not([disabled]):focus,
    &:not([disabled]).focused.selected,
    &:not([disabled]):hover {
        color: black;
        background-color: white;
        text-decoration: none;
    }

    &:not([disabled]):focus {
        outline: 2px solid white;
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
