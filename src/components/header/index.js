import React from 'react';
import { Container, Background, Menu, MenuLink, Logo, LogoLink } from './styles/header';

export default function Header({ bg = true, children, ...restProps }) {
    return bg ? <Background {...restProps}>{children}</Background> : children;
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
    return (
        <LogoLink to={to}>
            <Logo {...restProps} />
        </LogoLink>
    );
};

Header.Menu = function HeaderMenu({ children, ...restProps }) {
    return <Menu {...restProps}>{children}</Menu>;
};

Header.MenuLink = function HeaderMenuLink({ children, ...restProps }) {
    return <MenuLink {...restProps}>{children}</MenuLink>;
};
