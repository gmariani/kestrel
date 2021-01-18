import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: black;
    padding: 100px;
    position: absolute;
    top: 0;
    left: 0;
    /* Not suppored in Firefox TV or Chrome yet */
    /*justify-content: end;*/
    justify-content: flex-end;
`;

const propTypes = {
    children: PropTypes.node,
};

function Credits({ children }) {
    return <Container>{children}</Container>;
}
Credits.propTypes = propTypes;
export default Credits;
