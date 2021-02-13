import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { FaPlay, FaCog, FaInfo, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const Circle = styled.div`
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: 100px;
    width: 50px;
    height: 50px;
    transition: background-color 0.3s;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 2rem;

    & svg {
        width: 45%;
        height: auto;
        max-height: 45%;
        fill: white;
        transition: fill 0.3s;
    }
`;

const Label = styled.div`
    color: white;
    font-size: 1.2rem;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
`;

const Container = styled.button`
    border: none;
    background: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;

    &:focus {
        outline: none;
    }

    &:disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    &:not([disabled]):active
        ${Circle},
        &:not([disabled]):focus
        ${Circle},
        &:not([disabled]).focused.selected
        ${Circle},
        &:not([disabled]):hover
        ${Circle} {
        background-color: white;
    }
    &:not([disabled]):active ${Circle} svg,
    &:not([disabled]):focus ${Circle} svg,
    &:not([disabled]).focused.selected ${Circle} svg,
    &:not([disabled]):hover ${Circle} svg {
        fill: rgba(0, 0, 0, 0.75);
    }
`;

const propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
};

function IconButton({ label = 'Start Over', icon = 'play', disabled = false, focused, selected, onClick }) {
    function getIcon(type) {
        switch (type) {
            case 'pause':
                return <FaPause />;
            case 'next':
                return <FaStepForward />;
            case 'prev':
                return <FaStepBackward />;
            case 'cog':
                return <FaCog />;
            case 'info':
                return <FaInfo />;
            case 'play':
            default:
                return <FaPlay style={{ marginLeft: '4px' }} />;
        }
    }
    // const style = { opacity: disabled ? 0.5 : 1 };
    return (
        <Container
            disabled={disabled}
            className={`${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`}
            onClick={onClick}>
            <Circle>{getIcon(icon)}</Circle>
            <Label>{label}</Label>
        </Container>
    );
}

IconButton.propTypes = propTypes;
export default withFocusable()(IconButton);
