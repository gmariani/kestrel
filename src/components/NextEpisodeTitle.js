import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: end;
    pointer-events: none;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    width: 700px;
`;

const Meta = styled.div`
    display: flex;
    /*justify-content: space-between;*/
    font-size: 1.5rem;
    user-select: none;
    text-align: right;
    justify-content: end;
`;

const Title = styled.div`
    font-size: 1.5rem;
    line-height: 1.5rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    user-select: none;
    text-align: right;
`;

function getMetaLabel(episodeTitle, seasonNum = 0, episodeNum = 0, isSingle = false, folder) {
    const items = [];

    // If is a movie extra
    if (isSingle && folder) {
        items.push(episodeTitle);
        return `${episodeTitle}`;
    }
    // If movie
    if (isSingle) {
        return ``;
    }
    // If TV
    return `S${seasonNum} E${episodeNum} - ${episodeTitle}`;
}

const propTypes = {
    isSingle: PropTypes.bool,
    seasonNum: PropTypes.number,
    episodeNum: PropTypes.number,
    episodeName: PropTypes.string,
    folder: PropTypes.string,
};

function NextEpisodeTitle({ isSingle = false, seasonNum = 0, episodeNum = 0, episodeName = 'No Title', folder }) {
    return (
        <Container>
            <Title>Up Next</Title>
            <Meta>{getMetaLabel(episodeName, seasonNum, episodeNum, isSingle, folder)}</Meta>
        </Container>
    );
}

NextEpisodeTitle.propTypes = propTypes;
export default NextEpisodeTitle;
