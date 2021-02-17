import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { useAWSMedia } from '../hooks';
import { getAWSBaseURL } from '../utils';

const Image = styled.img`
    width: var(--width);
    height: var(--height);
`;

const ImageContainer = styled.div`
    border-radius: 4px;
    position: relative;
    /*background: rgba(0, 0, 0, 0.25);*/
    /*background: rgba(0, 0, 0, 0) linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42)) repeat scroll 0% 0% / cover;*/
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(48, 50, 62, 0.5), rgba(30, 31, 42, 0.5)) repeat scroll 0% 0% /
        cover;
    /*filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));*/
    overflow: hidden;
`;

const Container = styled(ReachRouterLink)`
    max-width: 20rem;
    text-decoration: none;
    position: relative;
    color: white;
    font-size: 1.5rem;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.39) 0px 26px 30px -10px, rgba(0, 0, 0, 0.43) 0px 16px 10px -10px;
    transform: scale(1) translateZ(0px);
    transition-duration: 300ms;
    transition-property: transform, box-shadow;
    transition-timing-function: ease-out;
    scroll-margin: 25px;

    &:after {
        border-radius: 4px;
        border: 4px solid rgba(255, 255, 255, 0);
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        /* Added in Chrome 87 */
        inset: 0px;
        content: '';
        position: absolute;
        transition: border 300ms ease-out 0s;
    }

    &.focused:after,
    &:focus:after,
    &:focus-within:after,
    &:hover:after {
        border: 4px solid rgba(249, 249, 249, 0.8);
    }

    &.focused,
    &:focus,
    &:focus-within,
    &:hover {
        text-decoration: none;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 40px 58px -16px, rgba(0, 0, 0, 0.42) 0px 30px 22px -10px;
        transform: scale(1.05) translateZ(0px) translate3d(0px, 0px, 0px);
        transition-duration: 300ms;
        transition-property: transform, box-shadow;
        transition-timing-function: ease-out;
    }
`;

const propTypes = {
    selected: PropTypes.bool,
    focused: PropTypes.bool,
    categorySlug: PropTypes.string,
    mediaSlug: PropTypes.string,
    title: PropTypes.string,
    to: PropTypes.string.isRequired,
};

function Poster({ selected, focused, categorySlug, mediaSlug, to, title = 'No Title' }) {
    const baseURL = getAWSBaseURL();
    const meta = useAWSMedia(categorySlug, mediaSlug);
    const keyPrefix = `${categorySlug}/${mediaSlug}`;

    const classes = ['poster'];
    if (selected) classes.push('selected');
    if (focused) classes.push('focused');

    const rawPosterURL = meta.isLoaded ? meta.data?.posterURL ?? 'poster.jpg' : 'poster.jpg';
    const posterURL =
        rawPosterURL && !rawPosterURL.includes(mediaSlug) ? `${baseURL}/${keyPrefix}/${rawPosterURL}` : rawPosterURL;

    return (
        <Container to={to} className={`${classes.join(' ')}`}>
            <ImageContainer heightVal='30rem' widthVal='20rem'>
                <Image
                    src={posterURL}
                    alt={meta.isLoaded ? meta.data?.name ?? title : title}
                    height={30 * 16} // 30rem
                    width={20 * 16} // 20rem
                    style={{ '--width': '20rem', '--height': '30rem' }}
                    loading='lazy'
                />
            </ImageContainer>
        </Container>
    );
}

Poster.propTypes = propTypes;
export default withFocusable()(Poster);
