import React from 'react';
import PropTypes from 'prop-types';
import { Container, Background, Menu, MenuLink } from './styles/header';

function Header({ bg = true, children, onKeyDown }) {
    return bg ? <Background onKeyDown={onKeyDown}>{children}</Background> : children;
}
Header.propTypes = {
    children: PropTypes.node.isRequired,
    bg: PropTypes.bool,
    onKeyDown: PropTypes.func,
};

Header.Frame = function HeaderFrame({ children }) {
    return <Container>{children}</Container>;
};
Header.Frame.propTypes = {
    children: PropTypes.node.isRequired,
};

Header.Menu = function HeaderMenu({ children }) {
    return <Menu>{children}</Menu>;
};
Header.Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

Header.MenuLink = function HeaderMenuLink({ children, to, className = '' }) {
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

export default Header;
