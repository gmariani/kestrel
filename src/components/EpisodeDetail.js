import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Link from './Link';
import ProgressBar from './ProgressBar';

const Container = styled.div`
    display: flex;
    font-size: 2rem;
    color: white;
    flex-direction: column;
    justify-content: end;
    flex: 1;
`;

const Meta = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 8rem;
    line-height: 8rem;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.5rem;
`;

const Controls = styled.div`
    display: flex;
    column-gap: 2rem;
    margin-top: 2rem;
`;

const propTypes = {
    focusId: PropTypes.arrayOf(PropTypes.number).isRequired,
    focusTarget: PropTypes.number,
    series: PropTypes.shape({
        year: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    }),
    episodeProgress: PropTypes.shape({
        percent: PropTypes.number.isRequired,
    }),
    episodeRoute: PropTypes.string.isRequired,
    onClickRestart: PropTypes.func.isRequired,
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };

function EpisodeDetail({
    focusId,
    focusTarget = 0,
    series = defaultSeries,
    episodeProgress = null,
    episodeRoute,
    onClickRestart,
}) {
    const hasFocus1 = focusId[0] === focusTarget;
    const hasFocus2 = focusId.length > 1 ? focusId[1] === focusTarget : false;

    return (
        <Container>
            <Meta>
                {series.year} · {series.genres.join(', ')}
            </Meta>
            <Title>{series.name}</Title>
            <Description>{series.description}</Description>

            {episodeProgress ? <ProgressBar value={episodeProgress.percent} /> : null}

            <Controls>
                <Link theme='primary' to={episodeRoute} className={hasFocus1 ? 'focused' : ''}>
                    {episodeProgress ? 'Continue' : 'Watch'}
                </Link>
                {episodeProgress ? (
                    <Link
                        theme='secondary'
                        className={hasFocus2 ? 'focused' : ''}
                        onClick={() => onClickRestart()}
                        to={episodeRoute}>
                        Restart
                    </Link>
                ) : null}
            </Controls>
        </Container>
    );
}

EpisodeDetail.propTypes = propTypes;
export default EpisodeDetail;
