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

export const EndContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: black;
    padding: 100px;
    position: absolute;
    top: 0;
    left: 0;
`;
export const EndDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
`;
export const EndTitle = styled.h1`
    font-weight: normal;
    font-size: 8rem;
    line-height: 5rem;
    margin-bottom: 1rem;
    color: #ffffff;
`;
export const EndSubTitle = styled.h2`
    font-weight: normal;
    font-size: 2rem;
    color: white;
`;
export const EndControls = styled.div`
    display: flex;
    margin-top: 1rem;
    column-gap: 2rem;
`;

export const Preview = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 50%;
`;
export const PreviewThumbnail = styled.img`
    border-radius: 20px;
    width: 100%;
    height: auto;
`;
export const PreviewTitle = styled.h3`
    font-size: 2rem;
    color: #fff;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    margin: 0;
    text-align: center;
    font-weight: normal;
`;
