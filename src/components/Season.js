import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { capitalize } from '../utils';

const SubTitle = styled.span`
    display: block;
    font-size: 1rem;
    color: transparent;
`;

const Container = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    max-width: 300px;
    min-width: 150px;
    opacity: 1;
    padding: 0.5rem;
    text-align: left;
    transition: all 0.3s;
    user-select: none;

    &:active,
    &:focus,
    &.focused.selected,
    &:hover {
        border: 2px solid white;
    }

    &:active ${SubTitle}, &:focus ${SubTitle}, &.focused.selected ${SubTitle}, &:hover ${SubTitle} {
        color: white;
    }
`;

const propTypes = {
    focused: PropTypes.bool,
    selected: PropTypes.bool,
    title: PropTypes.string.isRequired,
    episodeCount: PropTypes.number,
    onClick: PropTypes.func,
};

function Season({ focused, selected, title, episodeCount = 0, onClick }) {
    // console.log('Season', `focused: ${focused}`, `selected: ${selected}`, realFocusKey);
    return (
        <Container className={`season ${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`} onClick={onClick}>
            {capitalize(title)}
            <SubTitle>{`${episodeCount} ${episodeCount > 1 || episodeCount === 0 ? 'Episodes' : 'Episode'}`}</SubTitle>
        </Container>
    );
}

Season.propTypes = propTypes;
export default withFocusable()(Season);
