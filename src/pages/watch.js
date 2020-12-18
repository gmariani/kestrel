import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/file';
import styled from 'styled-components/macro';
import {
    Player,
    CreditsDetail,
    Credits,
    Row,
    Link,
    CreditsPreview,
    Loading,
    PlayerOverlay,
    IconButton,
    TrackBar,
    Resolution,
    EpisodeTitle,
    FlexRow,
    FlexCol,
} from '../components';
import { useContent } from '../hooks';
import { toSlug, getSeries } from '../utils';
import * as ROUTES from '../constants/routes';

// TODO get tokenized s3 links

export default function Watch() {
    // Must be a stand-alone function in order to pass the episodeSlug as
    // 'this', hack
    function isCurrentEpisode(episode) {
        return this === toSlug(episode.name);
    }

    // Start Hooks //
    const playerRef = useRef();
    const { content: media, loaded } = useContent('media');
    const { mediaId, season, episodeSlug } = useParams();
    const savedData = JSON.parse(localStorage.getItem(mediaId));
    const [savedProgress, setSavedProgress] = useState(savedData?.progress ?? []);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [buffering, setBuffering] = useState(false);
    const [ended, setEnded] = useState(false);
    const [timeoutID, setTimeoutID] = useState(null);
    // End Hooks //

    // Wait until firebase replies with episode data
    if (!loaded) return <Loading visible />;

    const series = getSeries(media, mediaId);
    const seasonIndex = parseInt(season, 10);
    const isSingle = !!(series && series.filePath);
    // Grab list of media (if movie or series)
    const episodes = series.seasons ? series.seasons[seasonIndex].episodes : [series];
    // Get selected media
    const episodeIndex = episodes.findIndex(isCurrentEpisode, episodeSlug);
    const currentEpisode = episodes[episodeIndex];
    const nextEpisode = episodes[episodeIndex + 1] ? episodes[episodeIndex + 1] : null;
    const nextRoute = nextEpisode ? `${ROUTES.WATCH}${mediaId}/${seasonIndex}/${toSlug(nextEpisode.name)}` : null;

    // React Player Handlers //
    const playerStartHandler = () => {
        // Is there a previously saved timestamp?
        const storedTime = savedProgress?.[seasonIndex]?.[episodeIndex] ?? 0;

        // Only resume time if more than 10 seconds into the video
        if (storedTime > 10) {
            // eslint-disable-next-line no-console
            console.info('Resume to', storedTime);
            playerRef.current.seekTo(storedTime, 'seconds');
        }
    };

    const playerProgressHandler = ({ played, playedSeconds }) => {
        // Update progress
        const tempProgress = [...savedProgress];
        if (!tempProgress[seasonIndex]) tempProgress[seasonIndex] = [];
        tempProgress[seasonIndex][episodeIndex] = playedSeconds;
        localStorage.setItem(
            mediaId,
            JSON.stringify({
                progress: tempProgress,
                lastPlayedSeason: seasonIndex,
                lastPlayedEpisode: episodeIndex,
            })
        );

        setSavedProgress(tempProgress);
        setCurrentProgress(played * 100);
        setCurrentTime(playedSeconds);
    };

    const playerEndHandler = () => {
        // Reset episode progress
        const seriesProgress = [...savedProgress];
        if (!seriesProgress[seasonIndex]) seriesProgress[seasonIndex] = [];
        seriesProgress[seasonIndex][episodeIndex] = 0;

        // Save and increment to next episode
        localStorage.setItem(
            mediaId,
            JSON.stringify({
                seriesProgress,
                lastPlayedSeason: seasonIndex,
                lastPlayedEpisode: nextEpisode ? episodeIndex + 1 : 0,
            })
        );

        setEnded(true);
    };

    const playerErrorHandler = (event) => {
        // eslint-disable-next-line no-console
        console.error('playerErrorHandler', event);
    };
    // End React Player //

    const togglePlaying = () => {
        if (!buffering) setPlaying(!playing);
    };

    const seekHandler = (progressPercent) => {
        setCurrentProgress(progressPercent * 100);
        // Tell React Player to seek
        playerRef.current.seekTo(progressPercent);
    };

    const inactivityHandler = (playerScreen) => {
        playerScreen.classList.remove('show');
    };

    const activityHandler = (event) => {
        const playerScreen = event.currentTarget;
        playerScreen.classList.add('show');
        clearTimeout(timeoutID);
        setTimeoutID(setTimeout(inactivityHandler, 3000, playerScreen));
    };

    const keyHandler = (event) => {
        switch (event.key) {
            case 'Spacebar':
            case ' ':
                event.preventDefault();
                togglePlaying();
                break;

            case 'Left':
            case 'ArrowLeft':
                event.preventDefault();
                // TODO rewind 10 seconds
                break;
            case 'Right':
            case 'ArrowRight':
                event.preventDefault();
                // TODO skip ahead 10 seconds
                break;

            case 'Down':
            case 'ArrowDown':
                //
                break;
            case 'Up':
            case 'ArrowUp':
                //
                break;

            case 'f':
                // toggle full screen
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                break;

            case 'Enter':
                //
                break;
            case 'Esc':
            case 'Escape':
                //
                break;
            default:
            // Quit when this doesn't handle the key event.
        }
    };

    return ended ? (
        <Credits>
            <CreditsDetail>
                <EpisodeTitle
                    isSingle={isSingle}
                    series={series}
                    seasonNum={seasonIndex + 1}
                    episodeNum={episodeIndex + 1}
                    episodeTitle={currentEpisode.name}
                />
                <Row>
                    <Link
                        theme={nextRoute ? 'secondary' : 'primary'}
                        onClick={() => setEnded(false)}
                        to={`${ROUTES.DETAILS}${mediaId}`}>
                        Back
                    </Link>
                    {nextRoute ? (
                        <Link theme='primary' onClick={() => setEnded(false)} to={nextRoute}>
                            Next
                        </Link>
                    ) : null}
                </Row>
            </CreditsDetail>
            {nextEpisode && (
                <CreditsPreview
                    nextIndex={episodeIndex + 2}
                    nextThumbnail={nextEpisode.thumbnail}
                    nextName={nextEpisode.name}
                />
            )}
        </Credits>
    ) : (
        <Player onMouseMove={activityHandler} onKeyDown={keyHandler}>
            <PlayerOverlay>
                <EpisodeTitle
                    isSingle={isSingle}
                    series={series}
                    seasonNum={seasonIndex + 1}
                    episodeNum={episodeIndex + 1}
                    episodeTitle={currentEpisode.name}
                />
                <FlexCol>
                    <TrackBar
                        position={currentProgress}
                        currentSeconds={currentTime}
                        totalSeconds={totalTime}
                        onChange={(percent) => seekHandler(percent)}
                    />

                    <FlexRow>
                        <FlexRow flexGrow={1} alignItems='start' justifyContent='start'>
                            <Resolution type={series?.resolution} />
                        </FlexRow>

                        <FlexRow flexGrow={1} alignItems='start' justifyContent='center'>
                            <IconButton label='Start Over' icon='prev' onClick={() => seekHandler(0)} />
                            {playing ? (
                                <IconButton label='Pause' icon='pause' disabled={buffering} onClick={togglePlaying} />
                            ) : (
                                <IconButton label='Play' icon='play' disabled={buffering} onClick={togglePlaying} />
                            )}
                            <IconButton label='Play Next' icon='next' />
                        </FlexRow>

                        <FlexRow flexGrow={1} alignItems='start' justifyContent='end'>
                            <IconButton label='Settings' icon='cog' />
                            <IconButton label='Info' icon='info' />
                        </FlexRow>
                    </FlexRow>
                </FlexCol>
            </PlayerOverlay>
            <Loading visible={buffering} />
            <ReactPlayer
                ref={playerRef}
                style={{ overflow: 'hidden' }}
                playing={playing}
                // controls={true}
                url={currentEpisode.filePath}
                width='100%'
                height='100%'
                onBuffer={() => setBuffering(true)}
                onBufferEnd={() => setBuffering(false)}
                // onReady={}
                onStart={playerStartHandler}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onDuration={(duration) => setTotalTime(duration)}
                onProgress={playerProgressHandler}
                onEnded={playerEndHandler}
                onError={playerErrorHandler}
                // onSeek={}
                config={{
                    file: {
                        attributes: {
                            crossOrigin: 'anonymous',
                        },
                        tracks: [
                            {
                                kind: 'subtitles',
                                src: currentEpisode.subPath,
                                srcLang: 'en',
                                default: true,
                            },
                        ],
                    },
                }}
            />
        </Player>
    );
}
