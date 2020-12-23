import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: start;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
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

function getMetaLabel(episodeTitle, seasonNum = 0, episodeNum = 0, isSingle = false) {
    if (isSingle) {
        return ``;
    }
    return `S${seasonNum} E${episodeNum} - ${episodeTitle}`;
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
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { name: 'No Series Title', contentRating: 'NR' };

function PaneEpisodeTitle({
    isSingle = false,
    seasonNum = 0,
    episodeNum = 0,
    episodeName = 'No Title',
    series = defaultSeries,
}) {
    return (
        <Container>
            <Title>{series.name}</Title>
            <Meta>{getMetaLabel(episodeName, seasonNum, episodeNum, isSingle)}</Meta>
        </Container>
    );
}

PaneEpisodeTitle.propTypes = propTypes;
export default PaneEpisodeTitle;
