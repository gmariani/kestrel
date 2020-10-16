import React from 'react';
import { StyledButton } from './styles/button';

export default function Button({ children, btnStyle = 'default', ...restProps }) {
    return <StyledButton btnStyle={btnStyle}>{children}</StyledButton>;
}
