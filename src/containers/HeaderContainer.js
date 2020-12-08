import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Logo } from '../components';
import * as ROUTES from '../constants/routes';

const propTypes = {
    hasFocus: PropTypes.bool,
    hideMenu: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.object),
    selectedCategory: PropTypes.string,
};

function HeaderContainer({ hasFocus, hideMenu = false, categories, selectedCategory }) {
    const history = useHistory();
    useEffect(() => {
        const onKeyDown = (event) => {
            if (!hasFocus) return;

            const keyCode = event.which || event.keyCode;
            // Convert the category slug to the array index so we can add/subtract
            const findCategoryIndex = () => {
                const foundCategories = categories
                    .map((category, i) => ({ slug: category.slug, index: i }))
                    .filter((category) => category.slug === selectedCategory);
                return foundCategories.length ? foundCategories[0].index : 0;
            };
            const foundIndex = findCategoryIndex();

            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 37) {
                    history.push(
                        `${ROUTES.BROWSE}${categories[(foundIndex - 1 + categories.length) % categories.length].slug}`
                    );
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

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [hasFocus, categories, history, selectedCategory]);

    return (
        <Header>
            <Header.Frame>
                <Logo to={ROUTES.HOME} />
                {/* <Header.ButtonLink to={ROUTES.SIGN_IN}>Sign In</Header.ButtonLink> */}
            </Header.Frame>
            {!hideMenu ? (
                <Header.Menu>
                    {categories.map((category) => (
                        <Header.MenuLink
                            key={category.slug}
                            to={`${ROUTES.BROWSE}${category.slug}`}
                            // prettier-ignore
                            className={`${category.slug === selectedCategory ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}>
                            {category.name}
                        </Header.MenuLink>
                        // <Link
                        //     key={category.slug}
                        //     to={`${ROUTES.BROWSE}${category.slug}`}
                        //     className={category.slug === selectedCategory ? 'selected' : ''}>
                        //     {category.name}
                        // </Link>
                    ))}
                </Header.Menu>
            ) : null}
        </Header>
    );
}

HeaderContainer.propTypes = propTypes;
export default HeaderContainer;
