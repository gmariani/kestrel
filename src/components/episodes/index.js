import React from 'react';
import { Container, Fade, EpisodeContainer, Thumbnail, Meta, Info, Title, Counter, Timer } from './styles/episodes';
import { ProgressBar } from '../';
import { durationToSeconds, secondsToHuman } from '../../utils';

export default function Episodes({ children, ...restProps }) {
    return <Container>{children}</Container>;
}

Episodes.Fade = function EpisodeFade({ children, ...restProps }) {
    return <Fade></Fade>;
};

Episodes.Episode = function Episode({ children, isSelected = 0, index = '01', data, ...restProps }) {
    const maybeProgress = (progress = 0) => {
        return progress > 0 ? <ProgressBar value={progress} /> : null;
    };
    const maybeThumbnail = (thumbnail) => {
        return thumbnail ? <Thumbnail src={thumbnail} /> : null;
    };

    const seconds = durationToSeconds(data.duration);
    const hasProgress = Math.random() < 0.5;
    const progress = hasProgress ? Math.random() * 100 : null;
    const tempDuration = data.duration ? data.duration : '00:00';
    const timer = hasProgress
        ? Math.floor(Math.random() * parseInt(tempDuration.split(':')[1])) + 'm left'
        : secondsToHuman(seconds);
    // data.filePath

    return (
        <EpisodeContainer className={isSelected ? 'selected' : ''} {...restProps}>
            {maybeThumbnail(data.thumbnail)}
            <Info>
                <Meta className='episode__meta'>
                    <Counter>Episode {index}</Counter>
                    <Timer>{timer}</Timer>
                </Meta>
                <Title className='episode__title'>{data.name}</Title>
                {maybeProgress(progress)}
            </Info>
        </EpisodeContainer>
    );
};
