import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    row-gap: 1.5rem;
    overflow: hidden;
    padding-right: 1.5rem;
    padding-left: 1.1rem;
`;

export const EpisodeContainer = styled.div`
    border-radius: 25px;
    display: flex;
    min-height: 185px;
    background-color: black;
    opacity: 0.75;
    transform: scale(1);
    transition: all 0.3s;

    &.selected {
        background-color: white;
        opacity: 1;
        transform: scale(1.05);
    }

    &:hover {
        transform: scale(1.05);
    }
`;
export const Thumbnail = styled.div`
    width: 30%;
    height: 100%;
    background-color: red;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
`;
export const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    color: rgba(184, 183, 183, 1);

    .selected > div > & {
        color: rgba(85, 85, 85, 1);
    }
`;
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 2rem 2rem;
    flex: 1;
`;
export const ProgressTrack = styled.div`
    height: 5px;
    width: 100%;
    background-color: #c4c4c4;
`;

export const ProgressBar = styled.div`
    height: 5px;
    width: ${({ value }) => `${value}%;`};
    background: linear-gradient(90deg, #3b79c7 0%, #3d5b81 100.07%);
`;

export const Title = styled.div`
    font-size: 1.875rem;
    color: white;
    flex-grow: 1;
    .selected > div > & {
        color: black;
    }
`;
export const Counter = styled.div``;
export const Timer = styled.div``;
