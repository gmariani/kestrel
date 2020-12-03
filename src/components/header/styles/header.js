import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const Background = styled.div`
    display: flex;
    flex-direction: column;
    background: url(${({ src }) => (src ? `../images/misc/${src}.jpg` : '../images/misc/home-bg.jpg')}) top left / cover
        no-repeat;
    @media (max-width: 1100px) {
        ${({ dontShowOnSmallViewPort }) => dontShowOnSmallViewPort && `background: none;`}
    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: end;
    align-items: end;
`;

export const Menu = styled.nav`
    column-gap: 2rem;
    display: flex;
    margin-bottom: 2rem;
`;

export const MenuLink = styled(ReachRouterLink)`
    color: rgba(255, 255, 255, 0.5);
    background-color: transparent;
    font-family: Tw Cen MT;
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 2rem;
    padding: 0.5rem;
    transition: all 0.3s;
    padding: 0.5rem 1rem;
    border-radius: 3px;

    &.selected {
        color: white;
        background-color: rgba(255, 255, 255, 0.25);
    }

    &:not([disabled]):active,
    &:not([disabled]):focus,
    &:not([disabled]).focused,
    &:not([disabled]):hover {
        color: black;
        background-color: white;
        text-decoration: none;
    }

    &:not([disabled]):focus,
    &:not([disabled]).focused {
        outline: 2px solid white;
    }
`;
