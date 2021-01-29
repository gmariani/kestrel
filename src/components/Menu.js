import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const Container = styled.nav`
    column-gap: 2rem;
    display: flex;
    margin-bottom: 2rem;
`;

const propTypes = {
    children: PropTypes.node.isRequired,
    // realFocusKey: PropTypes.string,
    // focused: PropTypes.bool,
    hasFocusedChild: PropTypes.bool,
};

function Menu({ children, hasFocusedChild }) {
    // console.log('Menu', `focused: ${focused}`, `hasFocusedChild: ${hasFocusedChild}`, `realFocusKey: ${realFocusKey}`);
    return <Container className={`${hasFocusedChild ? 'focused' : ''}`}>{children}</Container>;
}

Menu.propTypes = propTypes;
export default withFocusable({ trackChildren: true })(Menu);
