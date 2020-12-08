import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Background, Row, EpisodeDetail } from '../components';
import { SeasonContainer, EpisodeContainer, HeaderContainer } from '../containers';
import { useContent } from '../hooks';
import * as ROUTES from '../constants/routes';

import { getEpisodeProgress, toSlug, getSeries } from '../utils';

export default function Details() {
    const { content: media } = useContent('media');
    const history = useHistory();
    const { mediaId } = useParams();
    const savedData = JSON.parse(localStorage.getItem(mediaId));
    const [progress, setProgress] = useState(savedData?.progress ?? []);
    const lastPlayedSeason = savedData?.lastPlayedSeason ?? 0;
    const lastPlayedEpisode = savedData?.lastPlayedEpisode ?? 0;
    const [selectedSeason, setSelectedSeason] = useState(lastPlayedSeason);
    const [selectedEpisode, setSelectedEpisode] = useState(lastPlayedEpisode);
    const series = getSeries(media, mediaId);

    const isMovie = series && series.filePath;
    const focusElements = isMovie ? ['details'] : ['details', 'episodes', 'seasons'];
    const [focus, setFocus] = useState(0);
    const onKeyDown = useCallback(
        (event) => {
            const { keyCode } = event;
            // (27) Esc
            if (keyCode === 27) {
                history.push(`${ROUTES.BROWSE}`);
                event.preventDefault();
            }
            if (keyCode >= 37 && keyCode <= 41) {
                // (37) Left Arrow, (38) Up Arrow, (39) Right Arrow, (40) Down Arrow
                if (keyCode === 37) {
                    setFocus((focus - 1 + focusElements.length) % focusElements.length);
                } else if (keyCode === 39) {
                    setFocus((focus + 1) % focusElements.length);
                }
                event.preventDefault();
            }
        },
        [history, focus, setFocus, focusElements.length]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);

    // Firebase hasn't replied yet...
    if (!series) return <div>Loading...</div>;
    // if (!loaded) return <Player.Buffer visible={true} />;

    const episodes = series.seasons ? series.seasons[selectedSeason].episodes : [series];
    const episode = episodes[lastPlayedEpisode];
    const episodeSlug = toSlug(episode.name);
    const episodeProgress = getEpisodeProgress(progress?.[lastPlayedSeason]?.[lastPlayedEpisode], episode.duration);

    return (
        <Background
            tabIndex='0'
            hasShadow
            opacityShadow={0.9}
            hasColor={false}
            hasImage
            imagePath={series.backgroundPath}
            opacity={1}>
            <HeaderContainer hideMenu />
            <Row height='100%'>
                {!isMovie ? (
                    <SeasonContainer
                        hasFocus={focusElements[focus] === 'seasons'}
                        seasons={series.seasons}
                        onClickSeason={(seasonIndex) => {
                            setSelectedSeason(seasonIndex);
                        }}
                    />
                ) : null}
                <EpisodeDetail
                    hasFocus={focusElements[focus] === 'details'}
                    isMovie={isMovie}
                    series={series}
                    season={selectedSeason}
                    episode={selectedEpisode}
                    progress={episodeProgress}
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
                {!isMovie ? (
                    <EpisodeContainer
                        hasFocus={focusElements[focus] === 'episodes'}
                        seasonProgress={progress?.[selectedSeason]}
                        episodes={episodes}
                        seasonPath={`${ROUTES.WATCH}${mediaId}/${selectedSeason}/`}
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
                        }}
                    />
                ) : null}
            </Row>
        </Background>
    );
}
