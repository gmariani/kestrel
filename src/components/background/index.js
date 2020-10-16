import React from 'react';
import { Container } from './styles/background';

export default function Background({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}
