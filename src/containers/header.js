import React from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function HeaderContainer({ children, categories, selectedCategory = '', ...restProps }) {
    return (
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} src={logo} alt='Kestrel' width='200' height='45' />
                {/* <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink> */}
            </Header.Frame>
            <Header.Menu>
                {categories.map((category, i) => {
                    return (
                        <Header.MenuLink
                            key={i}
                            to={`${ROUTES.BROWSE}${category.slug}`}
                            selected={category.slug === selectedCategory ? 1 : 0}>
                            {category.name}
                        </Header.MenuLink>
                    );
                })}
            </Header.Menu>
            {children}
        </Header>
    );
}
