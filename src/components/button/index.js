import React from 'react';
import { StyledButton, StyledLink } from './styles/button';

export default function Button({ children, theme = 'default', ...restProps }) {
    return (
        <StyledButton theme={theme} {...restProps}>
            {children}
        </StyledButton>
    );
}

Button.Link = function ButtonLink({ children, theme = 'default', ...restProps }) {
    return (
        <StyledLink className={theme} {...restProps}>
            {children}
        </StyledLink>
    );
};
