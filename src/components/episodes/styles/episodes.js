import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    row-gap: 1.5rem;
    overflow: hidden;
    padding-right: 1.5rem;
    padding-left: 1.1rem;
    position: relative;
`;

export const Fade = styled.div`
    height: 200px;
    width: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50.25%, #000000 92.79%);
    position: absolute;
    z-index: 10;
    bottom: 0;
    margin-left: -1.3rem;
    pointer-events: none;
`;

export const EpisodeContainer = styled.div`
    border-radius: 25px;
    display: flex;
    min-height: 185px;
    background-color: black;
    opacity: 0.75;
    transform: scale(1);
    transition: all 0.3s;
    cursor: pointer;

    &.selected {
        background-color: white;
        opacity: 1;
        transform: scale(1.05);
    }

    &:hover {
        transform: scale(1.05);
        background-color: white;
    }
    &.selected .episode__meta,
    &:hover .episode__meta {
        color: rgba(85, 85, 85, 1);
    }
    &.selected .episode__title,
    &:hover .episode__title {
        color: black;
    }
`;
export const Thumbnail = styled.div`
    width: 30%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    background-image: ${({ src }) => `url(${src});`};
    background-size: cover;
    background-position: center;
`;
export const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    color: rgba(184, 183, 183, 1);
    user-select: none;
`;
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 2rem 2rem;
    flex: 1;
`;

export const Title = styled.div`
    font-size: 1.875rem;
    color: white;
    flex-grow: 1;
    user-select: none;
`;
export const Counter = styled.div``;
export const Timer = styled.div``;
