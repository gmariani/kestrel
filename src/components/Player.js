import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    height: 100%;
    position: relative;
    width: 100%;

    & video::cue {
        background-color: transparent;
        color: white;
        font-family: Verdana;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
    & video::cue(i) {
        color: yellow;
    }
    & video::cue(b) {
        color: red;
    }
`;

const propTypes = {
    children: PropTypes.node,
    onMouseMove: PropTypes.func,
    onKeyDown: PropTypes.func,
};

function Player({ children, onMouseMove, onKeyDown }) {
    return (
        <Container onMouseMove={onMouseMove} onKeyDown={onKeyDown}>
            {children}
        </Container>
    );
}
Player.propTypes = propTypes;
export default Player;
