import React from 'react';
import {
    Container,
    EpisodeContainer,
    Thumbnail,
    Meta,
    Info,
    Title,
    Counter,
    Timer,
    ProgressTrack,
    ProgressBar,
} from './styles/episodes';

export default function Episodes({ children, ...restProps }) {
    return <Container>{children}</Container>;
}

Episodes.Episode = function Episode({ children, isSelected = 0, index = '01', data, ...restProps }) {
    console.log(isSelected, data);

    const durationToSeconds = (duration) => {
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

        return Number.parseFloat(seconds).toFixed(2) + 's';
    };
    const maybeProgress = (progress = 0) => {
        return progress > 0 ? (
            <ProgressTrack>
                <ProgressBar value={progress} />
            </ProgressTrack>
        ) : null;
    };

    const seconds = durationToSeconds(data.duration);
    const hasProgress = Math.random() < 0.5;
    const progress = hasProgress ? Math.random() * 100 : null;
    const timer = hasProgress
        ? Math.floor(Math.random() * parseInt(data.duration.split(':')[1])) + 'm left'
        : secondsToHuman(seconds);
    // data.filePath

    return (
        <EpisodeContainer className={isSelected ? 'selected' : ''} {...restProps}>
            <Thumbnail />
            <Info>
                <Meta>
                    <Counter>Episode {index}</Counter>
                    <Timer>{timer}</Timer>
                </Meta>
                <Title>{data.name}</Title>
                {maybeProgress(progress)}
            </Info>
        </EpisodeContainer>
    );
};
