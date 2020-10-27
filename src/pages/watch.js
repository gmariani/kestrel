import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Player, ProgressBar } from '../components';
import { useContent } from '../hooks';
import { toSlug, secondsToDuration, padNumber } from '../utils';
import ReactPlayer from 'react-player/file';

export default function Watch() {
    const { content: media } = useContent('media');
    const { mediaId, season, episodeSlug } = useParams();
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const playerRef = (instance) => {
        player = instance;
    };
    let player = null;
    let fadeTimeout = null;

    const findMeta = (media, mediaId) => {
        return media.filter((poster) => {
            return mediaId === poster.docId;
        });
    };

    const findEpisode = (episodes, episodeSlug) => {
        const foundEpisode = episodes.filter((episode) => {
            return episodeSlug === toSlug(episode.name);
        });
        return foundEpisode.length ? foundEpisode[0] : null;
    };

    const updateTimer = (progress) => {
        /*
        loaded: 0.07357217853599066
        loadedSeconds: 120.411955
        played: 0
        playedSeconds: 0
        */
        setCurrentProgress(progress.played * 100);
        setCurrentTime(progress.playedSeconds);
    };

    const onReady = (event) => {
        console.log('onReady', event);
    };
    const onStart = (event) => {
        console.log('onStart', event);
    };
    const onPlay = (event) => {
        console.log('onPlay', event);
        setPlaying(true);
    };
    const onPause = (event) => {
        console.log('onPause', event);
        setPlaying(false);
    };
    const togglePlayState = (event) => {
        event.target.blur();
        setPlaying(!playing);
    };

    const onDuration = (duration) => {
        setTotalTime(duration);
    };

    const onSeek = (event) => {
        const rect = event.target.getBoundingClientRect();
        const seekX = event.pageX - rect.x;
        const trackWidth = rect.width;
        const seekPercent = seekX / trackWidth;
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

    // TODO get tokenized s3 links
    const foundMeta = findMeta(media, mediaId);
    const item = foundMeta.length ? foundMeta[0] : null;
    const episodes = item ? item.seasons[season].episodes : [];
    const episodeIndex = episodes.findIndex(isCurrentEpisode, episodeSlug);
    //const episode = findEpisode(episodes, episodeSlug);
    const episode = episodes[episodeIndex];

    return !episode ? (
        <div>Loading...</div>
    ) : (
        <Player onMouseMove={onActivity}>
            <Player.Header>
                {padNumber(episodeIndex + 1)} - {episode.name}
            </Player.Header>
            <Player.Footer>
                <Player.PlayPause playing={playing} onClick={togglePlayState.bind(this)} />
                <ProgressBar width={50} height='10px' value={currentProgress} onClick={onSeek} />
                <Player.Timer>
                    {secondsToDuration(currentTime)}/{secondsToDuration(totalTime)}
                </Player.Timer>
            </Player.Footer>
            <ReactPlayer
                ref={playerRef}
                playing={playing}
                // controls={true}
                url={episode.filePath}
                width='100%'
                height='100%'
                onReady={onReady.bind(this)}
                onStart={onStart.bind(this)}
                onPlay={onPlay.bind(this)}
                onPause={onPause.bind(this)}
                onDuration={onDuration.bind(this)}
                onProgress={updateTimer.bind(this)}
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
