import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const StyledButton = styled.button`
    background-color: ${({ theme }) => {
        switch (theme) {
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

    &:disabled {
        background-color: transparent;
    }

    &:not([disabled]):active,
    &:not([disabled]):focus,
    &:not([disabled]).focused,
    &:not([disabled]):hover {
        color: black;
        background-color: white;
    }
`;

export const StyledLink = styled(ReachRouterLink)`
    background-color: ${({ className }) => {
        switch (className) {
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
    text-decoration: none;

    &.player {
        height: 100%;
    }

    &:active,
    &:focus,
    &.focused,
    &:hover {
        color: black;
        background-color: white;
        text-decoration: none;
    }
`;
