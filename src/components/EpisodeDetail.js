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
    hasFocus: PropTypes.bool,
    series: PropTypes.shape({
        year: PropTypes.number,
        genres: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    }),
    progress: PropTypes.number,
    episodeRoute: PropTypes.string.isRequired,
    onClickRestart: PropTypes.func.isRequired,
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };

function EpisodeDetail({ hasFocus = false, series = defaultSeries, progress = 0, episodeRoute, onClickRestart }) {
    // className={`${i === selectedSeason ? 'selected' : ''} ${hasFocus ? 'focused' : ''}`}
    return (
        <Container>
            <Meta>
                {series.year} · {series.genres.join(', ')}
            </Meta>
            <Title>{series.name}</Title>
            <Description>{series.description}</Description>

            {progress ? <ProgressBar value={progress} /> : null}

            <Controls>
                <Link theme='primary' to={episodeRoute} className=''>
                    {progress ? 'Continue' : 'Watch'}
                </Link>
                {progress ? (
                    <Link theme='secondary' className='' onClick={onClickRestart} to={episodeRoute}>
                        Restart
                    </Link>
                ) : null}
            </Controls>
        </Container>
    );
}

EpisodeDetail.propTypes = propTypes;
export default EpisodeDetail;
