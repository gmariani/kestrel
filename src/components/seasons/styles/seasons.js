import styled from 'styled-components/macro';

export const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
    row-gap: 3rem;
    width: 200px;
`;
export const Title = styled.div`
    background: #7a7a7a;
    opacity: 1;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    border-radius: 50px;
    min-height: 30px;
    min-width: 30px;
    max-width: 30px;
    padding: 0;
    /*transform: translate(-50%, -50%);*/
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 27px;
    transition: all 0.3s;
    z-index: 5;

    & div {
        transition: all 0.3s;
        max-width: 0;
        color: rgba(255, 255, 255, 0);
        white-space: nowrap;
        user-select: none;
    }

    &:hover,
    &.selected {
        min-height: 45px;
        min-width: 45px;
        max-width: 1000px;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
    &:hover div,
    &.selected div {
        color: rgba(255, 255, 255, 1);
        max-width: 1000px;
    }
`;
export const Bar = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    position: absolute;
    width: 2px;
    z-index: 1;
`;
