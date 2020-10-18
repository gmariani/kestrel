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

export const Logo = styled.img``;

export const LogoLink = styled(ReachRouterLink)`
    margin-top: -2.5rem;
    padding: 0.5rem;
    &:focus {
        outline: 2px solid white;
    }
`;

export const Menu = styled.nav`
    column-gap: 2rem;
    display: flex;
    margin-bottom: 2rem;
`;

export const MenuLink = styled(ReachRouterLink)`
    color: #ffffff;
    font-family: Tw Cen MT;
    font-size: 3.125rem;
    font-style: normal;
    font-weight: normal;
    line-height: 54px;
    opacity: 0.5;
    padding: 0.5rem;
    transition: all 0.3s;

    &:active,
    &:hover,
    &:focus {
        color: #fff;
        opacity: 1;
        text-decoration: none;
    }
    &:focus {
        outline: 2px solid white;
    }
`;
