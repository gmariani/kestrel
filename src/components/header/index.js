import React from 'react';
import PropTypes from 'prop-types';
import { Container, Background, Menu, MenuLink, Logo, LogoLink } from './styles/header';
import logo from '../../logo.svg';

function Header({ bg = true, children, onKeyDown }) {
    return bg ? <Background onKeyDown={onKeyDown}>{children}</Background> : children;
}
Header.propTypes = {
    children: PropTypes.node.isRequired,
    bg: PropTypes.bool,
    onKeyDown: PropTypes.func,
};
Header.defaultProps = {
    bg: true,
    onKeyDown: null,
};

Header.Frame = function HeaderFrame({ children }) {
    return <Container>{children}</Container>;
};
Header.Frame.propTypes = {
    children: PropTypes.node.isRequired,
};

Header.Logo = function HeaderLogo({ to }) {
    return (
        <LogoLink to={to}>
            <Logo src={logo} alt='Kestrel' width='200' height='45' />
        </LogoLink>
    );
};
Header.Logo.propTypes = {
    to: PropTypes.string,
};
Header.Logo.defaultProps = {
    to: '/',
};

Header.Menu = function HeaderMenu({ children }) {
    return <Menu>{children}</Menu>;
};
Header.Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

Header.MenuLink = function HeaderMenuLink({ children, to, className }) {
    return (
        <MenuLink to={to} className={className}>
            {children}
        </MenuLink>
    );
};
Header.MenuLink.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
};
Header.MenuLink.defaultProps = {
    className: '',
};

export default Header;
