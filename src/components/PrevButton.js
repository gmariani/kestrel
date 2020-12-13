import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.button`
    border: none;
    background: none;
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
    transform: scaleX(-1);
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
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

function PrevButton({ label = 'Start Over', disabled = false, onClick }) {
    // const style = { opacity: disabled ? 0.5 : 1 };
    return (
        <Container onClick={onClick}>
            <Circle>
                <Icon width='40%' height='40%' y='-163' viewBox='0 0 163.861 163.861'>
                    <path d='M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z' />
                </Icon>
            </Circle>

            <Label>{label}</Label>
        </Container>
    );
}

PrevButton.propTypes = propTypes;
export default PrevButton;
