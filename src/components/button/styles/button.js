import styled from 'styled-components/macro';
export const StyledButton = styled.button`
    background-color: ${({ btnStyle }) => {
        switch (btnStyle) {
            case 'secondary':
                return 'transparent';
            case 'primary':
            default:
                return 'rgba(255, 255, 255, 0.25)';
        }
    }};
    border-radius: 0.5rem;
    border-color: transparent;
    color: #fff;
    font-family: Tw Cen MT;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: normal;
    line-height: 44px;
    padding: 1rem 6rem;
    transition: all 0.3s;

    &.player {
        height: 100%;
    }

    &:active,
    &:focus,
    &:hover {
        color: black;
        background-color: white;
    }
`;
