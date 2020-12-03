import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton, StyledLink } from './styles/button';

function Button({ children, theme = 'default', className = '', type = 'button', disabled = false }) {
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

Button.Link = function ButtonLink({ children, theme = 'default', className = '', to = '/' }) {
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

export default Button;
