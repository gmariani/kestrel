import React, { forwardRef } from 'react';
import { Container, Shadow, Gradient, Image } from './styles/background';

const Background = forwardRef(
    (
        {
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
        },
        ref
    ) => {
        return (
            <>
                <Container ref={ref} {...restProps}>
                    {children}
                </Container>
                {hasShadow ? <Shadow opacity={opacityShadow} /> : null}
                {hasColor ? (
                    <Gradient blendMode={blendMode} opacity={opacity} startColor={startColor} endColor={endColor} />
                ) : null}
                {hasImage ? <Image blendMode={blendMode} opacity={opacity} src={imagePath} /> : null}
            </>
        );
    }
);

export default Background;
