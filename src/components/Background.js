import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 6.25rem;
    position: relative;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
`;

const Shadow = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    background: radial-gradient(70.79% 70.79% at 51.61% 17.18%, rgba(0, 0, 0, 0) 0%, #000000 100%);
    mix-blend-mode: normal;
    background: radial-gradient(70.79% 70.79% at 51.61% 17.18%, rgba(0, 0, 0, 0) 0%, #000000 100%);
    opacity: ${({ opacity }) => opacity};
`;

const Gradient = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    background: ${({ startColor, endColor }) => `linear-gradient(128.4deg, ${startColor} 18.25%, ${endColor} 84.73%)`};
    mix-blend-mode: ${({ blendMode }) => blendMode};
    opacity: ${({ opacity }) => opacity};
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    background-image: ${({ src }) => `url(${src})`};
    background-size: cover;
    background-repeat: no-repeat;
    mix-blend-mode: ${({ blendMode }) => blendMode};
    opacity: ${({ opacity }) => opacity};
`;

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
