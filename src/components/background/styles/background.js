import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 6.25rem;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
`;
export const Shadow = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    background: radial-gradient(70.79% 70.79% at 51.61% 17.18%, rgba(0, 0, 0, 0) 0%, #000000 100%);
    mix-blend-mode: normal;
    background: radial-gradient(70.79% 70.79% at 51.61% 17.18%, rgba(0, 0, 0, 0) 0%, #000000 100%);
    opacity: ${({ opacity }) => opacity};
`;

export const Gradient = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    background: ${({ startColor, endColor }) => `linear-gradient(128.4deg, ${startColor} 18.25%, ${endColor} 84.73%)`};
    mix-blend-mode: ${({ blendMode }) => blendMode};
    opacity: ${({ opacity }) => opacity};
`;

export const Image = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    background-image: ${({ src }) => `url(${src})`};
    background-position: cover;
    mix-blend-mode: ${({ blendMode }) => blendMode};
    opacity: ${({ opacity }) => opacity};
`;
