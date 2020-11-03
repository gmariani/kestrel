import React, { useEffect } from 'react';
import { Container, Fade, EpisodeContainer, Thumbnail, Meta, Info, Title, Counter, Timer } from './styles/episodes';
import { ProgressBar } from '../';
import * as ROUTES from '../../constants/routes';
import { getEpisodeProgress, toSlug, padNumber, secondsToHuman } from '../../utils';

export default function Episodes({
    episodes,
    selectedSeries,
    selectedSeason = 0,
    selectedEpisode = 0,
    progress = [],
    onClickEpisode,
    ...restProps
}) {
    const containerRef = React.createRef();
    console.log('progress', progress);
    useEffect(() => {
        const episodeNodes = containerRef.current.querySelectorAll('a');
        const selectedEpisodeNode = episodeNodes[selectedEpisode];
        containerRef.current.scrollTop = selectedEpisodeNode.offsetTop;
        return;
    }, [containerRef, selectedEpisode]);

    return (
        <>
            <Fade />
            <Container ref={containerRef} {...restProps}>
                {episodes.map((episode, i) => {
                    console.log('selectedSeason', selectedSeason, 'selectedEpisode', selectedEpisode, i);
                    const episodeNumber = padNumber(i + 1);
                    const episodeSlug = toSlug(episode.name);
                    const episodeProgress = getEpisodeProgress(progress?.[selectedSeason]?.[i], episode.duration);
                    const isSelected = selectedEpisode === i ? 1 : 0;
                    const timer =
                        episodeProgress.percent > 0
                            ? secondsToHuman(episodeProgress.totalSeconds - episodeProgress.currentSeconds) + ' left'
                            : secondsToHuman(episodeProgress.totalSeconds);
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
                            progressPercent={episodeProgress.percent}
                            to={`${ROUTES.WATCH}${selectedSeries}/${selectedSeason}/${episodeSlug}`}
                        />
                    );
                })}
            </Container>
        </>
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
