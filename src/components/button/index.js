import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton, StyledLink } from './styles/button';

function Button({ children, theme, className, type, disabled }) {
    return (
        <StyledButton theme={theme} type={type} className={className} disabled={disabled}>
            {children}
        </StyledButton>
    );
}
Button.propTypes = {
    children: PropTypes.node,
    theme: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};
Button.defaultProps = {
    children: null,
    theme: 'default',
    type: 'button',
    className: '',
    disabled: false,
};

Button.Link = function ButtonLink({ children, theme, className, to }) {
    return (
        <StyledLink className={`${theme} ${className}`} to={to}>
            {children}
        </StyledLink>
    );
};
Button.Link.propTypes = {
    children: PropTypes.node,
    theme: PropTypes.string,
    className: PropTypes.string,
    to: PropTypes.string,
};
Button.Link.defaultProps = {
    children: null,
    theme: 'default',
    className: '',
    to: '/',
};

export default Button;
