import styled from 'styled-components/macro';
export const StyledButton = styled.button`
    background-color: ${({ btnStyle }) => ('primary' === btnStyle ? '#ee6b4d' : 'rgba(255, 255, 255, 0.5)')};
    border-radius: 1rem;
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: normal;
    font-size: 2.5rem;
    line-height: 44px;
    color: #ffffff;
    border: none;
    padding: 1rem 6rem;
    transition: all 0.3s;
    &:active,
    &:focus,
    &:hover {
        background-color: white;
        color: black;
    }
`;
