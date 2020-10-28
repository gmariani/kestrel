import React from 'react';
import { StyledButton, StyledLink } from './styles/button';

export default function Button({ children, btnStyle = 'default', ...restProps }) {
    return (
        <StyledButton btnStyle={btnStyle} {...restProps}>
            {children}
        </StyledButton>
    );
}

Button.Link = function ButtonLink({ children, btnStyle = 'default', ...restProps }) {
    return (
        <StyledLink className={btnStyle} {...restProps}>
            {children}
        </StyledLink>
    );
};
