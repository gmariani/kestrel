import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { FlexRowFocusable, Header, Logo, Menu, MenuLink } from '../components';
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
        <FlexRowFocusable
            style={{
                'background-color': hideMenu ? 'transparent' : '#182848',
                'padding-left': hideMenu ? 'initial' : '2rem',
                'padding-right': hideMenu ? 'initial' : '2rem',
            }}
            justifyContent={hideMenu ? 'flex-end' : 'space-between'}>
            {!hideMenu && (
                <Menu focusKey='MENU'>
                    <MenuLink
                        onBecameFocused={() => {
                            // console.log('MenuLinkFocusable.onBecameFocused', route);
                            // Avoid loop by only pushing if not already same category
                            if (selectedCategory !== 'search') history.push(`/search`);
                        }}
                        focusKey='MENU-SEARCH'
                        key='search'
                        to='/search'
                        selected={selectedCategory === 'search'}>
                        <FaSearch />
                    </MenuLink>
                    {categories.map((category) => {
                        const route = `/${category}`;
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
                <Logo
                    to={ROUTES.HOME}
                    onEnterPress={() => {
                        // console.log('onEnterPress Logo');
                        history.push(ROUTES.HOME);
                    }}
                />
                {/* <ButtonLink to={ROUTES.SIGN_IN}>Sign In</ButtonLink> */}
            </Header>
        </FlexRowFocusable>
    );
}

HeaderContainer.propTypes = propTypes;
export default HeaderContainer;
