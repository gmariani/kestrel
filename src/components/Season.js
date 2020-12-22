import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
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
    title: PropTypes.string.isRequired,
    episodeCount: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

function Season({ title, episodeCount = 0, className = '', onClick }) {
    return (
        <Container className={className} onClick={onClick}>
            {capitalize(title)}
            <SubTitle>{`${episodeCount} ${episodeCount > 1 || episodeCount === 0 ? 'Episodes' : 'Episode'}`}</SubTitle>
        </Container>
    );
}

Season.propTypes = propTypes;
export default Season;
