import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    column-gap: 2rem;
`;
export const Seasons = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
    border-left: 2px solid rgba(255, 255, 255, 0.5);
`;
export const SeasonTitle = styled.div`
    background: #7a7a7a;
    opacity: 1;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    border-radius: 50px;
    min-height: 30px;
    min-width: 30px;
    max-width: 30px;
    padding: 0;
    transform: translate(-50%, -50%);
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 27px;
    transition: all 0.3s;

    & div {
        transition: all 0.3s;
        max-width: 0;
        color: rgba(255, 255, 255, 0);
        white-space: nowrap;
        user-select: none;
    }

    &.selected {
        min-height: 45px;
        min-width: 45px;
        max-width: 1000px;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
    &.selected div {
        color: rgba(255, 255, 255, 1);
        max-width: 1000px;
    }
`;
export const SeasonBar = styled.div``;
export const Info = styled.div``;
export const Episodes = styled.div``;
export const EpisodeMeta = styled.div``;
export const Thumbnail = styled.div``;
export const ProgressBar = styled.div``;
export const Episode = styled.div``;
export const EpisodeTitle = styled.div``;
export const EpisodeCounter = styled.div``;
export const EpisodeTimer = styled.div``;
