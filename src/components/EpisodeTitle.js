import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: start;
    pointer-events: none;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    width: 500px;
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    user-select: none;
`;

const Title = styled.div`
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 0.5rem;
    user-select: none;
`;

function getMetaLabel(episodeTitle, contentRating = 'NR', seasonNum = 0, episodeNum = 0, isSingle = false, folder) {
    // If is a movie extra
    if (isSingle && folder) {
        return `${episodeTitle} • ${contentRating}`;
    }
    // If movie
    if (isSingle) {
        return `${contentRating}`;
    }
    // If TV
    return `S${seasonNum} E${episodeNum} - ${episodeTitle} • ${contentRating}`;
}

const propTypes = {
    isSingle: PropTypes.bool,
    seasonNum: PropTypes.number,
    episodeNum: PropTypes.number,
    episodeName: PropTypes.string,
    series: PropTypes.shape({
        name: PropTypes.string.isRequired,
        contentRating: PropTypes.string,
    }),
    folder: PropTypes.string,
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { name: 'No Series Title', contentRating: 'NR' };

function EpisodeTitle({
    isSingle = false,
    seasonNum = 0,
    episodeNum = 0,
    episodeName = 'No Title',
    series = defaultSeries,
    folder,
}) {
    return (
        <Container>
            <Title>{series.name}</Title>
            <Meta>{getMetaLabel(episodeName, series?.contentRating, seasonNum, episodeNum, isSingle, folder)}</Meta>
        </Container>
    );
}

EpisodeTitle.propTypes = propTypes;
export default EpisodeTitle;
