import React from 'react';
import { Container, Background, Menu, MenuLink, Logo, LogoLink } from './styles/header';
import logo from '../../logo.svg';

export default function Header({ bg = true, children, ...restProps }) {
    return bg ? <Background {...restProps}>{children}</Background> : children;
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
};

Header.Logo = function HeaderLogo({ to }) {
    return (
        <LogoLink to={to}>
            <Logo src={logo} alt='Kestrel' width='200' height='45' />
        </LogoLink>
    );
};

Header.Menu = function HeaderMenu({ children, ...restProps }) {
    return <Menu {...restProps}>{children}</Menu>;
};

Header.MenuLink = function HeaderMenuLink({ children, ...restProps }) {
    return <MenuLink {...restProps}>{children}</MenuLink>;
};
