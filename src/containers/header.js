import React from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function HeaderContainer({ children, categories, selected = '', ...restProps }) {
    console.log(categories);

    return (
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} src={logo} alt='Kestrel' width='200' height='45' />
                {/* <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink> */}
            </Header.Frame>
            <Header.Menu>
                <Header.MenuLink to={ROUTES.HOME}>TV</Header.MenuLink>
                <Header.MenuLink to={ROUTES.HOME}>Movies</Header.MenuLink>
                <Header.MenuLink to={ROUTES.HOME}>Animation</Header.MenuLink>
                <Header.MenuLink to={ROUTES.HOME}>Kids</Header.MenuLink>
            </Header.Menu>
            {children}
        </Header>
    );
}
