import React from 'react';
import { Container } from './styles/row';

export default function Row({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}
