import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';
import { useAWSMedia } from '../hooks';
// import getTMDB from '../utils/getTMDB';
import LazyImage from './LazyImage';
import { getAWSBaseURL } from '../utils';

const Container = styled(ReachRouterLink)`
    max-width: 400px;
    transition: all 0.2s ease-in-out;
    &:focus,
    &.focused.selected,
    &:hover {
        text-decoration: none;
        transform: scale(1.05);
    }
`;

const Image = styled(LazyImage)`
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
    border-radius: 20px;
    margin-bottom: 0.5rem;
`;

const Title = styled.h2`
    font-style: normal;
    font-weight: bold;
    font-size: 2.1875rem;
    line-height: 38px;

    color: #ffffff;
    & span {
        margin-left: 10px;
        font-weight: 400;
    }
`;

const SubTitle = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 1.5625rem;
    line-height: 27px;

    color: #ffffff;
`;

const propTypes = {
    categorySlug: PropTypes.string,
    mediaSlug: PropTypes.string,
    title: PropTypes.string,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
};

function Poster({ categorySlug, mediaSlug, to, title = 'No Title', className = '' }) {
    const baseURL = getAWSBaseURL();
    const meta = useAWSMedia(categorySlug, mediaSlug);
    console.log('Poster', mediaSlug, meta);
    // Get title as data loads
    const getTitle = () => {
        if (meta.isLoaded) {
            if (meta.error) return <Title>{title}</Title>;

            const year = meta.data?.year ?? (meta.data.seasons ? meta.data.seasons[0]?.year : null);
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
        <Container to={to} className={className}>
            <Image src={`${baseURL}/${categorySlug}/${mediaSlug}/poster.jpg`} height='600' width='400' />
            {getTitle()}
            {getSubTitle()}
        </Container>
    );
}

Poster.propTypes = propTypes;
export default Poster;
