import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Background, Row, Detail, Seasons, Episodes, ProgressBar } from '../components';
import { useContent } from '../hooks';
import * as ROUTES from '../constants/routes';
import { HeaderContainer } from '../containers/header';
import { focusNext, getUUID, toSlug, padNumber, durationToSeconds, secondsToHuman } from '../utils';

export default function Details() {
    const { content: media } = useContent('media');
    const { mediaId } = useParams();

    const getSeries = (media, mediaId) => {
        const foundMetadata = media.filter((metadata) => {
            return mediaId === metadata.docId;
        });
        return foundMetadata.length ? foundMetadata[0] : null;
    };

    const getEpisodeProgress = (uuid, duration = '00:00') => {
        const currentSeconds = +(localStorage.getItem(uuid) || 0);
        const totalSeconds = durationToSeconds(duration);
        const progress = Math.floor(totalSeconds > 0 && currentSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0);
        return { percent: progress, currentSeconds, totalSeconds };
    };

    // TODO
    const onKeyDown = (event) => {
        console.log('onKeyDown', event);
        switch (event.key) {
            case 'Down': // IE/Edge specific value
            case 'ArrowDown':
                //
                break;
            case 'Up': // IE/Edge specific value
            case 'ArrowUp':
                // Do something for "up arrow" key press.
                break;
            case 'Left': // IE/Edge specific value
            case 'ArrowLeft':
                // Do something for "left arrow" key press.
                break;
            case 'Right': // IE/Edge specific value
            case 'ArrowRight':
                // Do something for "right arrow" key press.
                focusNext();
                break;
            case 'Enter':
                // Do something for "enter" or "return" key press.
                break;
            case 'Esc': // IE/Edge specific value
            case 'Escape':
                // Do something for "esc" key press.
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
    };

    const series = getSeries(media, mediaId);
    if (!series) return <div>Loading...</div>;

    // TODO make these dynamic
    const seasonIndex = 0;
    const selectedEpisodeIndex = 0;
    const episodes = series ? series.seasons[seasonIndex].episodes : [];

    const selectedEpisode = episodes[selectedEpisodeIndex];
    const selectedEpisodeSlug = toSlug(selectedEpisode.name);
    const selectedEpisodeUUID = getUUID(mediaId, seasonIndex, selectedEpisodeSlug);
    const selectedProgress = getEpisodeProgress(selectedEpisodeUUID, selectedEpisode.duration);

    // TODO clean up loading
    return (
        <Background
            hasShadow={true}
            opacityShadow={0.9}
            hasColor={false}
            hasImage={true}
            imagePath={series.backgroundPath}
            opacity={1}
            onKeyDown={onKeyDown.bind(this)}>
            <HeaderContainer />
            <Row height='100%'>
                <Seasons seasons={series.seasons} selected={seasonIndex} />
                <Detail>
                    <Detail.Meta>
                        {series.year} · {series.genres.join(', ')}
                    </Detail.Meta>
                    <Detail.Title>{series.name}</Detail.Title>
                    <Detail.Description>{series.description}</Detail.Description>
                    <ProgressBar value={selectedProgress.percent} />
                    <Detail.Controls>
                        <Button.Link
                            theme='primary'
                            to={`${ROUTES.WATCH}${mediaId}/${seasonIndex}/${selectedEpisodeSlug}`}>
                            Watch
                        </Button.Link>
                        <Button.Link
                            theme='secondary'
                            onClick={(e) => {
                                localStorage.removeItem(selectedEpisodeUUID);
                            }}
                            to={`${ROUTES.WATCH}${mediaId}/${seasonIndex}/${selectedEpisodeSlug}`}>
                            Restart
                        </Button.Link>
                    </Detail.Controls>
                </Detail>
                <Episodes>
                    <Episodes.Fade />
                    {episodes.map((episode, i) => {
                        // console.log(episode);
                        const episodeIndex = padNumber(i + 1);
                        const episodeSlug = toSlug(episode.name);
                        const isSelected = selectedEpisodeIndex === i ? 1 : 0;
                        const episodeUUID = getUUID(mediaId, seasonIndex, episodeSlug);
                        const progress = getEpisodeProgress(episodeUUID, episode.duration);
                        const timer =
                            progress.percent > 0
                                ? secondsToHuman(progress.totalSeconds - progress.currentSeconds) + ' left'
                                : secondsToHuman(progress.totalSeconds);
                        return (
                            <Episodes.Episode
                                key={i}
                                isSelected={isSelected}
                                index={episodeIndex}
                                data={episode}
                                timer={timer}
                                progressPercent={progress.percent}
                                to={`${ROUTES.WATCH}${mediaId}/${seasonIndex}/${episodeSlug}`}
                            />
                        );
                    })}
                </Episodes>
            </Row>
        </Background>
    );
}
