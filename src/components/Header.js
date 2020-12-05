import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

const Background = styled.div`
    display: flex;
    flex-direction: column;
    background: url(${({ src }) => (src ? `../images/misc/${src}.jpg` : '../images/misc/home-bg.jpg')}) top left / cover
        no-repeat;
    @media (max-width: 1100px) {
        ${({ dontShowOnSmallViewPort }) => dontShowOnSmallViewPort && `background: none;`}
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: end;
    align-items: end;
`;

const Menu = styled.nav`
    column-gap: 2rem;
    display: flex;
    margin-bottom: 2rem;
`;

const MenuLink = styled(ReachRouterLink)`
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
    &:not([disabled]).focused.selected,
    &:not([disabled]):hover {
        color: black;
        background-color: white;
        text-decoration: none;
    }

    &:not([disabled]):focus {
        outline: 2px solid white;
    }
`;

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
