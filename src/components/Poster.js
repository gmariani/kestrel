import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import { FaSync } from 'react-icons/fa';
import { useAWSMedia } from '../hooks';
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

const LoadingIcon = styled(FaSync)`
    position: absolute;
    z-index: 10;
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
    width: ${(props) => props.widthVal};
    height: ${(props) => props.heightVal};
`;

const ImageContainer = styled.div`
    transition: all 0.2s ease-in-out;
    border-radius: 20px;
    border: 3px solid transparent;
    position: relative;
    background: rgba(0, 0, 0, 0.25);
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
    overflow: hidden;
    margin-bottom: 0.5rem;
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

    &:focus ${ImageContainer}, &.focused ${ImageContainer}, &:hover ${ImageContainer} {
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
    const [loading, setLoading] = useState(true);
    const baseURL = getAWSBaseURL();
    const meta = useAWSMedia(categorySlug, mediaSlug);
    // console.log('Poster', `focused: ${focused}`, mediaSlug);

    // Determine year (or year range) to display, if available
    const getYear = () => {
        // If a year is set for the series/movie, use that
        if (meta.data?.year) return meta.data?.year;

        // If a TV series, check if there is atleast one season
        if (meta.data.seasons && meta.data.seasons.length > 0) {
            const years = [];

            // Does first season even have a year?
            if (meta.data.seasons[0]?.year) {
                years.push(meta.data.seasons[0].year);
            }

            // If there is more than one seaons, see if there is an ending year
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

            // Return the year range (if applicable)
            return years.join(' - ');
        }

        return null;
    };

    // Get title as data loads
    const getTitle = () => {
        if (meta.isLoaded) {
            // If error loading data, use the folder name
            if (meta.error) return <Title>{title}</Title>;

            // Display proper name if available along with year (if available)
            const year = getYear();
            return (
                <Title>
                    {meta.data?.name ?? title}
                    {year && <span>({year})</span>}
                </Title>
            );
        }

        // If data isn't loaded yet, use the folder name temporarily
        return <Title>{title} (Loading)</Title>;
    };

    // Get subtitle as data loads
    const getSubTitle = () => {
        if (meta.isLoaded === true) {
            // If error, don't show subtitle
            if (meta.error) return <SubTitle />;

            // Join genre array as necessary
            return <SubTitle>{meta.data.genres ? meta.data.genres.join(', ') : ''}</SubTitle>;
        }

        // Don't show subtitle unless data is available
        return <SubTitle />;
    };

    const classes = ['poster'];
    if (selected) classes.push('selected');
    if (focused) classes.push('focused');
    return (
        <Container to={to} className={`${classes.join(' ')}`}>
            <ImageContainer heightVal='30rem' widthVal='20rem'>
                <Image
                    src={`${baseURL}/${categorySlug}/${mediaSlug}/poster.jpg`}
                    heightVal='30rem'
                    widthVal='20rem'
                    onLoaded={() => {
                        setLoading(false);
                    }}
                />
                {loading && <LoadingIcon />}
            </ImageContainer>

            {getTitle()}
            {getSubTitle()}
        </Container>
    );
}

Poster.propTypes = propTypes;
export default withFocusable()(Poster);
