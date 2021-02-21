import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const loading = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
`;

const Background = styled.div`
    background-color: white;
    animation: ${loading} 10s linear;
    border-radius: 4px;
    transition: width 10s;
    padding: 1rem 0;
`;

const Label = styled.div`
    color: black;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 2rem;
    padding: 0 1rem;
    width: 150px;

    &:after {
        display: block;
        text-align: center;
        content: '${(props) => props.value}';
        color: white;
        mix-blend-mode: difference;
    }
`;

const StyledLink = styled.button`
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid transparent;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-items: center;
    max-width: 500px;
    padding: 0;
    transition: border-color 0.3s;

    & svg {
        margin-left: 1rem;
    }

    &.selected {
        border-color: white;
    }

    &:not([disabled]):focus {
        outline: 2px solid white;
    }
`;

const propTypes = {
    focused: PropTypes.bool,
    selected: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

function TimerButtonLink({ focused, selected, label, onClick }) {
    // console.log('TimerButtonLink', `focused: ${focused}`, `selected: ${selected}`, realFocusKey);
    return (
        <StyledLink className={`${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`} onClick={onClick}>
            <Background>
                <Label value={label} />
            </Background>
        </StyledLink>
    );
}

TimerButtonLink.propTypes = propTypes;
export default withFocusable()(TimerButtonLink);
