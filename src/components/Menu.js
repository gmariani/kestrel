import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const Container = styled.nav`
    display: flex;
    margin-bottom: 2rem;
    /* Not suppored in Firefox TV or Chrome yet */
    /*align-items: start;*/
    align-items: flex-start;

    /* Safari Fix: It can't handle column-gap with Flex */
    /*column-gap: 2rem;*/
    & > * {
        margin-right: 1rem;
    }
    & > :last-child {
        margin-right: 0;
    }
`;

const propTypes = {
    children: PropTypes.node.isRequired,
    // realFocusKey: PropTypes.string,
    // focused: PropTypes.bool,
    hasFocusedChild: PropTypes.bool,
};

function Menu({ children, hasFocusedChild }) {
    const numChildren = children.flat().length;
    // console.log('Menu', `focused: ${focused}`, `hasFocusedChild: ${hasFocusedChild}`, `realFocusKey: ${realFocusKey}`);
    return (
        <Container className={`${hasFocusedChild ? 'focused' : ''}`} numChildren={numChildren}>
            {children}
        </Container>
    );
}

Menu.propTypes = propTypes;
export default withFocusable({ trackChildren: true })(Menu);
