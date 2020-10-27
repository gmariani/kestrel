import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Player, ProgressBar } from '../components';
import { useContent } from '../hooks';
import { toSlug, secondsToDuration, padNumber } from '../utils';
import ReactPlayer from 'react-player/file';

// TODO get tokenized s3 links

export default function Watch() {
    const findMetadata = (media, mediaId) => {
        const foundMetadata = media.filter((metadata) => {
            return mediaId === metadata.docId;
        });
        return foundMetadata.length ? foundMetadata[0] : null;
    };

    // Start Hooks //
    const { content: media, loaded } = useContent('media');
    const { mediaId, season, episodeSlug } = useParams();

    const metadata = findMetadata(media, mediaId);
    const episodes = metadata ? metadata.seasons[season].episodes : [];
    const episodeIndex = episodes.findIndex(isCurrentEpisode, episodeSlug);
    const episode = episodes[episodeIndex];
    const episodeUUID = episode ? `${mediaId}_${season}_${toSlug(episode.name)}` : '';
    const playerRef = (instance) => (player = instance);
    let player = null;
    let fadeTimeout = null;

    const [currentProgress, setCurrentProgress] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [buffering, setBuffering] = useState(false);
    const [ended, setEnded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    // End Hooks //

    // Wait until firebase replies with episode data
    if (!loaded) return <Player.Buffer visible={true} />;

    // React Player Handlers //
    const onReady = (event) => {
        console.log('onReady');
    };
    const onStart = () => {
        console.log('onStart');
        const storedTime = localStorage.getItem(episodeUUID);
        console.log('resume', currentTime, storedTime);
        player.seekTo(storedTime, 'seconds');
    };
    const onPlay = () => {
        // console.log('onPlay');
        setPlaying(true);
    };
    const onProgress = ({ played, playedSeconds, loaded, loadedSeconds }) => {
        setCurrentProgress(played * 100);
        setCurrentTime(playedSeconds);
        localStorage.setItem(episodeUUID, playedSeconds);
    };
    const onDuration = (duration) => {
        setTotalTime(duration);
    };
    const onPause = () => {
        // console.log('onPause');
        setPlaying(false);
    };
    const onBuffer = (event) => {
        // console.log('onBuffer', event);
        setBuffering(true);
    };
    const onBufferEnd = (event) => {
        // console.log('onBufferEnd', event);
        setBuffering(false);
    };
    // Called when media seeks with seconds parameter
    const onSeek = (seconds) => {
        //localStorage.setItem(episodeUUID, seconds - 2);
        console.log('onSeek', seconds);
    };
    const onEnded = (event) => {
        console.log('onEnded', event);
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
        console.log('onSeekTo', seekPercent);
        player.seekTo(seekPercent);
    };

    const onInactivity = (currentTarget) => {
        currentTarget.classList.remove('show');
    };

    const onActivity = ({ target, currentTarget }) => {
        currentTarget.classList.add('show');
        clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(onInactivity, 3000, currentTarget);
    };

    function isCurrentEpisode(episode) {
        return this === toSlug(episode.name);
    }

    return ended ? (
        <div>Ended</div>
    ) : (
        <Player onMouseMove={onActivity}>
            <Player.Header>
                {padNumber(episodeIndex + 1)} - {episode.name}
            </Player.Header>
            <Player.Footer>
                <Player.PlayPause
                    playing={playing}
                    style={{ opacity: buffering ? 0.5 : 1 }}
                    onClick={onTogglePlaying.bind(this)}
                />
                <ProgressBar width={50} height='10px' value={currentProgress} onClick={onSeekTo} />
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
                onBuffer={onBuffer.bind(this)}
                onBufferEnd={onBufferEnd.bind(this)}
                onReady={onReady.bind(this)}
                onStart={onStart.bind(this)}
                onPlay={onPlay.bind(this)}
                onPause={onPause.bind(this)}
                onDuration={onDuration.bind(this)}
                onProgress={onProgress.bind(this)}
                onEnded={onEnded.bind(this)}
                onError={onError.bind(this)}
                onSeek={onSeek.bind(this)}
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
