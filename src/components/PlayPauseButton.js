import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.button`
    background: none;
    border: none;

    display: flex;
    flex-direction: column;
    padding: 0;
`;
const Circle = styled.div`
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: 100px;
    width: 50px;
    height: 50px;

    &:hover {
        background-color: white;
    }
`;

const Icon = styled.svg`
    margin-top: -8px;
    margin-left: 3px;
    fill: white;
    button:hover & {
        fill: black;
    }
`;

const Label = styled.div`
    color: white;
    font-size: 1rem;
`;

const propTypes = {
    playing: PropTypes.bool,
    disabled: PropTypes.bool,
    onClickPlay: PropTypes.func,
    onClickPause: PropTypes.func,
};

function PlayPauseButton({ playing = false, disabled = false, onClickPlay, onClickPause }) {
    // const style = { opacity: disabled ? 0.5 : 1 };
    return playing ? (
        <Container onClick={onClickPause}>
            <Circle>
                <Icon width='40%' height='40%' style={{ marginLeft: '0px' }} viewBox='0 0 519.479 519.479'>
                    <path d='M193.441,0h-75.484c-16.897,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.897,0,30.6-13.703,30.6-30.602V30.6C224.042,13.703,210.339,0,193.441,0z' />
                    <path d='M401.521,0h-75.484c-16.896,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.896,0,30.6-13.703,30.6-30.602V30.6C432.121,13.703,418.418,0,401.521,0z' />
                </Icon>
            </Circle>
            <Label>Pause</Label>
        </Container>
    ) : (
        <Container onClick={onClickPlay}>
            <Circle>
                <Icon width='40%' height='40%' y='-163' viewBox='0 0 163.861 163.861'>
                    <path d='M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z' />
                </Icon>
            </Circle>

            <Label>Play</Label>
        </Container>
    );
}

PlayPauseButton.propTypes = propTypes;
export default PlayPauseButton;
