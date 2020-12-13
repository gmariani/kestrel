import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    font-size: 2rem;
    color: white;
    flex-direction: column;
    justify-content: start;
    flex: 1;

    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);

    width: 30%;
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
`;

const Title = styled.div`
    font-size: 4rem;
    line-height: 4rem;
    margin-bottom: 1rem;
`;

function getMetaLabel(episodeTitle, contentRating = 'NR', seasonNum = 0, episodeNum = 0, isSingle = false) {
    if (isSingle) {
        return `${episodeTitle} • ${contentRating}`;
    }
    return `S${seasonNum} E${episodeNum} - ${episodeTitle} • ${contentRating}`;
}

const propTypes = {
    isSingle: PropTypes.bool,
    seasonNum: PropTypes.number,
    episodeNum: PropTypes.number,
    episodeTitle: PropTypes.string,
    series: PropTypes.shape({
        name: PropTypes.string.isRequired,
        contentRating: PropTypes.string,
    }),
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { name: 'No Series Title', contentRating: 'NR' };

function PlayerDetail({
    isSingle = false,
    seasonNum = 0,
    episodeNum = 0,
    episodeTitle = 'No Title',
    series = defaultSeries,
}) {
    return (
        <Container>
            <Title>{series.name}</Title>
            <Meta>{getMetaLabel(episodeTitle, series?.contentRating, seasonNum, episodeNum, isSingle)}</Meta>
        </Container>
    );
}

PlayerDetail.propTypes = propTypes;
export default PlayerDetail;
