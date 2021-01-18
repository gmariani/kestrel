import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { FaSync } from 'react-icons/fa';
import { useAWSMedia } from '../hooks';
// import getTMDB from '../utils/getTMDB';
import LazyImage from './LazyImage';
import { getAWSBaseURL } from '../utils';

const spinning = keyframes`
from {
    transform:rotate(0deg);
}
to {
    transform:rotate(360deg);
}
`;

const SubTitle = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 1.5625rem;
    line-height: 1.6875rem;
    color: #ffffff;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
`;
// const LoadingBackground = styled.div``;

const LoadingIcon = styled(FaSync)`
    position: absolute;
    z-index: 5;
    top: 20%;
    left: 50%;
    left: calc(50% - 1.5rem);
    width: 3rem;
    height: 3rem;
    fill: white;
    animation-name: ${spinning};
    animation-duration: 3000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

const Image = styled(LazyImage)`
    transition: all 0.2s ease-in-out;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
    border: 3px solid transparent;
    margin-bottom: 0.5rem;
    width: ${(props) => props.widthVal};
    height: ${(props) => props.heightVal};
    z-index: 3;
    position: relative;
`;

const Container = styled(ReachRouterLink)`
    max-width: 20rem;
    text-decoration: none;
    position: relative;

    &:focus,
    &.focused,
    &:hover {
        text-decoration: none;
    }

    &:focus ${SubTitle}, &.focused ${SubTitle}, &:hover ${SubTitle} {
        opacity: 1;
    }

    &:focus ${Image}, &.focused ${Image}, &:hover ${Image} {
        border-color: white;
    }
`;

const Title = styled.h2`
    font-style: normal;
    font-weight: bold;
    font-size: 2.1875rem;
    line-height: 2.2rem;

    color: #ffffff;
    & span {
        margin-left: 10px;
        font-weight: 400;
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
    // console.log('Poster', `focused: ${focused}`, mediaSlug);
    const getYear = () => {
        if (meta.data?.year) {
            return meta.data?.year;
        }
        if (meta.data.seasons && meta.data.seasons.length > 0) {
            const years = [];
            // Does first season even have a year?
            if (meta.data.seasons[0]?.year) {
                years.push(meta.data.seasons[0].year);
            }
            if (meta.data.seasons.length > 1) {
                let lastSeasonIndex = meta.data.seasons.length - 1;
                while (lastSeasonIndex > 0) {
                    // Does last season even have a year?
                    if (meta.data.seasons[lastSeasonIndex]?.year) {
                        years.push(meta.data.seasons[lastSeasonIndex].year);
                        break;
                    }
                    lastSeasonIndex -= 1;
                }
            }
            return years.join(' - ');
        }

        return null;
    };

    // Get title as data loads
    const getTitle = () => {
        if (meta.isLoaded) {
            if (meta.error) return <Title>{title}</Title>;

            const year = getYear();
            return (
                <Title>
                    {meta.data?.name ?? title}
                    {year && <span>({year})</span>}
                </Title>
            );
        }
        return <Title>{title} (Loading)</Title>;
    };

    // Get subtitle as data loads
    const getSubTitle = () => {
        if (meta.isLoaded === true) {
            if (meta.error) return <SubTitle />;
            return <SubTitle>{meta.data.genres ? meta.data.genres.join(', ') : ''}</SubTitle>;
        }
        return null;
    };

    // If meta.json is incomplete, populate from TMDB
    // TODO: Maybe do this on the details page?
    // if (metadata.loaded && metadata.data.tmdb) {
    //     if (!metadata.data.name || !metadata.data.year || !metadata.data.genres) {
    //         // const tmdbData = getTMDB(meta.data.tmdb);
    //         // meta.data.name = '';
    //         // meta.data.year = 0;
    //         // meta.data.genres = [];
    //         // setMeta(meta.data);
    //     }
    // }

    return (
        <Container to={to} className={`poster ${selected ? 'selected' : ''} ${focused ? 'focused' : ''}`}>
            <Image src={`${baseURL}/${categorySlug}/${mediaSlug}/poster.jpg`} heightVal='30rem' widthVal='20rem' />
            <LoadingIcon />
            {getTitle()}
            {getSubTitle()}
        </Container>
    );
}

Poster.propTypes = propTypes;
export default withFocusable()(Poster);
