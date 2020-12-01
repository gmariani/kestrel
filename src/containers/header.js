import React from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';
import { useHistory } from 'react-router-dom';

export function HeaderContainer({ children, hasFocus = false, categories = [], selectedCategory = '', ...restProps }) {
    const history = useHistory();
    const onKeyDown = (event) => {
        if (!hasFocus) return;

        console.log('HeaderContainer.onKeyDown');
        const keyCode = event.which || event.keyCode;
        const findCategoryIndex = (selectedCategory) => {
            const foundCategories = categories
                .map((category, i) => {
                    return { slug: category.slug, index: i };
                })
                .filter((category, i) => category.slug === selectedCategory);
            return foundCategories.length ? foundCategories[0].index : 0;
        };
        const foundIndex = findCategoryIndex(selectedCategory);
        console.log(foundIndex);

        if (keyCode >= 37 && keyCode <= 41) {
            // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
            if (37 === keyCode) {
                history.push(`${ROUTES.BROWSE}${categories[(foundIndex - 1) % categories.length].slug}`);
            } else if (38 === keyCode) {
                //
            } else if (39 === keyCode) {
                history.push(`${ROUTES.BROWSE}${categories[(foundIndex + 1) % categories.length].slug}`);
            } else if (40 === keyCode) {
                //
            }
            event.preventDefault();
        }
    };
    return (
        <Header onKeyDown={onKeyDown}>
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
                            className={category.slug === selectedCategory ? 'selected' : ''}>
                            {category.name}
                        </Header.MenuLink>
                    );
                })}
            </Header.Menu>
            {children}
        </Header>
    );
}
