import React from 'react';
import { Container, Shadow, Gradient } from './styles/background';

export default function Background({ children, ...restProps }) {
    return (
        <>
            <Container>{children}</Container>
            <Gradient {...restProps} />
        </>
    );
}

Background.Browse = function BackgroundBrowse({ children, ...restProps }) {
    return (
        <>
            <Container>{children}</Container>
            <Shadow />
            <Gradient compStyle='browse' {...restProps} />
        </>
    );
};
