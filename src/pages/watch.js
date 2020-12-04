import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/file';
import { Player, ProgressBar, Link, Row } from '../components';
import { useContent } from '../hooks';
import { toSlug, secondsToDuration, padNumber } from '../utils';
import * as ROUTES from '../constants/routes';

// TODO get tokenized s3 links

export default function Watch() {
    const getSeries = (media, mediaId) => {
        const foundMetadata = media.filter((metadata) => mediaId === metadata.docId);
        return foundMetadata.length ? foundMetadata[0] : null;
    };

    function isCurrentEpisode(episode) {
        return this === toSlug(episode.name);
    }

    // Start Hooks //
    const { content: media, loaded } = useContent('media');
    const { mediaId, season, episodeSlug } = useParams();
    // Convert string to number for season
    const selectedSeason = +season;
    const savedData = JSON.parse(localStorage.getItem(mediaId));
    // console.log('savedData', mediaId, savedData);
    const [progress, setProgress] = useState(savedData?.progress ?? []);

    const series = getSeries(media, mediaId);
    const episodes = series ? series.seasons[selectedSeason].episodes : [];
    const selectedEpisode = episodes.findIndex(isCurrentEpisode, episodeSlug);
    const episode = episodes[selectedEpisode];
    const nextEpisode = episodes[selectedEpisode + 1] ? episodes[selectedEpisode + 1] : null;
    let player = null;
    const playerRef = (instance) => {
        player = instance;
    };

    const [currentProgress, setCurrentProgress] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [buffering, setBuffering] = useState(false);
    const [ended, setEnded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [timeoutID, setTimeoutID] = useState(null);
    // End Hooks //

    // Wait until firebase replies with episode data
    if (!loaded) return <Player.Buffer visible />;

    // React Player Handlers //
    const onReady = () => {
        console.log('onReady');
    };
    const onStart = () => {
        console.log('onStart');
        const storedTime = progress?.[selectedSeason]?.[selectedEpisode] ?? 0;
        console.log('resume', currentTime, storedTime);
        // Only resume time if more than 10 seconds into the video
        if (storedTime > 10) {
            player.seekTo(storedTime, 'seconds');
        }
    };
    const onPlay = () => {
        // console.log('onPlay');
        setPlaying(true);
    };
    const onProgress = ({ played, playedSeconds }) => {
        // Update progress
        const tempProgress = [...progress];
        if (!tempProgress[selectedSeason]) tempProgress[selectedSeason] = [];
        tempProgress[selectedSeason][selectedEpisode] = playedSeconds;
        localStorage.setItem(
            mediaId,
            JSON.stringify({
                progress: tempProgress,
                lastPlayedSeason: selectedSeason,
                lastPlayedEpisode: selectedEpisode,
            })
        );

        setProgress(tempProgress);
        setCurrentProgress(played * 100);
        setCurrentTime(playedSeconds);
    };
    const onDuration = (duration) => {
        setTotalTime(duration);
    };
    const onPause = () => {
        // console.log('onPause');
        setPlaying(false);
    };
    const onBuffer = () => {
        // console.log('onBuffer', event);
        setBuffering(true);
    };
    const onBufferEnd = () => {
        // console.log('onBufferEnd', event);
        setBuffering(false);
    };
    // Called when media seeks with seconds parameter
    const onSeek = () => {
        // console.log('onSeek', seconds);
    };
    const onEnded = (event) => {
        console.log('onEnded', event);
        // console.log('save selectedEpisode', selectedEpisode + 1);

        // Reset episode progress and increment to next episode
        const tempProgress = [...progress];
        if (!tempProgress[selectedSeason]) tempProgress[selectedSeason] = [];
        tempProgress[selectedSeason][selectedEpisode] = 0;
        localStorage.setItem(
            mediaId,
            JSON.stringify({
                tempProgress,
                lastPlayedSeason: selectedSeason,
                lastPlayedEpisode: nextEpisode ? selectedEpisode + 1 : 0,
            })
        );

        setEnded(true);
    };
    const onError = (event) => {
        console.log('onError', event);
    };
    // End React Player //

    const onTogglePlaying = (event) => {
        event.target.blur();
        if (!buffering) setPlaying(!playing);
    };

    const onSeekTo = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const seekX = event.pageX - rect.x;
        const trackWidth = rect.width;
        const seekPercent = seekX / trackWidth;
        player.seekTo(seekPercent);
    };

    const onInactivity = (currentTarget) => {
        currentTarget.classList.remove('show');
    };

    const onActivity = ({ currentTarget }) => {
        currentTarget.classList.add('show');
        clearTimeout(timeoutID);
        setTimeoutID(setTimeout(onInactivity, 3000, currentTarget));
    };

    const onKeyDown = (event) => {
        switch (event.key) {
            case 'Spacebar':
            case ' ':
                event.preventDefault();
                // toggle play/pause
                console.log('toggle onTogglePlaying');
                if (!buffering) setPlaying(!playing);
                break;

            case 'Left':
            case 'ArrowLeft':
                event.preventDefault();
                // rewind 10 seconds
                break;
            case 'Right':
            case 'ArrowRight':
                event.preventDefault();
                // skip ahead 10 seconds
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
                } else if (document.exitFullscreen) document.exitFullscreen();
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
        <Player.End>
            <Player.EndDetails>
                <Player.EndTitle>{series.name}</Player.EndTitle>
                <Player.EndSubTitle episodeIndex={selectedEpisode} episode={episode} />
                <Row>
                    <Link
                        theme={nextEpisode ? 'secondary' : 'primary'}
                        onClick={() => setEnded(false)}
                        to={`${ROUTES.DETAILS}${mediaId}`}>
                        Back
                    </Link>
                    {nextEpisode ? (
                        <Link
                            theme='primary'
                            onClick={() => {
                                setEnded(false);
                            }}
                            to={`${ROUTES.WATCH}${mediaId}/${selectedSeason}/${toSlug(nextEpisode.name)}`}>
                            Next
                        </Link>
                    ) : null}
                </Row>
            </Player.EndDetails>
            <Player.Preview episodeIndex={selectedEpisode} nextEpisode={nextEpisode} />
        </Player.End>
    ) : (
        <Player onMouseMove={onActivity} onKeyDown={(e) => onKeyDown(e)} tabIndex='0'>
            <Player.Header>
                {padNumber(selectedEpisode + 1)} - {episode.name}
            </Player.Header>
            <Player.Footer>
                <Player.PlayPause playing={playing} buffering={buffering} onClick={onTogglePlaying} />
                <ProgressBar width='50%' height='10px' value={currentProgress} onClick={onSeekTo} />
                <Player.Timer>
                    {secondsToDuration(currentTime)}/{secondsToDuration(totalTime)}
                </Player.Timer>
            </Player.Footer>
            <Player.Buffer visible={buffering} />
            <ReactPlayer
                ref={playerRef}
                style={{ overflow: 'hidden' }}
                playing={playing}
                // controls={true}
                url={episode.filePath}
                width='100%'
                height='100%'
                onBuffer={onBuffer}
                onBufferEnd={onBufferEnd}
                onReady={onReady}
                onStart={onStart}
                onPlay={onPlay}
                onPause={onPause}
                onDuration={onDuration}
                onProgress={onProgress}
                onEnded={onEnded}
                onError={onError}
                onSeek={onSeek}
                config={{
                    file: {
                        attributes: {
                            crossOrigin: 'anonymous',
                        },
                        tracks: [
                            {
                                kind: 'subtitles',
                                src: episode.subPath,
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
