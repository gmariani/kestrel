import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';

const moving = keyframes`
    0% {
        background-position: 50% 50%;
    }
    50% {
        background-position: 50% 80%;
    }
    100% {
        background-position: 50% 50%;
    }
`;

const Container = styled.div`
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: hsla(var(--hue), 50%, 40%, 0.5);
`;

const Layer = styled.div`
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
`;

const Base = styled(Layer)`
    background-color: var(--base);
`;

const Gradient = styled(Layer)`
    /*
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    */
    background-image: linear-gradient(
        180deg,
        hsla(var(--hue), 50%, 40%, 0) var(--split1),
        hsla(var(--hue), 50%, 40%, 1) var(--split2)
    );
    background-size: 400% 400%;
    /*animation: ${moving} 60s ease-in-out infinite;*/
    background-position: 50% 60%;
`;

const Art = styled(Layer)`
    background-image: ${({ src }) => `url(${src})`};
    background-size: cover;
    width: 100%;
    background-position: top;
    opacity: 0.6;
`;

const propTypes = {
    hue: PropTypes.number,
    base: PropTypes.string,
    split: PropTypes.number,
    imagePath: PropTypes.string,
};

const FadeBackground = ({ hue = -1, base = '#292C33', split = 70, imagePath = '' }) => {
    return (
        <Container style={{ '--hue': hue > 0 ? hue : 0, '--base': base }}>
            <Base />
            {imagePath !== '' && <Art src={imagePath} />}
            <Gradient style={{ '--split1': `${split / 2}%`, '--split2': `${split}%` }} />
        </Container>
    );
};

FadeBackground.propTypes = propTypes;
export default FadeBackground;
