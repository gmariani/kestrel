import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    padding-left: 1rem;
    border-left: 1px solid teal;
    text-transform: uppercase;
`;

const propTypes = {
    rating: PropTypes.string,
};

function getRating(rating) {
    switch (rating.toLowerCase()) {
        case 'nc-17':
        case 'r':
        case 'pg-13':
        case 'pg':
        case 'g':
        case 'tv-ma':
        case 'tv-14':
        case 'tv-pg':
        case 'tv-g':
        case 'tv-y7':
        case 'tv-y':
            return rating.toUpperCase();
        default:
            // nr
            return null;
    }
}

function PreRollRating({ rating = 'NR' }) {
    const contentRating = getRating(rating);
    return contentRating && <Container>Rated {contentRating}</Container>;
}

PreRollRating.propTypes = propTypes;
export default PreRollRating;
