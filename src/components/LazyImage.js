import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

// 1px X 1px transparent PNG
// https://slashgear.github.io/creating-an-image-lazy-loading-component-with-react/
const placeHolder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

// Add a smooth animation on loading
const loaded = keyframes`
    from {
        opacity: 0;
        transform: translate3d(0, 0, 500rem);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`;

// Use utilitary classes instead of props to avoid style regenerating
const Image = styled.img`
    display: block;

    &.loaded:not(.has-error) {
        animation: ${loaded} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }

    &.has-error {
        content: url(${placeHolder});
    }
`;

const propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    onLoaded: PropTypes.func,
};

const LazyImage = ({ src, alt, className, height, width, style, onLoaded }) => {
    const [imageSrc, setImageSrc] = useState(placeHolder);
    const [imageRef, setImageRef] = useState();
    const hasError = useRef(false);

    // On render, observe to see if it's visible on screen before displaying
    useEffect(() => {
        let observer;
        let didCancel = false;

        if (!hasError.current) {
            if (imageRef && imageSrc !== src) {
                if (IntersectionObserver) {
                    observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                // Is visible, load image
                                if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                                    setImageSrc(src);
                                    observer.unobserve(imageRef);
                                }
                            });
                        },
                        {
                            threshold: 0.01,
                            rootMargin: '75%',
                        }
                    );
                    observer.observe(imageRef);
                } else {
                    // Old browsers fallback
                    setImageSrc(src);
                }
            }
        }

        return () => {
            didCancel = true;
            // on component cleanup, we remove the listner
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef);
            }
        };
    }, [src, imageSrc, imageRef]);

    return (
        <Image
            ref={setImageRef}
            src={imageSrc}
            alt={alt}
            className={className}
            height={height}
            width={width}
            style={style}
            onLoad={(event) => {
                // console.log('loaded', event.target.complete, event.target);
                event.target.classList.add('loaded');
                if (onLoaded) onLoaded(true);
            }}
            onError={(event) => {
                event.target.classList.add('has-error');
                hasError.current = true;
                setImageSrc(placeHolder);
                if (onLoaded) onLoaded(false);
            }}
        />
    );
};

LazyImage.propTypes = propTypes;
export default LazyImage;
