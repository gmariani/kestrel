import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player/file';
import {
    Player,
    Loading,
    PlayerOverlay,
    IconButton,
    TrackBar,
    Resolution,
    EpisodeTitle,
    NextEpisodeTitle,
    FlexRow,
    FlexCol,
    SubOverlay,
    HalfPane,
    PaneEpisodeDetail,
    PaneEpisodeSettings,
} from '../components';
import mediaInterface from '../interfaces/media';
import { useLocalStorage, useAWSSignedURL } from '../hooks';
import { getAWSBaseURL } from '../utils';

function getFileName(fullPath) {
    // const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    // const filename = fullPath.substring(startIndex);
    // if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    //     filename = filename.substring(1);
    // }
    // return fullPath.split(/(\\|\/)/g).pop();
    return fullPath.match(/^.*?([^\\/.]*)[^\\/]*$/)[1];
}

const propTypes = {
    media: mediaInterface,
    folder: PropTypes.string,
    onEnded: PropTypes.func,
};

function PlayerContainer({ media, folder, onEnded }) {
    // Hooks
    const history = useHistory();
    const playerRef = useRef();
    const [showSettings, setShowSettings] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [buffering, setBuffering] = useState(false);
    const [playHistory, setPlayHistory] = useLocalStorage(media.id, {
        progress: [[0]],
        lastSeasonIndex: 0,
        lastEpisodeIndex: 0,
    });
    const [settings, setSettings] = useLocalStorage('settings', {
        subtitles: true,
        autoplay: true,
    });
    const baseURL = getAWSBaseURL();

    const { isSingle, season, episode, nextEpisode } = media;
    // Create default array if it doesn't exist
    if (!playHistory.progress[season.index]) {
        playHistory.progress[season.index] = [];
    }

    // React Player Handlers //
    const playerStartHandler = () => {
        // Is there a previously saved timestamp?
        const storedTime = playHistory.progress?.[season.index]?.[episode.index] ?? 0;

        // Only resume time if more than 10 seconds into the video
        if (storedTime > 10) {
            // eslint-disable-next-line no-console
            console.info('Resume to', storedTime);
            playerRef.current.seekTo(storedTime, 'seconds');
        }
    };

    const playerProgressHandler = ({ played, playedSeconds }) => {
        // Update progress
        playHistory.progress[season.index][episode.index] = playedSeconds;

        setPlayHistory({
            progress: playHistory.progress,
            lastSeasonIndex: playHistory.lastSeasonIndex < season.index ? season.index : playHistory.lastSeasonIndex,
            lastEpisodeIndex:
                playHistory.lastSeasonIndex < season.index || playHistory.lastEpisodeIndex < episode.index
                    ? episode.index
                    : playHistory.lastEpisodeIndex,
        });

        setCurrentProgress(played * 100);
        setCurrentSeconds(playedSeconds);
    };

    const playerEndHandler = () => {
        // Reset episode progress
        playHistory.progress[season.index][episode.index] = 0;
        // TODO Reset once series end reached, or continue into next season
        setPlayHistory({
            progress: playHistory.progress,
            lastSeasonIndex: season.index,
            lastEpisodeIndex: nextEpisode ? nextEpisode.index : 0,
        });
        setCurrentProgress(0);
        setCurrentSeconds(0);

        if (onEnded) onEnded();
    };

    const playerErrorHandler = (event) => {
        // eslint-disable-next-line no-console
        console.error('playerErrorHandler', event);
    };
    // End React Player //

    const togglePlaying = useCallback(() => {
        if (!buffering) setPlaying(!playing);
    }, [buffering, playing]);

    const toggleSettings = useCallback(() => {
        setShowSettings(!showSettings);
    }, [showSettings]);

    const toggleInfo = useCallback(() => {
        setShowInfo(!showInfo);
    }, [showInfo]);

    const seekHandler = (progressPercent) => {
        // Update UI immediately
        setCurrentProgress(progressPercent * 100);
        setCurrentSeconds(totalSeconds * progressPercent);

        // Tell React Player to seek
        playerRef.current.seekTo(progressPercent);
    };

    // TODO useIdleTimer(3000)

    const [timeoutID, setTimeoutID] = useState(null);
    const inactivityHandler = (playerScreen) => {
        if (!showSettings && !showInfo && playing) playerScreen.classList.remove('show');
    };

    const activityHandler = (event) => {
        const playerScreen = event.currentTarget;
        playerScreen.classList.add('show');
        clearTimeout(timeoutID);
        setTimeoutID(setTimeout(inactivityHandler, 3000, playerScreen));
    };

    const keyHandler = useCallback(
        (event) => {
            console.log(event.code);
            switch (event.code) {
                // 460 Subtitle
                // 461 Back
                // 457 Info
                // 424 Prev
                // 425 Next
                // 402 Play/Pause
                // 415 Play
                // 19 Pause
                case 412: // Rewind
                    event.preventDefault();
                    // Rewind 10 seconds
                    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
                    break;

                case 417: // Fast Forward
                    event.preventDefault();
                    // Skip ahead 10 seconds
                    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
                    break;
                default:
                // Quit when this doesn't handle the key event
            }
            switch (event.key) {
                case 'Spacebar':
                case ' ':
                    event.preventDefault();
                    togglePlaying();
                    break;
                case 'f':
                    // toggle full screen
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen();
                    } else if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                    break;
                case 'Esc':
                case 'Escape':
                    if (showSettings || showInfo) {
                        setShowSettings(false);
                        setShowInfo(false);
                    } else {
                        history.push(media.route);
                    }

                    break;
                default:
                // Quit when this doesn't handle the key event
            }
        },
        [togglePlaying, showSettings, setShowSettings, showInfo, setShowInfo, history, media]
    );
    useEffect(() => {
        document.addEventListener('keydown', keyHandler, false);
        return () => {
            document.removeEventListener('keydown', keyHandler, false);
        };
    }, [keyHandler]);

    // Toggle subtitles/captions
    useEffect(() => {
        if (playerRef.current) {
            const video = playerRef.current.wrapper.querySelector('video');
            video.textTracks[0].mode = settings.subtitles ? 'showing' : 'hidden';
        }
    }, [settings]);

    const fileURL = useAWSSignedURL(episode.fileURL, media.category, media.slug);
    // BUG: Wait for reply on https://github.com/CookPete/react-player/issues/329
    // const subtitleURL = useAWSSignedURL(episode?.subtitleURL ?? `${getFileName(episode.fileURL)}.vtt}`);

    const keyPrefix = `${media.category}/${media.slug}`;
    const rawSubtitleURL = episode?.subtitleURL ?? `${getFileName(episode.fileURL)}.vtt}`;
    const subtitleURL =
        rawSubtitleURL && !rawSubtitleURL.includes(media.slug)
            ? `${baseURL}/${keyPrefix}/${rawSubtitleURL}`
            : rawSubtitleURL;

    const videoConfig = {
        file: {
            attributes: {
                crossOrigin: 'anonymous',
            },
            tracks: [
                {
                    kind: 'subtitles',
                    src: subtitleURL,
                    srcLang: 'en',
                    default: true,
                    mode: settings.subtitles ? 'showing' : 'hidden',
                },
            ],
        },
    };

    return (
        <Player onMouseMove={activityHandler}>
            {showSettings && (
                <SubOverlay backgroundHue={media.backgroundHue} onClick={toggleSettings}>
                    <HalfPane backgroundHue={media.backgroundHue}>
                        <PaneEpisodeSettings
                            subtitles={settings.subtitles}
                            autoplay={settings.autoplay}
                            setSettings={setSettings}
                        />
                    </HalfPane>
                </SubOverlay>
            )}
            {showInfo && (
                <SubOverlay backgroundHue={media.backgroundHue} onClick={toggleInfo}>
                    <PaneEpisodeDetail
                        hasFocus
                        isSingle={isSingle}
                        media={media}
                        onClickDetails={() => {
                            history.push(media.route);
                        }}
                    />
                </SubOverlay>
            )}
            <PlayerOverlay>
                <FlexRow justifyContent='space-between'>
                    <EpisodeTitle
                        isSingle={isSingle}
                        series={media}
                        folder={folder}
                        seasonNum={season.number}
                        episodeNum={episode.number}
                        episodeName={episode.name}
                    />
                    {nextEpisode && currentProgress > 75 && (
                        <NextEpisodeTitle
                            isSingle={isSingle}
                            series={media}
                            folder={folder}
                            seasonNum={nextEpisode.seasonNumber}
                            episodeNum={nextEpisode.number}
                            episodeName={nextEpisode.name}
                        />
                    )}
                </FlexRow>

                <FlexCol>
                    <TrackBar
                        position={currentProgress}
                        currentSeconds={currentSeconds}
                        totalSeconds={totalSeconds}
                        onChange={(percent) => seekHandler(percent)}
                    />

                    <FlexRow>
                        <FlexRow flexGrow={1} alignItems='start' justifyContent='start'>
                            <Resolution type={media?.resolution} />
                        </FlexRow>

                        <FlexRow flexGrow={1} alignItems='start' justifyContent='center'>
                            <IconButton label='Start Over' icon='prev' onClick={() => seekHandler(0)} />
                            {playing ? (
                                <IconButton label='Pause' icon='pause' disabled={buffering} onClick={togglePlaying} />
                            ) : (
                                <IconButton label='Play' icon='play' disabled={buffering} onClick={togglePlaying} />
                            )}
                            {nextEpisode?.route && (
                                <IconButton
                                    label='Play Next'
                                    icon='next'
                                    onClick={() => history.replace(nextEpisode.route)}
                                />
                            )}
                        </FlexRow>

                        <FlexRow flexGrow={1} alignItems='start' justifyContent='end'>
                            <IconButton label='Settings' icon='cog' onClick={() => setShowSettings(true)} />
                            <IconButton label='Info' icon='info' onClick={() => setShowInfo(true)} />
                        </FlexRow>
                    </FlexRow>
                </FlexCol>
            </PlayerOverlay>

            <Loading visible={buffering} />
            {fileURL !== '' && (
                <ReactPlayer
                    ref={playerRef}
                    style={{ overflow: 'hidden' }}
                    playing={playing}
                    // controls={true}
                    url={fileURL}
                    width='100%'
                    height='100%'
                    onBuffer={() => setBuffering(true)}
                    onBufferEnd={() => setBuffering(false)}
                    // onReady={}
                    onStart={playerStartHandler}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onDuration={(seconds) => setTotalSeconds(seconds)}
                    onProgress={playerProgressHandler}
                    onEnded={playerEndHandler}
                    onError={playerErrorHandler}
                    // onSeek={}
                    config={videoConfig}
                />
            )}
        </Player>
    );
}

PlayerContainer.propTypes = propTypes;
export default PlayerContainer;
