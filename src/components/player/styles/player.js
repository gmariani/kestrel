import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;

    & video::cue {
        font-family: Tw Cen MT;
        color: white;
        background-color: transparent;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
`;

export const Header = styled.div`
    background: rgba(0, 0, 0, 0.5);
    color: #eeeeee;
    display: flex;
    font-family: Tw Cen MT;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 52px;
    height: 100px;
    min-height: 100px;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    width: 100%;
    position: absolute;
    top: 0;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;

    .show & {
        opacity: 1;
    }
`;

export const Footer = styled.div`
    background: rgba(0, 0, 0, 0.5);
    color: #eeeeee;
    display: flex;
    font-family: Tw Cen MT;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 52px;
    height: 100px;
    min-height: 100px;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    width: 100%;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 5%;
    opacity: 0;
    transition: opacity 0.3s;

    .show & {
        opacity: 1;
    }
`;

export const Timer = styled.div`
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    line-height: 52px;

    color: #eeeeee;

    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
`;

export const Icon = styled.svg`
    fill: white;
    button:hover & {
        fill: black;
    }
`;
