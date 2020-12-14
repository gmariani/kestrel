import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { padNumber } from '../utils';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 50%;
`;

const Thumbnail = styled.img`
    border-radius: 20px;
    width: 100%;
    height: auto;
`;

const Title = styled.h3`
    font-size: 2rem;
    color: #fff;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    margin: 0;
    text-align: center;
    font-weight: normal;
`;

const propTypes = {
    nextIndex: PropTypes.number,
    nextThumbnail: PropTypes.string,
    nextName: PropTypes.string,
};

function CreditsPreview({ nextIndex = 0, nextThumbnail, nextName }) {
    return (
        <Container>
            <Thumbnail src={nextThumbnail} />
            <Title>{`Next: ${padNumber(nextIndex)} - ${nextName}`}</Title>
        </Container>
    );
}

CreditsPreview.propTypes = propTypes;
export default CreditsPreview;
