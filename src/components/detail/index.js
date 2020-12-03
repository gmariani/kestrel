import React from 'react';
import PropTypes from 'prop-types';
import { Container, Controls, Meta, Title, Description } from './styles/detail';
import Button from '../button';
import ProgressBar from '../progressbar';

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

const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };
function Detail({
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
                <Button.Link theme='primary' to={episodeRoute} className={hasFocus1 ? 'focused' : ''}>
                    {episodeProgress ? 'Continue' : 'Watch'}
                </Button.Link>
                {episodeProgress ? (
                    <Button.Link
                        theme='secondary'
                        className={hasFocus2 ? 'focused' : ''}
                        onClick={() => onClickRestart()}
                        to={episodeRoute}>
                        Restart
                    </Button.Link>
                ) : null}
            </Controls>
        </Container>
    );
}

Detail.propTypes = propTypes;
export default Detail;
