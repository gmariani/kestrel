import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
    background-color: ${({ theme }) => {
        switch (theme) {
            case 'secondary':
                return 'transparent';
            case 'primary':
            default:
                return 'rgba(255, 255, 255, 0.25)';
        }
    }};
    border-radius: 0.5rem;
    border-color: transparent;
    color: #fff;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: normal;
    line-height: 44px;
    padding: 1rem 6rem;
    transition: all 0.3s;

    &.player {
        height: 100%;
    }

    &:disabled {
        background-color: transparent;
        color: rgba(255, 255, 255, 0.25);
    }

    &:not([disabled]):active,
    &:not([disabled]):focus,
    &:not([disabled]).focused,
    &:not([disabled]):hover {
        color: black;
        background-color: white;
    }
`;

const propTypes = {
    children: PropTypes.node,
    theme: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

function Button({ children, theme = 'default', className = '', type = 'button', onClick, disabled = false }) {
    return (
        <StyledButton theme={theme} type={type} className={className} onClick={onClick} disabled={disabled}>
            {children}
        </StyledButton>
    );
}
Button.propTypes = propTypes;

export default Button;
