import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FaArrowRight } from 'react-icons/fa';
import FlexCol from './FlexCol';
import ButtonLink from './ButtonLink';
import mediaInterface from '../interfaces/media';
import { useFocus } from '../hooks';

const Container = styled(FlexCol)`
    font-size: 2rem;
    color: white;
    flex: 1;
`;

const Meta = styled.div`
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

    // Play the episode on Enter key
    if (focusKey === 'Enter') {
        return <Redirect to={media.route} />;
    }

    return (
        <Container justifyContent='end'>
            <Description>EPISODE DESCRIPTION HERE</Description>
            <Meta>{media?.contentRating}</Meta>
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
