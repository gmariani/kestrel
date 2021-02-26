import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const StyledLink = styled.button`
    color: rgba(255, 255, 255, 0.5);
    background-color: transparent;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 2rem;
    transition: color 0.3s, background-color 0.3s;
    padding: 1rem;
    border-radius: 4px;
    border: none;
    display: flex;
    align-items: center;
    max-width: 500px;

    /* Safari Fix: It can't handle column-gap with Flex */
    /*column-gap: 1rem;*/
    & > * {
        margin-right: 1rem;
    }
    & > :last-child {
        margin-right: 0;
    }

    /* 960x x 540px for TV */
    @media screen and (max-width: 970px) {
        max-width: 200px;
    }

    /* Landscape mobile */
    @media screen and (max-width: 800px) {
        max-width: 100%;
    }

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
    focused: PropTypes.bool,
    selected: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

function ButtonLink({ focused, selected, children, onClick }) {
    // console.log('ButtonLink', `focused: ${focused}`, `selected: ${selected}`, realFocusKey);
    return (
        <StyledLink className={`${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`} onClick={onClick}>
            {children}
        </StyledLink>
    );
}

ButtonLink.propTypes = propTypes;
export default withFocusable()(ButtonLink);
