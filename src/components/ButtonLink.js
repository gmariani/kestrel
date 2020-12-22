import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledLink = styled.button`
    color: rgba(255, 255, 255, 0.5);
    background-color: transparent;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 2rem;
    transition: all 0.3s;
    padding: 1rem;
    border-radius: 3px;
    border: none;
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
    onClick: PropTypes.func,
};

function ButtonLink({ children, onClick, className = '' }) {
    return (
        <StyledLink className={className} onClick={onClick}>
            {children}
        </StyledLink>
    );
}

ButtonLink.propTypes = propTypes;
export default ButtonLink;
