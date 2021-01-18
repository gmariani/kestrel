/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    /* Not suppored in Firefox TV or Chrome yet */
    /*justify-content: end;*/
    justify-content: flex-end;

    /*align-items: end;*/
`;

function Header({ children }) {
    return <Container>{children}</Container>;
}
Header.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Header;
