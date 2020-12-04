import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { capitalize } from '../utils';

const Container = styled.button`
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    color: white;
    font-family: Tw Cen MT;
    font-size: 1.5rem;
    font-weight: 600;
    max-width: 300px;
    min-width: 150px;
    opacity: 1;
    padding: 0.5rem;
    text-align: left;
    transition: all 0.3s;
    user-select: none;

    &:hover,
    &:focus,
    &.focused {
        border: 2px solid white;
    }
`;

const SubTitle = styled.span`
    display: block;
    font-size: 1rem;
    color: transparent;
    &.selected {
        color: white;
    }
`;

const propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    isSelected: PropTypes.bool,
    isFocused: PropTypes.bool,
    onClickSeason: PropTypes.func,
};

function Season({ index = 0, title, subTitle = '', isSelected = false, isFocused = false, onClickSeason }) {
    const classSelected = isSelected ? 'selected' : '';
    const classFocused = isSelected && isFocused ? 'focused' : '';
    return (
        <Container className={`${classSelected} ${classFocused}`} onClick={() => onClickSeason(index)}>
            {capitalize(title)}
            <SubTitle className={classSelected}>{subTitle}</SubTitle>
        </Container>
    );
}

Season.propTypes = propTypes;
export default Season;
