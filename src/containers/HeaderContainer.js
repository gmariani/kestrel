import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FlexRow, Header, Logo, Menu, MenuLink } from '../components';
import * as ROUTES from '../constants/routes';
import { toName } from '../utils';

const propTypes = {
    hideMenu: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.string),
    selectedCategory: PropTypes.string,
};

function HeaderContainer({ hideMenu = false, categories, selectedCategory }) {
    const history = useHistory();

    return (
        <FlexRow justifyContent={hideMenu ? 'flex-end' : 'space-between'}>
            {!hideMenu && (
                <Menu focusKey='MENU'>
                    {categories.map((category) => {
                        const route = `/browse/${category}`;
                        return (
                            <MenuLink
                                onBecameFocused={() => {
                                    // console.log('MenuLinkFocusable.onBecameFocused', route);
                                    // Avoid loop by only pushing if not already same category
                                    if (category !== selectedCategory) history.push(route);
                                }}
                                focusKey={`MENU-${category.toUpperCase()}`}
                                key={category}
                                to={route}
                                selected={category === selectedCategory}>
                                {toName(category)}
                            </MenuLink>
                        );
                    })}
                </Menu>
            )}
            <Header>
                <Logo to={ROUTES.HOME} />
                {/* <ButtonLink to={ROUTES.SIGN_IN}>Sign In</ButtonLink> */}
            </Header>
        </FlexRow>
    );
}

HeaderContainer.propTypes = propTypes;
export default HeaderContainer;
