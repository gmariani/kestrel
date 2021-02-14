import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const Container = styled(ReachRouterLink)`
    color: rgba(255, 255, 255, 0.5);
    background-color: transparent;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 2rem;
    padding: 0.5rem;
    transition: all 0.3s;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    outline: none;

    &.selected {
        color: white;
        background-color: rgba(255, 255, 255, 0.25);
    }

    &:not([disabled]):hover,
    &:not([disabled]):active,
    .focused &:not([disabled]).selected {
        color: black;
        background-color: white;
        text-decoration: none;
    }
`;

const propTypes = {
    setFocus: PropTypes.func,
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

function MenuLink({ setFocus, selected, focused, children, to }) {
    // console.log('MenuLink', `selected: ${selected}`, `focused: ${focused}`, to);

    // If loaded by URL, auto-focus on correct menu item
    if (selected && !focused) {
        // console.log('MenuLink.setFocus', to);
        setFocus();
    }
    return (
        <Container to={to} className={`${selected ? 'selected' : ''}`}>
            {children}
        </Container>
    );
}

MenuLink.propTypes = propTypes;
export default withFocusable()(MenuLink);
