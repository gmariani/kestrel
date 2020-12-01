import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Background, Row, Detail, Seasons, Episodes } from '../components';
import { useContent } from '../hooks';
import * as ROUTES from '../constants/routes';
import { HeaderContainer } from '../containers/header';
import { getEpisodeProgress, toSlug, getSeries } from '../utils';

export default function Details() {
    const { content: media } = useContent('media');
    const { mediaId } = useParams();
    const savedData = JSON.parse(localStorage.getItem(mediaId));
    const [progress, setProgress] = useState(savedData?.progress ?? []);
    const lastPlayedSeason = savedData?.lastPlayedSeason ?? 0;
    const lastPlayedEpisode = savedData?.lastPlayedEpisode ?? 0;
    const [selectedSeason, setSelectedSeason] = useState(lastPlayedSeason);
    const [selectedEpisode, setSelectedEpisode] = useState(lastPlayedEpisode);
    const [focus, setFocus] = useState(2);
    const series = getSeries(media, mediaId);

    const backgroundRef = useRef();
    useEffect(() => {
        // Once loaded, set focus
        if (backgroundRef.current) backgroundRef.current.focus();
    }, [series, backgroundRef]);

    // console.log('savedData', mediaId, savedData);
    // console.log('progress', progress, selectedSeason, selectedEpisode);

    // Firebase hasn't replied yet...
    if (!series) return <div>Loading...</div>;
    // if (!loaded) return <Player.Buffer visible={true} />;

    const { episodes } = series.seasons[selectedSeason];
    const episode = episodes[lastPlayedEpisode];
    const episodeSlug = toSlug(episode.name);
    const episodeProgress = getEpisodeProgress(progress?.[lastPlayedSeason]?.[lastPlayedEpisode], episode.duration);
    const hasProgress = episodeProgress.percent > 0;
    const focusItems = hasProgress
        ? ['seasons', 'detail-continue', 'detail-restart', 'episodes']
        : ['seasons', 'detail-continue', 'episodes'];

    const onKeyDown = (event) => {
        // event.stopPropagation();

        console.log('onKeyDown Row - current focus', focusItems[focus]);
        switch (event.key) {
            case 'Left': // IE/Edge specific value
            case 'ArrowLeft':
                event.preventDefault();
                setFocus((focus - 1 + focusItems.length) % focusItems.length);
                break;
            case 'Right': // IE/Edge specific value
            case 'ArrowRight':
                event.preventDefault();
                setFocus((focus + 1) % focusItems.length);
                break;

            case 'Down': // IE/Edge specific value
            case 'ArrowDown':
                event.preventDefault();
                if (focusItems[focus] === 'seasons') {
                    setSelectedEpisode(0);
                    setSelectedSeason((selectedSeason + 1) % series.seasons.length);
                }
                if (focusItems[focus] === 'episodes') {
                    setSelectedEpisode((selectedEpisode + 1) % episodes.length);
                }
                break;
            case 'Up': // IE/Edge specific value
            case 'ArrowUp':
                event.preventDefault();
                if (focusItems[focus] === 'seasons') {
                    const newSeason = (selectedSeason - 1 + series.seasons.length) % series.seasons.length;
                    console.log('set season to ', newSeason);
                    setSelectedEpisode(0);
                    setSelectedSeason(newSeason);
                }
                if (focusItems[focus] === 'episodes') {
                    const newEpisode = (selectedEpisode - 1 + episodes.length) % episodes.length;
                    console.log('set episode to ', newEpisode);
                    setSelectedEpisode(newEpisode);
                }
                break;
            case 'Enter':
                // Do something for "enter" or "return" key press.
                break;
            case 'Esc': // IE/Edge specific value
            case 'Escape':
                // Do something for "esc" key press.
                break;
            default:
            // Quit when this doesn't handle the key event.
        }
    };

    return (
        <Background
            ref={backgroundRef}
            onLoad={(e) => e.target.focus()}
            onKeyDown={(e) => onKeyDown(e)}
            tabIndex='0'
            hasShadow={true}
            opacityShadow={0.9}
            hasColor={false}
            hasImage={true}
            imagePath={series.backgroundPath}
            opacity={1}>
            <HeaderContainer />
            <Row height='100%'>
                <Seasons
                    seasons={series.seasons}
                    selected={selectedSeason}
                    focusId={0}
                    focusTarget={focus}
                    onClickSeason={(seasonIndex) => {
                        // Only update season when playing an episode
                        setSelectedEpisode(0);
                        setSelectedSeason(seasonIndex);
                    }}
                />
                <Detail
                    focusId={hasProgress ? [1, 2] : 1}
                    focusTarget={focus}
                    series={series}
                    episodeProgress={hasProgress ? episodeProgress : null}
                    episodeRoute={`${ROUTES.WATCH}${mediaId}/${lastPlayedSeason}/${episodeSlug}`}
                    onClickRestart={() => {
                        // Reset episode progress
                        const tempProgress = [...progress];
                        if (!tempProgress[lastPlayedSeason]) tempProgress[lastPlayedSeason] = [];
                        tempProgress[lastPlayedSeason][lastPlayedEpisode] = 0;
                        localStorage.setItem(
                            mediaId,
                            JSON.stringify({
                                progress: tempProgress,
                                lastPlayedSeason,
                                lastPlayedEpisode,
                            })
                        );
                        // Save progress
                        setProgress(tempProgress);
                    }}
                />
                <Episodes
                    focusId={hasProgress ? 3 : 2}
                    episodes={episodes}
                    selectedSeries={mediaId}
                    selectedSeason={selectedSeason}
                    selectedEpisode={selectedEpisode}
                    progress={progress}
                    focusTarget={focus}
                    onClickEpisode={(episodeIndex) => {
                        // Update last played episode
                        localStorage.setItem(
                            mediaId,
                            JSON.stringify({
                                progress,
                                lastPlayedSeason: selectedSeason,
                                lastPlayedEpisode: episodeIndex,
                            })
                        );
                        setSelectedEpisode(episodeIndex);
                    }}
                />
            </Row>
        </Background>
    );
}
