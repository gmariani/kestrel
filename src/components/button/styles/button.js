import styled from 'styled-components/macro';
export const StyledButton = styled.button`
    background-color: ${({ btnStyle }) => {
        switch (btnStyle) {
            case 'primary':
            case 'orange':
                return '#ee6b4d'; // orange
            case 'blue':
                return '#56CCF2'; // blue
            case 'secondary':
                return '#555555'; // grey
            default:
                return 'rgba(255, 255, 255, 0.5)';
        }
    }};
    border-radius: 1rem;
    font-family: Tw Cen MT;
    font-style: normal;
    font-weight: normal;
    font-size: 2.5rem;
    line-height: 44px;
    color: ${({ btnStyle }) => {
        switch (btnStyle) {
            case 'primary':
            case 'orange':
                return '#fff';
            case 'blue':
                return '#000';
            case 'secondary':
                return '#fff';
            default:
                return '#fff';
        }
    }};
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
