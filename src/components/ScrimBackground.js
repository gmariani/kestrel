import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
// import { usePalette } from 'react-palette';

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
    /*opacity: 0.5;*/
    background-image: linear-gradient(245deg, hsla(var(--hue), 50%, 40%, 0) 35%, hsla(var(--hue), 50%, 40%, 1) 70%);
`;

const Art = styled(Layer)`
    background-image: linear-gradient(80deg, hsl(var(--hue), 50%, 40%) 10%, hsla(var(--hue), 50%, 40%, 0) 20%),
        ${({ src }) => `url(${src})`};
    background-size: cover;
    width: 85%;
    background-position: right;
    left: auto;
    opacity: 0.6;
`;

const Highlight = styled(Layer)`
    opacity: 0.65;
    background-image: radial-gradient(
        ellipse at left top,
        hsla(var(--hue), 100%, 60%, 1) 10%,
        hsla(var(--hue), 100%, 60%, 0) 70%
    );
`;

const Scrim = styled(Layer)`
    opacity: 0.1;
    background-image: linear-gradient(5deg, var(--black) 0%, transparent 50%),
        radial-gradient(ellipse at top right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20%);
`;

// function getHue(color) {
//     if (color === undefined) return 0;
//     const hex = color.substring(1);
//     const r = parseInt(hex.substring(0, 2), 16) / 255;
//     const g = parseInt(hex.substring(2, 4), 16) / 255;
//     const b = parseInt(hex.substring(4, 6), 16) / 255;
//     const max = Math.max(r, g, b);
//     const min = Math.min(r, g, b);
//     let h;
//     let s;
//     const l = (max + min) / 2;

//     if (max === min) {
//         h = 0;
//         s = 0; // achromatic
//     } else {
//         const d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch (max) {
//             case r:
//                 h = (g - b) / d + (g < b ? 6 : 0);
//                 break;
//             case g:
//                 h = (b - r) / d + 2;
//                 break;
//             case b:
//                 h = (r - g) / d + 4;
//                 break;
//             default:
//         }
//         h /= 6;
//     }

//     return [h, s, l];
//     // return h * 360;
// }

const propTypes = {
    hue: PropTypes.number,
    base: PropTypes.string,
    imagePath: PropTypes.string,
};

const ScrimBackground = ({ hue = -1, base = '#292C33', imagePath = '' }) => {
    // TODO use https://codepen.io/meodai/pen/RerqjG
    // TODO or use Vibrant.js to pull dominant color, usePalette doesn't seem accurate
    // const { data, loading, error } = usePalette(imagePath);
    // getHue(data.vibrant)
    return (
        <Container style={{ '--hue': hue > 0 ? hue : Math.random() * 360, '--base': base }}>
            <Base />
            {imagePath !== '' ? <Art src={imagePath} /> : null}
            <Gradient />
            {/* <Highlight /> */}
            <Scrim />
        </Container>
    );
};

ScrimBackground.propTypes = propTypes;
export default ScrimBackground;
