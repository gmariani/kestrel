import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
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
    opacity: 0.75;
`;
export const Gradient = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    background: ${({ compStyle }) =>
        'browse' === compStyle
            ? 'linear-gradient(128.4deg, #EE6B4D 18.25%, #FF3000 84.73%)'
            : 'linear-gradient(128.4deg, #ee6b4d 18.25%, rgba(255, 255, 255, 0) 84.73%), #3d5b81'};
    mix-blend-mode: ${({ compStyle }) => ('browse' === compStyle ? 'lighten' : 'normal')};
    opacity: ${({ compStyle }) => ('browse' === compStyle ? '0.5' : '0.8')};
`;
