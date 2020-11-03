import styled from 'styled-components/macro';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: relative;
`;
export const Title = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    color: white;
    font-family: Tw Cen MT;
    font-size: 1.5rem;
    font-weight: 600;
    max-width: 300px;
    min-width: 150px;
    opacity: 1;
    padding: 0.5rem;
    text-align: left;
    transition: all 0.3s;
    user-select: none;

    &:hover,
    &:focus,
    &.focused {
        border: 2px solid white;
    }
`;
export const SubTitle = styled.span`
    display: block;
    font-size: 1rem;
    color: ${({ isSelected }) => (isSelected ? 'white' : 'transparent')};
`;
