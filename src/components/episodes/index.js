import React, { useEffect } from 'react';
import { Container, Fade, EpisodeContainer, Thumbnail, Meta, Info, Title, Counter, Timer } from './styles/episodes';
import { ProgressBar } from '../';
import * as ROUTES from '../../constants/routes';
import { getEpisodeProgress, getUUID, toSlug, padNumber, secondsToHuman } from '../../utils';

export default function Episodes({
    episodes,
    selectedSeries,
    selectedSeason = 0,
    selectedEpisode = 0,
    onClickEpisode,
    ...restProps
}) {
    const containerRef = React.createRef();

    useEffect(() => {
        // 155 is height of episode item
        const scrollTop = selectedEpisode * 155;
        console.log(scrollTop, selectedEpisode);
        console.log(containerRef);
        containerRef.current.scrollTop = scrollTop;
        return;
    }, [containerRef, selectedEpisode]);

    return (
        <Container ref={containerRef} {...restProps}>
            <Fade />
            {episodes.map((episode, i) => {
                // console.log(episode, selectedEpisode, i);
                const episodeNumber = padNumber(i + 1);
                const episodeSlug = toSlug(episode.name);
                const episodeUUID = getUUID(selectedSeries, selectedSeason, episodeSlug);
                const progress = getEpisodeProgress(episodeUUID, episode.duration);
                const isSelected = selectedEpisode === i ? 1 : 0;
                const timer =
                    progress.percent > 0
                        ? secondsToHuman(progress.totalSeconds - progress.currentSeconds) + ' left'
                        : secondsToHuman(progress.totalSeconds);
                return (
                    <Episodes.Episode
                        key={i}
                        isSelected={isSelected}
                        count={episodeNumber}
                        data={episode}
                        timer={timer}
                        onClick={(e) => {
                            onClickEpisode(i);
                        }}
                        progressPercent={progress.percent}
                        to={`${ROUTES.WATCH}${selectedSeries}/${selectedSeason}/${episodeSlug}`}
                    />
                );
            })}
        </Container>
    );
}

Episodes.Episode = function Episode({
    children,
    isSelected = 0,
    count = '01',
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
                    <Counter>Episode {count}</Counter>
                    <Timer>{timer}</Timer>
                </Meta>
                <Title className='episode__title'>{data.name}</Title>
                {progressPercent > 0 ? <ProgressBar value={progressPercent} theme='dark' /> : null}
            </Info>
        </EpisodeContainer>
    );
};
