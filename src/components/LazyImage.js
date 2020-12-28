import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// https://slashgear.github.io/creating-an-image-lazy-loading-component-with-react/
const placeHolder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const Image = styled.img`
    display: block;
    /*height: 100px;
    width: 100px;*/

    // Add a smooth animation on loading
    @keyframes loaded {
        0% {
            opacity: 0.1;
        }
        100% {
            opacity: 1;
        }
    }

    // I use utilitary classes instead of props to avoid style regenerating
    &.loaded:not(.has-error) {
        animation: loaded 300ms ease-in-out;
    }

    &.has-error {
        // fallback to placeholder image on error
        content: url(${placeHolder});
    }
`;

const propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

const LazyImage = ({ src, alt, className, height, width }) => {
    const [imageSrc, setImageSrc] = useState(placeHolder);
    const [imageRef, setImageRef] = useState();
    const hasError = useRef(false);

    const onLoad = (event) => {
        event.target.classList.add('loaded');
    };

    const onError = (event) => {
        event.target.classList.add('has-error');
        hasError.current = true;
        setImageSrc(placeHolder);
    };

    useEffect(() => {
        let observer;
        let didCancel = false;

        if (!hasError.current) {
            if (imageRef && imageSrc !== src) {
                if (IntersectionObserver) {
                    observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
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
            onLoad={onLoad}
            onError={onError}
        />
    );
};

LazyImage.propTypes = propTypes;
export default LazyImage;
