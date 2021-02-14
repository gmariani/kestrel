import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

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
    background-image: linear-gradient(245deg, hsla(var(--hue), 50%, 40%, 0) 35%, hsla(var(--hue), 50%, 40%, 1) 70%),
        radial-gradient(farthest-side at 73% 21%, transparent, hsl(var(--hue), 50%, 40%));
`;

const Art = styled(Layer)`
    background-image: var(--src);
    background-size: cover;
    width: 85%;
    background-position: right;
    left: auto;
    /*opacity: 0.6;*/
`;

const Scrim = styled(Layer)`
    opacity: 0.1;
    background-image: linear-gradient(5deg, var(--black) 0%, transparent 50%),
        radial-gradient(ellipse at top right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20%);
`;

const propTypes = {
    hue: PropTypes.number,
    base: PropTypes.string,
    imagePath: PropTypes.string,
};

const ScrimBackground = ({ hue = -1, base = '#292C33', imagePath = '' }) => {
    return (
        <Container style={{ '--hue': hue > 0 ? hue : Math.random() * 360, '--base': base }}>
            <Base />
            {imagePath !== '' && <Art style={{ '--src': `url(${imagePath})` }} />}
            <Gradient />
            <Scrim />
        </Container>
    );
};

ScrimBackground.propTypes = propTypes;
export default ScrimBackground;
