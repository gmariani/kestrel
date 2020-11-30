import React from 'react';
import { Container, Controls, Meta, Title, Description } from './styles/detail';
import { Button, ProgressBar } from '../';

export default function Detail({
    focusId,
    focusTarget,
    series,
    episodeProgress,
    episodeRoute,
    onClickRestart,
    ...restProps
}) {
    const hasFocus1 = Array.isArray(focusId) ? focusId[0] === focusTarget : focusId === focusTarget;
    const hasFocus2 = Array.isArray(focusId) ? focusId[1] === focusTarget : false;

    return (
        <Container {...restProps}>
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
                        onClick={(e) => onClickRestart()}
                        to={episodeRoute}>
                        Restart
                    </Button.Link>
                ) : null}
            </Controls>
        </Container>
    );
}
