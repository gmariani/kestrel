import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    color: #eeeeee;
    font-size: 1.15rem;
    font-style: normal;
    font-weight: normal;
    line-height: 1.5rem;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    user-select: none;
`;

const propTypes = {
    time: PropTypes.string,
};

function Timer({ time }) {
    return <Container>{time}</Container>;
}

Timer.propTypes = propTypes;
export default Timer;
