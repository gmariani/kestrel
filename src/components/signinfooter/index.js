import React from 'react';
import { Container } from './styles/signinfooter';

export default function SignInFooter({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}
