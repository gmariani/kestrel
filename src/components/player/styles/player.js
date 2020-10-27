import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    height: 100%;
    position: relative;
    width: 100%;

    & video::cue {
        background-color: transparent;
        color: white;
        font-family: Tw Cen MT;
        margin-bottom: 2rem;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
`;

export const Header = styled.div`
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: #eeeeee;
    display: flex;
    font-family: Tw Cen MT;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    height: 100px;
    justify-content: center;
    line-height: 52px;
    min-height: 100px;
    opacity: 0;
    position: absolute;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    top: 0;
    transition: opacity 0.3s;
    width: 100%;

    .show & {
        opacity: 1;
    }
`;

export const BufferContainer = styled.div`
    align-items: center;
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    height: 100%;
    justify-content: center;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
`;

export const Buffer = styled.div`
    color: white;
`;

export const Footer = styled.div`
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    color: #eeeeee;
    display: flex;
    font-family: Tw Cen MT;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    height: 100px;
    justify-content: space-between;
    line-height: 52px;
    min-height: 100px;
    opacity: 0;
    padding: 1.5rem 5%;
    position: absolute;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    width: 100%;

    .show & {
        opacity: 1;
    }
`;

export const Timer = styled.div`
    color: #eeeeee;
    font-family: Tw Cen MT;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 52px;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    user-select: none;
`;

export const Icon = styled.svg`
    fill: white;
    button:hover & {
        fill: black;
    }
`;
