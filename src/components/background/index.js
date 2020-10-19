import React from 'react';
import { Container, Shadow, Gradient, Image } from './styles/background';

export default function Background({
    children,
    hasShadow = false,
    opacityShadow = '0.75',

    hasColor = true,
    startColor = '#EE6B4D',
    endColor = '#FF3000',

    hasImage = false,
    imagePath = '',

    blendMode = 'normal',
    opacity = '0.8',
    ...restProps
}) {
    const shadow = hasShadow && <Shadow opacity={opacityShadow} />;
    const gradient = hasColor && (
        <Gradient blendMode={blendMode} opacity={opacity} startColor={startColor} endColor={endColor} />
    );
    const image = hasImage && <Image blendMode={blendMode} opacity={opacity} src={imagePath} />;
    return (
        <>
            <Container>{children}</Container>
            {shadow}
            {gradient}
            {image}
        </>
    );
}
