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

export const Overlay = styled.div`
    display: flex;
    background: rgba(0, 0, 0, 0.5);
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    position: absolute;
    /*opacity: 0;*/
    transition: opacity 0.3s;
    padding: 4rem;
    justify-content: space-between;
    flex-direction: column;

    .show & {
        opacity: 1;
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
