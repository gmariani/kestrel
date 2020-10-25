import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    row-gap: 1.5rem;
    overflow: hidden;
    padding-right: 1rem;
    padding-left: 1rem;
    position: relative;
`;

export const Fade = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50.25%, #000000 92.79%);
    bottom: 0;
    height: 200px;
    left: 0;
    pointer-events: none;
    position: absolute;
    width: 100%;
    z-index: 10;
`;

export const EpisodeContainer = styled.button`
    background-color: black;
    border-width: 0;
    border-color: transparent;
    border-radius: 2rem;
    cursor: pointer;
    display: flex;
    min-height: 175px;
    opacity: 0.75;
    padding: 0;
    text-align: left;
    transform: scale(1);
    transition: all 0.3s;

    &.selected {
        opacity: 1;
    }

    &.selected,
    &:focus,
    &:hover {
        transform: scale(1.025);
        background-color: white;
    }

    &.selected .episode__meta,
    &:focus .episode__meta,
    &:hover .episode__meta {
        color: rgba(85, 85, 85, 1);
    }

    &.selected .episode__title,
    &:focus .episode__title,
    &:hover .episode__title {
        color: black;
    }
`;
export const Thumbnail = styled.div`
    width: 30%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
    background-image: ${({ src }) => `url(${src});`};
    background-size: cover;
    background-position: center;
    /* Fix slight pixel render error */
    transform: translateX(-1px);
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
