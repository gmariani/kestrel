import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export function HeaderContainer({ children, hasFocus = false, categories = [], selectedCategory = '', ...restProps }) {
    const history = useHistory();
    const onKeyDown = (event) => {
        if (!hasFocus) return;

        console.log('HeaderContainer.onKeyDown');
        const keyCode = event.which || event.keyCode;
        const findCategoryIndex = () => {
            const foundCategories = categories
                .map((category, i) => ({ slug: category.slug, index: i }))
                .filter((category) => category.slug === selectedCategory);
            return foundCategories.length ? foundCategories[0].index : 0;
        };
        const foundIndex = findCategoryIndex();
        console.log(foundIndex);

        if (keyCode >= 37 && keyCode <= 41) {
            // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
            if (keyCode === 37) {
                history.push(`${ROUTES.BROWSE}${categories[(foundIndex - 1) % categories.length].slug}`);
            } else if (keyCode === 38) {
                //
            } else if (keyCode === 39) {
                history.push(`${ROUTES.BROWSE}${categories[(foundIndex + 1) % categories.length].slug}`);
            } else if (keyCode === 40) {
                //
            }
            event.preventDefault();
        }
    };
    return (
        <Header onKeyDown={onKeyDown} {...restProps}>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} src={logo} alt='Kestrel' width='200' height='45' />
                {/* <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink> */}
            </Header.Frame>
            <Header.Menu>
                {categories.map((category, i) => (
                    <Header.MenuLink
                        key={i}
                        to={`${ROUTES.BROWSE}${category.slug}`}
                        className={category.slug === selectedCategory ? 'selected' : ''}>
                        {category.name}
                    </Header.MenuLink>
                ))}
            </Header.Menu>
            {children}
        </Header>
    );
}
