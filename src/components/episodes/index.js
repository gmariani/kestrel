import React from 'react';
import { Container, Fade, EpisodeContainer, Thumbnail, Meta, Info, Title, Counter, Timer } from './styles/episodes';
import { ProgressBar } from '../';

export default function Episodes({ children, ...restProps }) {
    return <Container>{children}</Container>;
}

Episodes.Fade = function EpisodeFade({ children, ...restProps }) {
    return <Fade></Fade>;
};

Episodes.Episode = function Episode({ children, isSelected = 0, index = '01', data, ...restProps }) {
    const durationToSeconds = (duration = '00:00') => {
        const parts = duration.split(':').map((num) => parseInt(num));
        if (parts.length >= 3) return parts[0] * 60 * 60 + parts[1] * 60 + parts[2];
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        return parts[0];
    };
    const secondsToHuman = (duration) => {
        let temp = duration;
        const years = Math.floor(temp / 31536000),
            days = Math.floor((temp %= 31536000) / 86400),
            hours = Math.floor((temp %= 86400) / 3600),
            minutes = Math.floor((temp %= 3600) / 60),
            seconds = temp % 60;

        if (days || hours || minutes) {
            return (
                (years ? years + 'y ' : '') +
                (days ? days + 'd ' : '') +
                (hours ? hours + 'h ' : '') +
                (minutes ? minutes + 'm ' : '')
            );
        }

        return Number.parseFloat(seconds) + 's';
    };
    const maybeProgress = (progress = 0) => {
        return progress > 0 ? <ProgressBar value={progress} /> : null;
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
            <Thumbnail src={data.thumbnail} />
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
