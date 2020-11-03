import React, { useState } from 'react';
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
    const [selectedSeason, setSelectedSeason] = useState(savedData?.selectedSeason ?? 0);
    const [selectedEpisode, setSelectedEpisode] = useState(savedData?.selectedEpisode ?? 0);
    const [focus, setFocus] = useState(2);
    const series = getSeries(media, mediaId);

    console.log('savedData', mediaId, savedData);
    // console.log('progress', progress, selectedSeason, selectedEpisode);

    // Firebase hasn't replied yet...
    if (!series) return <div>Loading...</div>;
    // if (!loaded) return <Player.Buffer visible={true} />;

    const episodes = series.seasons[selectedSeason].episodes;
    const episode = episodes[selectedEpisode];
    const episodeSlug = toSlug(episode.name);
    const episodeProgress = getEpisodeProgress(progress?.[selectedSeason]?.[selectedEpisode], episode.duration);
    const hasProgress = episodeProgress.percent > 0;
    const focusItems = ['seasons', 'detail', 'episodes'];

    // TODO
    const onKeyDown = (event) => {
        // event.stopPropagation();
        event.preventDefault();
        console.log('onKeyDown Row - current focus', focusItems[focus]);
        switch (event.key) {
            case 'Left': // IE/Edge specific value
            case 'ArrowLeft':
                setFocus((focus - 1 + focusItems.length) % focusItems.length);
                break;
            case 'Right': // IE/Edge specific value
            case 'ArrowRight':
                setFocus((focus + 1) % focusItems.length);
                break;

            case 'Down': // IE/Edge specific value
            case 'ArrowDown':
                if ('seasons' === focusItems[focus]) {
                    setSelectedEpisode(0);
                    setSelectedSeason((selectedSeason + 1) % series.seasons.length);
                }
                if ('episodes' === focusItems[focus]) {
                    setSelectedEpisode((selectedEpisode + 1) % episodes.length);
                }
                break;
            case 'Up': // IE/Edge specific value
            case 'ArrowUp':
                if ('seasons' === focusItems[focus]) {
                    const newSeason = (selectedSeason - 1 + series.seasons.length) % series.seasons.length;
                    console.log('set season to ', newSeason);
                    setSelectedEpisode(0);
                    setSelectedSeason(newSeason);
                }
                if ('episodes' === focusItems[focus]) {
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
                return; // Quit when this doesn't handle the key event.
        }
    };

    return (
        <Background
            hasShadow={true}
            opacityShadow={0.9}
            hasColor={false}
            hasImage={true}
            imagePath={series.backgroundPath}
            opacity={1}>
            <HeaderContainer />
            <Row height='100%' onKeyDown={(e) => onKeyDown(e)} tabIndex='0'>
                <Seasons
                    seasons={series.seasons}
                    selected={selectedSeason}
                    focusId={0}
                    focusTarget={focus}
                    onClickSeason={(seasonIndex) => {
                        // Only update season when playing an episode
                        // localStorage.setItem(mediaId, JSON.stringify({ progress, seasonIndex, selectedEpisode }));
                        setSelectedEpisode(0);
                        setSelectedSeason(seasonIndex);
                    }}
                />
                <Detail
                    focusId={1}
                    focusTarget={focus}
                    series={series}
                    episodeProgress={hasProgress ? episodeProgress : null}
                    episodeRoute={`${ROUTES.WATCH}${mediaId}/${selectedSeason}/${episodeSlug}`}
                    onClickRestart={() => {
                        // Reset episode progress
                        const tempProgress = [...progress];
                        if (!tempProgress[selectedSeason]) tempProgress[selectedSeason] = [];
                        tempProgress[selectedSeason][selectedEpisode] = 0;
                        localStorage.setItem(
                            mediaId,
                            JSON.stringify({ progress: tempProgress, selectedSeason, selectedEpisode })
                        );
                        // Save progress
                        setProgress(tempProgress);
                    }}
                />
                <Episodes
                    focusId={2}
                    episodes={episodes}
                    selectedSeries={mediaId}
                    selectedSeason={selectedSeason}
                    selectedEpisode={selectedEpisode}
                    progress={progress}
                    focusTarget={focus}
                    onClickEpisode={(episodeIndex) => {
                        localStorage.setItem(mediaId, JSON.stringify({ progress, selectedSeason, episodeIndex }));
                        setSelectedEpisode(episodeIndex);
                    }}
                />
            </Row>
        </Background>
    );
}
