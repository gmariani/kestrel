import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Shadow, Gradient, Image } from './styles/background';

const propTypes = {
    children: PropTypes.node,
    hasShadow: PropTypes.bool,
    hasColor: PropTypes.bool,
    hasImage: PropTypes.bool,
    opacityShadow: PropTypes.number,
    opacity: PropTypes.number,
    startColor: PropTypes.string,
    endColor: PropTypes.string,
    imagePath: PropTypes.string,
    blendMode: PropTypes.string,
    onKeyDown: PropTypes.func,
    onLoad: PropTypes.func,
    tabIndex: PropTypes.string,
};

const Background = forwardRef(
    (
        {
            children,
            hasShadow = false,
            opacityShadow = 0.75,
            hasColor = true,
            startColor = '#EE6B4D',
            endColor = '#FF3000',
            hasImage = false,
            imagePath = '',
            blendMode = 'normal',
            opacity = 0.8,
            onLoad,
            onKeyDown,
            tabIndex,
        },
        ref
    ) => (
        <>
            <Container ref={ref} onLoad={onLoad} onKeyDown={onKeyDown} tabIndex={tabIndex}>
                {children}
            </Container>
            {hasShadow ? <Shadow opacity={opacityShadow.toString()} /> : null}
            {hasColor ? (
                <Gradient
                    blendMode={blendMode}
                    opacity={opacity.toString()}
                    startColor={startColor}
                    endColor={endColor}
                />
            ) : null}
            {hasImage ? <Image blendMode={blendMode} opacity={opacity.toString()} src={imagePath} /> : null}
        </>
    )
);

Background.propTypes = propTypes;
export default Background;
