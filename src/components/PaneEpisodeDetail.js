import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FaArrowRight } from 'react-icons/fa';
import FlexCol from './FlexCol';
import ButtonLink from './ButtonLink';
import mediaInterface from '../interfaces/media';
import { useFocus, useTMDB } from '../hooks';

const Container = styled(FlexCol)`
    font-size: 2rem;
    color: white;
    flex: 1;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    user-select: none;
    font-weight: bold;
`;

const Title = styled.div`
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 2rem;
    user-select: none;
`;

const PostMeta = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 400;
`;

const Description = styled.p`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 400;
    margin-bottom: 0;
`;

function getMeta(episodeTitle, seasonNum = 0, episodeNum = 0, isSingle = false) {
    if (isSingle) {
        return ``;
    }
    return `S${seasonNum} E${episodeNum} - ${episodeTitle}`;
}

function getPostMeta(airDate, contentRating) {
    if (airDate) {
        const localeDate = new Date(Date.parse(airDate.replaceAll('/', '-'))).toLocaleDateString();
        return `Air Date: ${localeDate} • ${contentRating}`;
    }
    return `${contentRating}`;
}

const propTypes = {
    hasFocus: PropTypes.bool,
    isSingle: PropTypes.bool,
    media: mediaInterface,
    onClickDetails: PropTypes.func.isRequired,
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };

function PaneEpisodeDetail({ hasFocus = false, isSingle = false, media = defaultSeries, onClickDetails }) {
    // Manage focused element
    const WATCH_ELEMENT = 'watch';
    const focusElements = [WATCH_ELEMENT];
    const [focusElement, focusKey] = useFocus(focusElements, 'vertical', hasFocus);

    const { tmdb } = useTMDB(isSingle ? 'movie' : 'episode', media.tmdb, media.season.number, media.episode.number);
    // data.name
    // data.overview
    // data.air_date
    // data.still_path
    // data.vote_count
    // data.vote_average
    // data.season_number
    // data.episode_number
    // data.crew
    // data.guest_stars
    // data.id
    // data.production_code

    // Play the episode on Enter key
    if (focusKey === 'Enter') {
        return <Redirect to={media.route} />;
    }

    return (
        <Container justifyContent='end'>
            <Title>{media.name}</Title>
            <Meta>{getMeta(media.episode.name, media.season.number, media.episode.number, isSingle)}</Meta>
            {tmdb && tmdb.isLoaded ? (
                <>
                    <Description>{tmdb.data.overview}</Description>
                    <PostMeta>{getPostMeta(tmdb.data?.air_date, media?.contentRating)}</PostMeta>
                </>
            ) : (
                <>
                    <Description>Loading...</Description>
                    <PostMeta>{getPostMeta(null, media?.contentRating)}</PostMeta>
                </>
            )}

            <FlexCol rowGap='2rem' style={{ marginTop: '2rem' }}>
                <ButtonLink onClick={onClickDetails} className='selected focused'>
                    <FaArrowRight /> {isSingle ? 'Movie Details' : `Show Details`}
                </ButtonLink>
            </FlexCol>
        </Container>
    );
}

PaneEpisodeDetail.propTypes = propTypes;
export default PaneEpisodeDetail;
