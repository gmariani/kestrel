import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/file';
import {
    Player,
    Loading,
    PlayerOverlay,
    IconButton,
    TrackBar,
    Resolution,
    EpisodeTitle,
    FlexRow,
    FlexCol,
} from '../components';

const propTypes = {
    isSingle: PropTypes.bool,
    media: PropTypes.shape({
        filePath: PropTypes.string,
        slug: PropTypes.string,
        resolution: PropTypes.string,
        seasons: PropTypes.arrayOf(PropTypes.object),
    }),
    seasonIndex: PropTypes.string,
    episodeIndex: PropTypes.number,
    currentEpisode: PropTypes.shape({
        name: PropTypes.string,
        filePath: PropTypes.string,
        subPath: PropTypes.string,
    }),
    nextEpisode: PropTypes.shape({}),
    nextRoute: PropTypes.string,
    onEnded: PropTypes.func,
};

function PlayerContainer({
    isSingle,
    media,
    seasonIndex,
    episodeIndex,
    currentEpisode,
    nextEpisode,
    nextRoute,
    onEnded,
}) {
    // Hooks
    const playerRef = useRef();
    const savedData = JSON.parse(localStorage.getItem(media.slug));
    const [savedProgress, setSavedProgress] = useState(savedData?.progress ?? []);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [buffering, setBuffering] = useState(false);

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
            media.slug,
            JSON.stringify({
                progress: tempProgress,
                lastPlayedSeason: seasonIndex,
                lastPlayedEpisode: episodeIndex,
            })
        );

        setSavedProgress(tempProgress);
        setCurrentProgress(played * 100);
        setCurrentSeconds(playedSeconds);
    };

    const playerEndHandler = () => {
        // Reset episode progress
        const seriesProgress = [...savedProgress];
        if (!seriesProgress[seasonIndex]) seriesProgress[seasonIndex] = [];
        seriesProgress[seasonIndex][episodeIndex] = 0;

        // Save and increment to next episode
        localStorage.setItem(
            media.slug,
            JSON.stringify({
                seriesProgress,
                lastPlayedSeason: seasonIndex,
                lastPlayedEpisode: nextEpisode ? episodeIndex + 1 : 0,
            })
        );

        if (onEnded) onEnded();
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

    // useIdleTimer(3000)

    const [timeoutID, setTimeoutID] = useState(null);
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

    return (
        <Player onMouseMove={activityHandler} onKeyDown={keyHandler}>
            <PlayerOverlay>
                <EpisodeTitle
                    isSingle={isSingle}
                    series={media}
                    seasonNum={seasonIndex + 1}
                    episodeNum={episodeIndex + 1}
                    episodeTitle={currentEpisode.name}
                />
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

PlayerContainer.propTypes = propTypes;
export default PlayerContainer;
