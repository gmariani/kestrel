import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.span`
    padding: 0px 7px;
    border: 2px solid white;
    font-family: serif;
    line-height: 1.5625rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    align-self: center;
`;

const propTypes = {
    children: PropTypes.string,
};

function Rating({ children = 'NR' }) {
    return <Container>{children}</Container>;
}

Rating.propTypes = propTypes;
export default Rating;
