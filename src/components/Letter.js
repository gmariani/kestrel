import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const Container = styled.div`
    text-transform: uppercase;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    font-size: 3rem;
    padding: 0.5rem;
    font-weight: 400;
    min-width: 4rem;
    height: 4rem;
    user-select: none;
    cursor: pointer;
    /*border: 1px solid red;*/
    position: relative;
    opacity: 0.75;

    @media screen and (max-width: 800px) and (orientation: landscape) {
        padding: 0.1rem 0.5rem;
        font-size: 2rem;
        height: 3rem;
    }

    & span {
        position: relative;
        display: block;
        line-height: 3rem;
        text-align: center;
        width: 100%;
        /*border: 1px solid green;*/
    }

    &.selected,
    &:hover {
        transform: scale(1.25, 1.25);
        opacity: 1;
    }
`;

const propTypes = {
    key: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    children: PropTypes.node,
};

function Letter({ key, label, children, value, onClick, selected }) {
    const returnValue = value ?? label;
    return (
        <Container
            key={key}
            className={selected ? 'selected' : ''}
            onClick={() => {
                onClick(returnValue);
            }}>
            <span>{children ?? label}</span>
        </Container>
    );
}

Letter.propTypes = propTypes;
export default withFocusable()(Letter);
