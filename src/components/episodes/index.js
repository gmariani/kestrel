import React from 'react';
import { Container, Fade, EpisodeContainer, Thumbnail, Meta, Info, Title, Counter, Timer } from './styles/episodes';
import { ProgressBar } from '../';

export default function Episodes({ children, ...restProps }) {
    return <Container>{children}</Container>;
}

Episodes.Fade = function EpisodeFade({ children, ...restProps }) {
    return <Fade></Fade>;
};

Episodes.Episode = function Episode({
    children,
    isSelected = 0,
    index = '01',
    data,
    timer = '00:00',
    progressPercent = 0,
    ...restProps
}) {
    // data.filePath

    return (
        <EpisodeContainer className={isSelected ? 'selected' : ''} {...restProps}>
            {data.thumbnail ? <Thumbnail src={data.thumbnail} /> : null}
            <Info>
                <Meta className='episode__meta'>
                    <Counter>Episode {index}</Counter>
                    <Timer>{timer}</Timer>
                </Meta>
                <Title className='episode__title'>{data.name}</Title>
                {progressPercent > 0 ? <ProgressBar value={progressPercent} theme='dark' /> : null}
            </Info>
        </EpisodeContainer>
    );
};
