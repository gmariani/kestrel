import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';
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
    FlexRowFocusable,
    FlexCol,
    SubOverlay,
    HalfPane,
    PaneEpisodeDetail,
    PaneEpisodeSettings,
    Logo,
    PreRollRating,
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
    setFocus: PropTypes.func,
    hasFocusedChild: PropTypes.bool,
    onEnded: PropTypes.func,
};

function PlayerContainer({ media, folder, setFocus, hasFocusedChild, onEnded }) {
    // Hooks
    const history = useHistory();
    const playerRef = useRef();
    const [timeoutID, setTimeoutID] = useState(null);
    const [selectedButton, setSelectedButton] = useState('ACTION-PLAY');
    const [showPreRoll, setShowPreRoll] = useState(true);
    const [showControls, setShowControls] = useState(false);
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

    /// ///////////////////////
    // React Player Handlers //
    /// ///////////////////////
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
    /// //////////////////
    // End React Player //
    /// //////////////////

    const togglePlaying = useCallback(() => {
        if (!buffering) setPlaying(!playing);
    }, [buffering, playing]);

    const toggleSettings = useCallback(() => {
        setShowSettings(!showSettings);
    }, [showSettings]);

    const toggleInfo = useCallback(() => {
        setShowInfo(!showInfo);
    }, [showInfo]);

    const seekTo = (progressPercent) => {
        // Update UI immediately
        setCurrentProgress(progressPercent * 100);
        setCurrentSeconds(totalSeconds * progressPercent);

        // Tell React Player to seek
        playerRef.current.seekTo(progressPercent);
    };

    const inactivityHandler = () => {
        if (!showSettings && !showInfo && playing) {
            setShowControls(false);
        }
    };

    const activityHandler = () => {
        clearTimeout(timeoutID);
        setShowControls(true);
        setShowPreRoll(false);
        setTimeoutID(setTimeout(inactivityHandler, 3000));
    };

    // On render, listen for tv remote to navigate as well
    useEffect(() => {
        function onKeyDown(event) {
            const { key } = event;
            activityHandler();

            switch (key) {
                case 'MediaPlay':
                    event.preventDefault();
                    if (!buffering) setPlaying(true);
                    break;
                case 'MediaPlayPause':
                    event.preventDefault();
                    togglePlaying();
                    break;
                case 'MediaRewind':
                    event.preventDefault();
                    // Rewind 10 seconds
                    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
                    break;
                case 'MediaFastForward':
                    event.preventDefault();
                    // Skip ahead 10 seconds
                    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
                    break;
                case 'ChannelUp':
                case 'ChannelDown':
                case 'MediaAudioTrack': // Audio
                case 'MediaTrackPrevious':
                    // event.preventDefault();
                    //
                    break;
                case 'MediaStop':
                    event.preventDefault();
                    seekTo(0);
                    if (!buffering) setPlaying(false);
                    break;
                case 'MediaTrackNext':
                    event.preventDefault();
                    history.replace(nextEpisode.route);
                    break;
                case 'Info': // Display
                    event.preventDefault();
                    setShowInfo(!showInfo);
                    break;
                case 'ClosedCaptionToggle': // Subtitle
                    event.preventDefault();
                    if (playerRef.current) {
                        const video = playerRef.current.wrapper.querySelector('video');
                        video.textTracks[0].mode = settings.subtitles ? 'showing' : 'hidden';
                    }
                    break;
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
                // Do nothing
            }
        }

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    });

    // Toggle subtitles/captions
    useEffect(() => {
        if (playerRef.current) {
            const video = playerRef.current.wrapper.querySelector('video');
            video.textTracks[0].mode = settings.subtitles ? 'showing' : 'hidden';
        }
    }, [settings]);

    useEffect(() => {
        // Set initial focus inorder to jumpstart spacial navigation
        if (!hasFocusedChild) setFocus('PLAYER-PAUSEPLAY');

        setTimeout(() => {
            console.log('hide preroll');
            setShowPreRoll(false);
        }, 5000);
    }, [hasFocusedChild, setFocus]);

    const fileURL = useAWSSignedURL(episode.fileURL, media.category, media.slug);
    // BUG: Wait for reply on https://github.com/CookPete/react-player/issues/329
    console.log('showPreRoll', showPreRoll);
    // Signed
    // BUG: but doesn't seem to get passed into the <track> element
    // https://github.com/cookpete/react-player/blob/22bf8586a835fb2c04ca58ddfc49935ccd577c1f/src/players/FilePlayer.js
    // const subtitleURL = useAWSSignedURL(
    //     episode?.subtitleURL ?? `${getFileName(episode.fileURL)}.vtt`,
    //     media.category,
    //     media.slug
    // );

    // TODO: Maybe auto position tracks when controls are displayed
    // const track = document.getElementsByTagName('track')[0].track;
    // // Position the cue at the top
    // track.activeCues[0].line = 0;
    // // Position the cue at the bottom (default)
    // track.activeCues[0].line = -1;
    // // Move the cue up 3 lines to make room for video controls
    // track.activeCues[0].line = -4;

    // Unsigned
    const keyPrefix = `${media.category}/${media.slug}`;
    const rawSubtitleURL = episode?.subtitleURL ?? `${keyPrefix}/${getFileName(episode.fileURL)}.vtt`;
    const subtitleURL =
        rawSubtitleURL && !rawSubtitleURL.includes(media.slug)
            ? `${baseURL}/${keyPrefix}/${rawSubtitleURL}`
            : rawSubtitleURL;

    const subtitleTrack = {
        kind: 'subtitles',
        src: subtitleURL,
        srcLang: 'en',
        default: true,
        mode: settings.subtitles ? 'showing' : 'hidden',
    };

    return (
        <Player onActivity={activityHandler} className={showControls ? 'show' : ''}>
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
            {showPreRoll && (
                <PlayerOverlay zIndex={6} className='show'>
                    <FlexRow justifyContent='space-between'>
                        <PreRollRating rating={media?.contentRating} />
                        <Logo width={9} height={1.5} />
                    </FlexRow>
                </PlayerOverlay>
            )}
            <PlayerOverlay zIndex={5}>
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
                        onChange={(percent) => seekTo(percent)}
                    />

                    <FlexRow>
                        <FlexRow flexGrow={1} alignItems='flex-start' justifyContent='flex-start'>
                            <Resolution type={media?.resolution} />
                        </FlexRow>

                        <FlexRowFocusable
                            focusKey='PLAYER'
                            flexGrow={1}
                            alignItems='flex-start'
                            justifyContent='center'>
                            <IconButton
                                focusKey='PLAYER-RESTART'
                                label='Start Over'
                                icon='prev'
                                onClick={() => seekTo(0)}
                                onEnterPress={() => seekTo(0)}
                                onBecameFocused={() => setSelectedButton('PLAYER-RESTART')}
                                selected={selectedButton === 'PLAYER-RESTART'}
                            />
                            {playing ? (
                                <IconButton
                                    focusKey='PLAYER-PAUSEPLAY'
                                    label='Pause'
                                    icon='pause'
                                    disabled={buffering}
                                    onClick={togglePlaying}
                                    onEnterPress={togglePlaying}
                                    onBecameFocused={() => setSelectedButton('PLAYER-PAUSEPLAY')}
                                    selected={selectedButton === 'PLAYER-PAUSEPLAY'}
                                />
                            ) : (
                                <IconButton
                                    focusKey='PLAYER-PAUSEPLAY'
                                    label='Play'
                                    icon='play'
                                    disabled={buffering}
                                    onClick={togglePlaying}
                                    onEnterPress={togglePlaying}
                                    onBecameFocused={() => setSelectedButton('PLAYER-PAUSEPLAY')}
                                    selected={selectedButton === 'PLAYER-PAUSEPLAY'}
                                />
                            )}
                            {nextEpisode?.route && (
                                <IconButton
                                    focusKey='PLAYER-NEXT'
                                    label='Play Next'
                                    icon='next'
                                    onEnterPress={() => history.replace(nextEpisode.route)}
                                    onClick={() => history.replace(nextEpisode.route)}
                                    onBecameFocused={() => setSelectedButton('PLAYER-NEXT')}
                                    selected={selectedButton === 'PLAYER-NEXT'}
                                />
                            )}
                        </FlexRowFocusable>

                        <FlexRowFocusable
                            focusKey='MEDIA'
                            flexGrow={1}
                            alignItems='flex-start'
                            justifyContent='flex-end'>
                            <IconButton
                                focusKey='MEDIA-SETTINGS'
                                label='Settings'
                                icon='cog'
                                onClick={() => setShowSettings(true)}
                                onEnterPress={() => setShowSettings(true)}
                                onBecameFocused={() => setSelectedButton('MEDIA-SETTINGS')}
                                selected={selectedButton === 'MEDIA-SETTINGS'}
                            />
                            <IconButton
                                focusKey='MEDIA-INFO'
                                label='Info'
                                icon='info'
                                onEnterPress={() => setShowInfo(true)}
                                onClick={() => setShowInfo(true)}
                                onBecameFocused={() => setSelectedButton('MEDIA-INFO')}
                                selected={selectedButton === 'MEDIA-INFO'}
                            />
                        </FlexRowFocusable>
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
                    config={{
                        file: {
                            attributes: {
                                crossOrigin: 'anonymous',
                            },
                            tracks: [subtitleTrack],
                        },
                    }}
                />
            )}
        </Player>
    );
}

PlayerContainer.propTypes = propTypes;
export default withFocusable({
    trackChildren: true,
})(PlayerContainer);
