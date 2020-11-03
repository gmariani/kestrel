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
    const hasFocus = focusId === focusTarget;

    return (
        <Container {...restProps}>
            <Meta>
                {series.year} · {series.genres.join(', ')}
            </Meta>
            <Title>{series.name}</Title>
            <Description>{series.description}</Description>

            {episodeProgress ? <ProgressBar value={episodeProgress.percent} /> : null}

            <Controls>
                <Button.Link theme='primary' to={episodeRoute} className={hasFocus ? 'focused' : ''}>
                    {episodeProgress ? 'Continue' : 'Watch'}
                </Button.Link>
                {episodeProgress ? (
                    <Button.Link theme='secondary' onClick={(e) => onClickRestart()} to={episodeRoute}>
                        Restart
                    </Button.Link>
                ) : null}
            </Controls>
        </Container>
    );
}
