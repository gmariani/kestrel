import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { FaPlay, FaCog, FaInfo, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const Container = styled.button`
    border: none;
    background: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;

    ${(props) => {
        if (props.disabled) {
            return 'pointer-events:none;opacity:0.5';
        }
        return '';
    }}
`;

const Circle = styled.div`
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: 100px;
    width: 50px;
    height: 50px;
    transition: background-color 0.3s;

    & svg {
        margin-top: -5px;
        width: 45%;
        height: auto;
        fill: white;
        transition: fill 0.3s;
    }

    &:hover {
        background-color: white;
    }
    &:hover svg {
        fill: rgba(0, 0, 0, 0.75);
    }
`;

const Label = styled.div`
    color: white;
    font-size: 1rem;
`;

const propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

function IconButton({ label = 'Start Over', icon = 'play', disabled = false, onClick }) {
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
        <Container disabled={disabled} onClick={onClick}>
            <Circle>{getIcon(icon)}</Circle>
            <Label>{label}</Label>
        </Container>
    );
}

IconButton.propTypes = propTypes;
export default IconButton;
