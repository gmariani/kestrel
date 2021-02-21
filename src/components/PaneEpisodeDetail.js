import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { FaArrowRight } from 'react-icons/fa';
import FlexCol from './FlexCol';
import ButtonLink from './ButtonLink';
import HalfPane from './HalfPane';
import mediaInterface from '../interfaces/media';
import { useTMDB } from '../hooks';
import replaceAllPolyfill from '../utils/replaceAllPolyfill';

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

const Attribution = styled.span`
    font-size: 1rem;
    position: absolute;
    bottom: 0;
`;

const SVGImg = styled.img`
    width: auto;
    height: 0.75rem;
    pointer-events: none;
    user-select: none;
    margin-right: 1rem;
`;

function getMeta(episodeTitle, seasonNum = 0, episodeNum = 0, isSingle = false) {
    if (isSingle) {
        return ``;
    }
    return `S${seasonNum} E${episodeNum} - ${episodeTitle}`;
}

function getPostMeta(airDate, contentRating) {
    replaceAllPolyfill();

    if (airDate) {
        const localeDate = new Date(Date.parse(airDate.replaceAll('/', '-'))).toLocaleDateString();
        return `Air Date: ${localeDate} • ${contentRating}`;
    }
    return `${contentRating}`;
}

const propTypes = {
    isSingle: PropTypes.bool,
    media: mediaInterface,
    onClickDetails: PropTypes.func.isRequired,
    onClickBack: PropTypes.func.isRequired,
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };

function PaneEpisodeDetail({ isSingle = false, media = defaultSeries, onClickDetails, onClickBack }) {
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

    function getDescription() {
        if (tmdb.isLoaded === false) {
            return (
                <>
                    <Description>Loading...</Description>
                    <PostMeta>{getPostMeta(null, media?.contentRating)}</PostMeta>
                </>
            );
        }

        if (tmdb.success === true) {
            return (
                <>
                    <Description>{tmdb.overview}</Description>
                    <PostMeta>{getPostMeta(tmdb?.air_date, media?.contentRating)}</PostMeta>
                </>
            );
        }
        return (
            <>
                <Description>(No TMDB ID Set) {media.description}</Description>
                <PostMeta>{getPostMeta(null, media?.contentRating)}</PostMeta>
            </>
        );
    }

    // On render, listen for tv remote to navigate as well
    useEffect(() => {
        function onKeyDown(event) {
            const { key } = event;
            // keyCode: 27 / key: Escape
            if (key === 'Escape') {
                event.preventDefault();
                onClickBack();
            }
        }

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    });

    return (
        <HalfPane
            backgroundHue={media.backgroundHue}
            initialFocus='ACTION-DETAILS'
            backgroundURL={
                tmdb.success === true && tmdb?.still_path
                    ? `https://image.tmdb.org/t/p/original/${tmdb?.still_path}`
                    : media.backgroundURL
            }>
            <Container justifyContent='flex-end'>
                <Title>{media.name}</Title>
                <Meta>{getMeta(media.episode.name, media.season.number, media.episode.number, isSingle)}</Meta>
                {getDescription()}

                <FlexCol rowGap='2rem' style={{ marginTop: '2rem' }}>
                    <ButtonLink
                        focusKey='ACTION-DETAILS'
                        onEnterPress={() => {
                            // console.log('onEnterPress onClickDetails()');
                            onClickDetails();
                        }}
                        onClick={onClickDetails}
                        selected>
                        <FaArrowRight /> {isSingle ? 'Movie Details' : `Show Details`}
                    </ButtonLink>
                </FlexCol>
                <Attribution>
                    <SVGImg alt='The Movie Database' src={`${process.env.PUBLIC_URL}/images/tmdb_logo.svg`} /> This
                    product uses the TMDb API but is not endorsed or certified by TMDb.
                </Attribution>
            </Container>
        </HalfPane>
    );
}

PaneEpisodeDetail.propTypes = propTypes;
export default PaneEpisodeDetail;
